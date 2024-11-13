package com.vitalhero.fullstack.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.client.CepResponse;
import com.vitalhero.fullstack.exception.EntityAlreadyExists;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.repository.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService {
    
    private final AddressRepository repository;
    private final ViaCepService viaCepService;

    private final String ADDRESS_NOT_REGISTERED = "Endereço não registrado";
    private final String CEP_ALREADY_REGISTERED = "CEP já cadastrado";

    @Cacheable(value="address")
    public Address find(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFound(ADDRESS_NOT_REGISTERED));
    }

    @Cacheable(value="address")
    public Address create(Address newAddress){
        if(repository.findByCep(newAddress.getCep()) != null) throw new EntityAlreadyExists(CEP_ALREADY_REGISTERED);
        return repository.save(newAddress);
    }

    @CacheEvict(value="address", key="#id")
    public void delete(Long id){
        find(id);
        repository.deleteById(id);
    }

    public Address getAddress(String cep){
        CepResponse response = viaCepService.getCepDetails(cep);
        return Address.builder()
                .cep(response.getCep().replace("-", ""))
                .street(response.getLogradouro())
                .additionalInfo(response.getComplemento())
                .neighborhood(response.getBairro())
                .city(response.getLocalidade())
                .stateCode(response.getUf())
                .state(response.getEstado())
                .region(response.getRegiao())
                .build();
    }
}
