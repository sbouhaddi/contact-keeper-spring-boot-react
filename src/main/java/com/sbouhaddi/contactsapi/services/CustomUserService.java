package com.sbouhaddi.contactsapi.services;

import com.sbouhaddi.contactsapi.entities.CustomUser;
import com.sbouhaddi.contactsapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CustomUserService implements UserDetailsService {

    private final UserRepository customUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUser customUser = customUserRepository.findByUsername(username);
        return new User(customUser.getUsername(), customUser.getPassword(), true, true, true, true,
                new ArrayList<>());

    }

}
