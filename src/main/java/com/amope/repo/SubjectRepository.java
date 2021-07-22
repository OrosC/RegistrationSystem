package com.amope.repo;

import com.amope.appuser.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface SubjectRepository extends JpaRepository<Subject,Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Subject s SET s.name = ?2, s.teacher = ?3 WHERE s.id = ?1")
    int updateSubject(Long id, String name, String teacher);
}
