package com.sbouhaddi.contactsapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomUser {

    @Id
    private String id;
    @NotEmpty
    @JsonProperty("name")
    private String username;
    @Email
    //@Indexed(unique = true)
    private String email;
    @JsonIgnore
    @NotEmpty
    private String password;
    @JsonIgnore
    @CreatedDate
    private Date creationDate;
    @JsonIgnore
    private boolean enabled;
    @JsonIgnore
    private boolean tokenExpired;

}
