package com.amope.appuser;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.amope.repo.DbObject;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Address extends DbObject {

    private String country;
    private String postCode;
    private String city;

    public Address(String country, String postCode, String city) {
        this.country = country;
        this.postCode = postCode;
        this.city = city;
        this.setCreated(LocalDateTime.now());
    }


    @ManyToMany(mappedBy = "address")
    private List<AppUser> appUsers;

}
