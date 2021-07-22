package com.amope.appuser;

public record AppUserRequest (String firstName,
                              String lastName,
                              String email,
                              String password,
                              String imageUrl) {
}
