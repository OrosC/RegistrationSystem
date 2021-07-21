package com.amope.appuser;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.amope.repo.DbObject;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Address extends DbObject {

    @SequenceGenerator(
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "address_sequence"
    )
    private String country;
    private String postCode;
    private String city;

    public Address(String country, String postCode, String city) {
        this.country = country;
        this.postCode = postCode;
        this.city = city;
    }


    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUsers;

}
