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

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.amope.repo.DbObject;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@NoArgsConstructor
@Entity
public class AppUser extends DbObject implements UserDetails {

    private final static String EMPTY_PROFILE_ICON = "https://cardingplug.com/wp-content/uploads/2020/09/cashoutempire-user-1-400x400.png";
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

    @ManyToMany
    @JoinTable(name = "user_subject",
            joinColumns = @JoinColumn(name="app_user_id"),
            inverseJoinColumns = @JoinColumn(name = "address_id"))
    private List<Subject> favoriteSubjects;

    private BigDecimal totalSpentInBooks;

    @ManyToMany
    @JoinTable(name = "user_address",
            joinColumns = @JoinColumn(name="app_user_id"),
            inverseJoinColumns = @JoinColumn(name = "address_id"))
    private List<Address> address;

    @Lob
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] user_photo;

    public AppUser(String firstName, String lastName, String email, String password,
                   String imageUrl, AppUserRole appUserRole, String gender, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.imageUrl = imageUrl != null? imageUrl: EMPTY_PROFILE_ICON;
        this.appUserRole = appUserRole;
        this.gender = "Female".equalsIgnoreCase(gender) ? Gender.FEMALE: "Male".equalsIgnoreCase(gender) ? Gender.MALE : null;
        this.address = new ArrayList<>();
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

    public boolean hasUploadDp() {
        return imageUrl != null;
    }
}
