package com.sbouhaddi.contactsapi.controllers;

import com.sbouhaddi.contactsapi.controllers.dtos.ContactResponse;
import com.sbouhaddi.contactsapi.controllers.mappers.ContactMapper;
import com.sbouhaddi.contactsapi.entities.Contact;
import com.sbouhaddi.contactsapi.repositories.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ContactController {

    private final ContactRepository contactRepository;
    private final ContactMapper contactMapper;

    @GetMapping("/getContacts")
    public ResponseEntity<List<ContactResponse>> getAllContacts(Principal principal) {
        List<ContactResponse> contacts = new ArrayList<>();
        contactRepository.findByUsername(principal.getName()).forEach(contact -> contacts.add(contactMapper.contactToContactResponse(contact)));
        return ResponseEntity.ok(contacts);
    }

    @PostMapping("/contacts")
    public ResponseEntity<ContactResponse> createContact(@Valid @RequestBody Contact contact, Authentication authentication) {
        contact.setUsername(authentication.getName());
        contact.setCreationDate(new Date());

        Contact savedContact = contactRepository.save(contact);
        return ResponseEntity.ok(contactMapper.contactToContactResponse(savedContact));
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity deleteContact(@PathVariable String id) {
        Contact contact = contactRepository.findById(id).get();
        if (contact == null) {
            return ResponseEntity.notFound().build();
        }
        contactRepository.delete(contact);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/contacts")
    public ResponseEntity updateContact(@RequestBody Contact contact, Authentication authentication) {
        Optional<Contact> contactData = contactRepository.findById(contact.getId());

        if (contactData.isPresent()) {
            Contact _contact = contactData.get();
            _contact.setUsername(authentication.getName());
            _contact.setName(contact.getName());
            _contact.setEmail(contact.getEmail());
            _contact.setPhone(contact.getPhone());
            _contact.setType(contact.getType());
            _contact.setUpdateDate(new Date());

            return ResponseEntity.ok(contactMapper.contactToContactResponse(contactRepository.save(_contact)));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
