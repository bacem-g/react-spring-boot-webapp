package com.writecleancode.demo.web;

import com.writecleancode.demo.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationResource {

    @GetMapping("/api/authenticate")
    public ResponseEntity<User> authenticate() {
        User user = new User();
        user.setId(1L);
        user.setUsername("bacem_g");
        user.setFirstName("bacem");
        user.setLastName("user");

        return ResponseEntity.ok(user);
    }
}
