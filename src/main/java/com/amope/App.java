package com.amope;


import com.amope.appuser.AppUser;
import com.amope.appuser.AppUserRole;
import com.amope.appuser.AppUserService;
import com.amope.appuser.Address;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    CommandLineRunner runner(AppUserService service) {
        return args -> {
            Address address = new Address("Nigeria", "Ota", "1101AC");
            AppUser appUser = new AppUser("Dami",
                    "Ifenla",
                    "rofelis@yahoo.com",
                    "password",
                    AppUserRole.USER,
                    "f",
                    address);

            service.signUpUser(appUser);
        };
    }
}
