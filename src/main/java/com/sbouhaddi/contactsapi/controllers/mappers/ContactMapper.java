package com.sbouhaddi.contactsapi.controllers.mappers;

import com.sbouhaddi.contactsapi.controllers.dtos.ContactResponse;

import com.sbouhaddi.contactsapi.entities.Contact;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ContactMapper {

    ContactMapper INSTANCE = Mappers.getMapper(ContactMapper.class);
    ContactResponse contactToContactResponse(Contact contact);
}
