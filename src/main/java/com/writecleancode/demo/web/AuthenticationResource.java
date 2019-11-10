package com.writecleancode.demo.web;

import com.writecleancode.demo.domain.User;
import com.writecleancode.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationResource {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/authenticate")
    public ResponseEntity<User> authenticate() {
        String username = ((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username);

        return ResponseEntity.ok(user);
    }
}
