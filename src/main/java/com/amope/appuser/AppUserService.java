package com.amope.appuser;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import com.amope.App;
import com.amope.repo.AppRepository;
import com.amope.registration.token.ConfirmationToken;
import com.amope.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Data
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final static String USER_ID_NOT_FOUND_MSG = "User with id %s not found";

    private final AppUserRepository appUserRepository;
    private final AppRepository<Subject> appRepository;
    private final AppRepository<Address> addressRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        if (appUser.hasFavs()) {
            appRepository.saveAll(appUser.getFavoriteSubjects());
        }

        if (appUser.hasAddress()) {
            addressRepository.save(appUser.getAddress());
        }

        appUserRepository.save(appUser);

        // Create Token
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        //TODO Send Email

        return token;
    }

    public void enableAppUser(String email) {
        appUserRepository.enableAppUser(email);
    }

    public void checkEmailIsDuplicate(String email, AppUser user) {
        appUserRepository.findByEmail(email).ifPresentOrElse(s -> {
            System.out.println(s +" already exists" );
        }, () -> {
            System.out.println("Signing up new students" + user);
            signUpUser(user);
        });
    };

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    public AppUser findAppUserById(Long id) {
        return appUserRepository.findAppUserById(id).orElseThrow(
                ()-> new UsernameNotFoundException(String.format(USER_ID_NOT_FOUND_MSG, id)));
    }

    @Transactional
    public AppUser updateUser(Long id, AppUserRequest request) {
        AppUser user = findAppUserById(id);

        if (request.firstName() != null && request.firstName().length() > 0 && !Objects.equals(user.getFirstName(), request.firstName())) {
            user.setFirstName(request.firstName());
        }

        if (request.lastName() != null && request.lastName().length() > 0 && !Objects.equals(user.getLastName(), request.lastName())) {
            user.setLastName(request.lastName());
        }

        if (request.email() != null && request.email().length() > 0 && !Objects.equals(user.getEmail(), request.email())) {
            if (appUserRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new IllegalStateException(user.getEmail() +" already exists");
            }
            user.setEmail(request.email());
        }

        if (request.imageUrl() != null && request.imageUrl().length() > 0 && !Objects.equals(user.getImageUrl(), request.imageUrl())) {
            user.setImageUrl(request.imageUrl());
        }

        return appUserRepository.save(user);
    }

    public void uploadUserImage(Long id, MultipartFile file) {
    }
}
