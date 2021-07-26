package com.amope.appuser;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.amope.repo.DbObject;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Subject extends DbObject {

    private String name;
    private String teacher;

    @ManyToMany(mappedBy = "favoriteSubjects")
    private List<AppUser> appUser;

    public Subject(String name, String teacher) {
        this.name = name;
        this.teacher = teacher;
        this.setCreated(LocalDateTime.now());
    }
}
