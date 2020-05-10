package com.sbouhaddi.contactsapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Document(collection = "contact")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Contact {
    @Id
    private String id;
    @NotEmpty
    private String name;
    @JsonIgnore
    private String username;
    @Email
    private String email;
    private String phone;
    private String type;
    @CreatedDate
    private Date creationDate;
    private Date updateDate;
}
