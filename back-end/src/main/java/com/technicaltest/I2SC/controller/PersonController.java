package com.technicaltest.I2SC.controller;

import com.technicaltest.I2SC.model.Person;
import com.technicaltest.I2SC.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping
    public List<Person> getAllPersons(
            @RequestParam(required = false) String nik,
            @RequestParam(required = false) String namaLengkap
    ) {
        return personService.getAllPersons(nik, namaLengkap);
    }

    @GetMapping("/{nik}")
    public Person getPersonByNik(@PathVariable String nik) {
        return personService.getPersonByNik(nik);
    }

    @PostMapping
    public Person savePerson(@RequestBody Person person) {
        return personService.savePerson(person);
    }

    @DeleteMapping("/{nik}")
    public void deletePerson(@PathVariable String nik) {
        personService.deletePerson(nik);
    }

    @PutMapping("/{nik}")
    public ResponseEntity<Person> updatePerson(@PathVariable String nik, @RequestBody Person updatedPerson) {
        Person updated = personService.updatePerson(nik, updatedPerson);

        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
