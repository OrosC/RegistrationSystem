package com.amope.appuser;

import java.util.List;
import java.util.Optional;

import com.amope.appuser.AppUser;
import org.hibernate.annotations.SelectBeforeUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@EntityScan
@Transactional(readOnly = true)
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);

    @Transactional
    @Query("SELECT a.id FROM AppUser a WHERE a.email = ?1")
    Optional<List<AppUser>> findDuplicateEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

    Optional<AppUser> findAppUserById(Long id);
}
