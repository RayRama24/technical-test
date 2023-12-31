package com.technicaltest.I2SC.repository;

import com.technicaltest.I2SC.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, String> {

//    @Transactional
//    Optional<Person> existsByNik(String nik);
//
//    @Transactional
//    Optional<Person> existsByNamaLengkap(String namaLengkap);

    @Query("SELECT p FROM Person p WHERE LOWER(p.nik) LIKE LOWER(CONCAT('%', :nik, '%')) AND LOWER(p.namaLengkap) LIKE LOWER(CONCAT('%', :namaLengkap, '%'))")
    List<Person> searchByNikAndName(@Param("nik") String nik, @Param("namaLengkap") String namaLengkap);

    @Query("SELECT p FROM Person p WHERE LOWER(p.nik) LIKE LOWER(CONCAT('%', :nik, '%'))")
    List<Person> searchByNik(@Param("nik") String nik);

    @Query("SELECT p FROM Person p WHERE LOWER(p.namaLengkap) LIKE LOWER(CONCAT('%', :namaLengkap, '%'))")
    List<Person> searchByName(@Param("namaLengkap") String namaLengkap);
}
