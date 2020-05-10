package com.sbouhaddi.contactsapi.repositories;

import com.sbouhaddi.contactsapi.entities.CustomUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<CustomUser, String> {
    CustomUser findByUsername(String username);
    CustomUser findByEmailAndUsername(String email, String username);
    CustomUser findByEmail(String email);
}
