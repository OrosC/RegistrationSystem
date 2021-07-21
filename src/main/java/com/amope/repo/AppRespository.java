package com.amope.repo;

import javax.persistence.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface AppRespository<T, ID> {
    //extends JpaRepository<DbObject,Long>
}
