package com.sbouhaddi.contactsapi.controllers.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserResponse {
    private String id;
    private String name;
    private String email;
    private String token;
}
