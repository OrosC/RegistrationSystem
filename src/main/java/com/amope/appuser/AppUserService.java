package com.amope.appuser;

import java.time.LocalDateTime;
import java.util.UUID;

import com.amope.registration.token.ConfirmationToken;
import com.amope.registration.token.ConfirmationTokenService;
import com.amope.repo.AddressRepository;
import com.amope.repo.SubjectRespository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final AppUserRepository appUserRepository;
    private final SubjectRespository subjectRespository;
    private final AddressRepository addressRepository;
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

        subjectRespository.saveAll(appUser.getFavoriteSubjects());
        addressRepository.save(appUser.getAddress());
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
}
