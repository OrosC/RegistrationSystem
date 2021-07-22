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
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

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

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String imageUrl;
    private Boolean locked = false;
    private Boolean enabled = false;

    @OneToMany
    @JoinColumn(name = "app_user_id")
    private List<Subject> favoriteSubjects;
    private BigDecimal totalSpentInBooks;
    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    public AppUser(String firstName, String lastName, String email, String password,
                   String imageUrl, AppUserRole appUserRole, String gender, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.imageUrl = imageUrl;
        this.appUserRole = appUserRole;
        this.gender = "Female".equalsIgnoreCase(gender) ? Gender.FEMALE: "Male".equalsIgnoreCase(gender) ? Gender.MALE : null;
        this.address = address;
        this.setCreated(LocalDateTime.now());
        favoriteSubjects = new ArrayList<>();
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

    public boolean hasAddress() {
        return address != null;
    }

    public boolean hasFavs() {
        return favoriteSubjects.size()>0;
    }
}
