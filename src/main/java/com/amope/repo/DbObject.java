package com.amope.repo;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class DbObject {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    protected Long id;
    protected LocalDateTime created;
}
