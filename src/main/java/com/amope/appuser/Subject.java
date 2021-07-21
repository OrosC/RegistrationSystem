package com.amope.appuser;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Subject {
    @SequenceGenerator(
            name = "subject_sequence",
            sequenceName = "subject_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "subject_sequence"
    )
    private Long id;
    private String name;
    private String author;
    private String publisher;

    @OneToMany
    @JoinColumn(name = "subject_id")
    private List<AppUser> appUser;

    public Subject(String name, String author, String publisher) {
        this.name = name;
        this.author = author;
        this.publisher = publisher;
    }
}
