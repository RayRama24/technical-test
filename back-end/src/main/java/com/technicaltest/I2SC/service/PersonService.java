package com.technicaltest.I2SC.service;

import com.technicaltest.I2SC.model.Person;
import com.technicaltest.I2SC.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public List<Person> getAllPersons(String nik, String namaLengkap) {
        if (nik != null && !nik.isEmpty() && namaLengkap != null) {
            return personRepository.searchByNikAndName(nik, namaLengkap);
        } else if (nik != null && !nik.isEmpty()) {
            return personRepository.searchByNik(nik);
        } else if (namaLengkap != null) {
            return personRepository.searchByName(namaLengkap);
        } else {
            return personRepository.findAll();
        }
    }

    public Person getPersonByNik(String nik) {
        return personRepository.findById(nik).orElse(null);
    }

    public Person savePerson(Person person) {
        return personRepository.save(person);
    }

    public void deletePerson(String nik) {
        personRepository.deleteById(nik);
    }

    public Person updatePerson(String nik, Person updatedPerson) {
        Person existingPerson = personRepository.findById(nik).orElse(null);

        if (existingPerson != null) {

            existingPerson.setNamaLengkap(updatedPerson.getNamaLengkap());
            existingPerson.setJenisKelamin(updatedPerson.getJenisKelamin());
            existingPerson.setTanggalLahir(updatedPerson.getTanggalLahir());
            existingPerson.setAlamat(updatedPerson.getAlamat());
            existingPerson.setNegara(updatedPerson.getNegara());
            return personRepository.save(existingPerson);
        }

        return null;
    }
}
