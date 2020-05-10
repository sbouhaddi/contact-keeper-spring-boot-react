package com.sbouhaddi.contactsapi.controllers.mappers;

import com.sbouhaddi.contactsapi.controllers.dtos.UserResponse;
import com.sbouhaddi.contactsapi.entities.CustomUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mappings({
            @Mapping(target="name", source="user.username")
    })
    UserResponse userToUserResponse(CustomUser user);
}
