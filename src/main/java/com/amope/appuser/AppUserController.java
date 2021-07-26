package com.amope.appuser;

import java.util.List;

import com.amope.App;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class AppUserController {

    private final AppUserService userService;

    @GetMapping
    public ResponseEntity<List<AppUser>> fetchAllUsers() {
        List<AppUser> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUser> findUser(@PathVariable("id") Long id) {
        AppUser user = userService.findAppUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<AppUser> addUser(@RequestBody AppUser appUser) {
        AppUser newUser = userService.getAppUserRepository().save(appUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<AppUser> updateUser(@PathVariable("id") Long id,
                                              @RequestBody(required = false) AppUser request) {
        AppUser user = userService.updateUser(id, request);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/{id}/upload-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE

    )
    public ResponseEntity<AppUser> uploadUserImage(@PathVariable("id") Long id,
                                              @RequestParam MultipartFile file) {
        userService.uploadUserImage(id, file);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
        userService.getAppUserRepository().deleteById(id);
        return new ResponseEntity<>("Deleted user with id", HttpStatus.OK);
    }
}
