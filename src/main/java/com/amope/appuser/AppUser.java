package com.amope.appuser;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Transient;

import com.amope.repo.DbObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@NoArgsConstructor
@Entity
public class AppUser extends DbObject implements UserDetails {

    @SequenceGenerator(
            name = "app_user_sequence",
            sequenceName = "app_user_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "app_user_sequence"
    )
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Boolean locked = false;
    private Boolean enabled = false;

    @OneToMany
    @JoinColumn(name = "app_user_id")
    private List<Subject> favoriteSubjects;
    private BigDecimal totalSpentInBooks;
    private LocalDateTime created;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    public AppUser(String firstName, String lastName, String email, String password,
                   AppUserRole appUserRole, String gender, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
        this.gender = "f".equalsIgnoreCase(gender) ? Gender.FEMALE: Gender.MALE;
        this.address = address;
        this.created = LocalDateTime.now();
        favoriteSubjects = new ArrayList<Subject>();
        favoriteSubjects.add(new Subject("Maths", null, null));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
