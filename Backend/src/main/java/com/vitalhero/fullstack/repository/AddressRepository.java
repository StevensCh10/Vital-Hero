package com.vitalhero.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vitalhero.fullstack.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{
    Address findByCep(String cep);
}
