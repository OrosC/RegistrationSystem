package com.amope.registration;

public record RegistrationRequest(String firstName,
        String lastName,
        String email,
        String password,
        String gender) {
}
