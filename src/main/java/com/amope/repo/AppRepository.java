package com.amope.repo;

import java.util.Optional;

import com.amope.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AppRepository<T extends DbObject> extends DatabaseAccessor<T> {

    @Transactional
    @Modifying
    @Query("UPDATE Subject s SET s.name = ?2, s.teacher = ?3 WHERE s.id = ?1")
    int updateSubject(Long subjectId, String subjectName, String teacher);

    Optional<AppUser> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);
}

@NoRepositoryBean
interface DatabaseAccessor<T> extends JpaRepository<T, Long> {

}