package com.amope.registration.token;

import java.time.LocalDateTime;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;


    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public ConfirmationToken getToken(String token) {
        return confirmationTokenRepository.findByToken(token).orElseThrow(()-> new IllegalStateException("token not found"));
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
    }
}
