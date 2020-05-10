package com.sbouhaddi.contactsapi.controllers;

import com.sbouhaddi.contactsapi.controllers.dtos.AuthRequest;
import com.sbouhaddi.contactsapi.controllers.dtos.UserRequest;
import com.sbouhaddi.contactsapi.controllers.dtos.UserResponse;
import com.sbouhaddi.contactsapi.controllers.mappers.UserMapper;
import com.sbouhaddi.contactsapi.entities.CustomUser;
import com.sbouhaddi.contactsapi.repositories.UserRepository;
import com.sbouhaddi.contactsapi.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final PasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;


    @GetMapping("/users")
    public ResponseEntity<List<CustomUser>> getUsers() {
        List<CustomUser> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/sign-up")
    public ResponseEntity signUp(@Valid @RequestBody UserRequest user) {

        CustomUser customUser = userRepository.findByEmailAndUsername(user.getEmail(), user.getName());
        if (customUser != null) {
            return ResponseEntity.badRequest().body("User alrady exists");
        }
        customUser = CustomUser.builder().username(user.getName()).password(bCryptPasswordEncoder.encode(user.getPassword()))
                .email(user.getEmail()).build();
        customUser.setCreationDate(new Timestamp(System.currentTimeMillis()));
        customUser.setEnabled(true);
        customUser.setTokenExpired(false);
        String token = jwtUtils.generateToken(user.getName());
        customUser = userRepository.save(customUser);
        UserResponse returnUser = userMapper.userToUserResponse(customUser);
        returnUser.setToken(token);
        return ResponseEntity.ok(returnUser);
    }

    @GetMapping("/authenticate")
    public ResponseEntity<UserResponse> authenticate(@RequestHeader(name = "Authorization") String token) throws Exception {
        String username = jwtUtils.extractUsername(token.substring(7, token.length()));
        CustomUser user = userRepository.findByUsername(username);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        UserResponse outputUser = userMapper.userToUserResponse(user);
        return ResponseEntity.ok(outputUser);

    }

    @PostMapping("/login")
    private ResponseEntity authenticate(@RequestBody AuthRequest request) throws Exception {
        Objects.requireNonNull(request.getEmail());
        Objects.requireNonNull(request.getPassword());

        CustomUser user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword()));
        } catch (Exception ex) {
            throw new Exception("inavalid username/password");
        }
        String token = jwtUtils.generateToken(user.getUsername());
        UserResponse outputUser = userMapper.userToUserResponse(user);
        outputUser.setToken(token);

        return ResponseEntity.ok(outputUser);
    }


}
