package com.sbouhaddi.contactsapi.repositories;

import com.sbouhaddi.contactsapi.entities.Contact;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ContactRepository extends PagingAndSortingRepository<Contact,String> {
    List<Contact> findByUsername(String username);
}
