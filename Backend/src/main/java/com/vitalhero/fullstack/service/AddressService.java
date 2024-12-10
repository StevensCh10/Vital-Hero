package com.vitalhero.fullstack.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.client.CepResponse;
import com.vitalhero.fullstack.enums.ErrorMessage;
import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.model.Address;
import com.vitalhero.fullstack.repository.AddressRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AddressService {
    
    private final AddressRepository repository;
    private final ViaCepService viaCepService;

    @Cacheable(value="address")
    public Address findAddressById(Long id){
        log.info("[findAddressById]: Iniciando busca por endereço");
        var foundedAddress = repository.findById(id).orElseThrow(() -> {
            log.warn("[findAddressById]: Endereço com id '{}' não encontrado no sistema", id);
            return new EntityNotFound(ErrorMessage.ADDRESS_NOT_REGISTERED.toString());
        });
        log.info("[findAddressById]: Busca concluída com sucesso");
        return foundedAddress;
    }

    @Cacheable(value="address")
    public Address addAddress(Address newAddress){
        log.info("[addAddress]: Iniciando cadastro do endereço");
        var addedAddress = repository.save(newAddress);
        log.info("[addAddress]: Cadastrado concluído com sucesso");
        return addedAddress;
    }

    @CacheEvict(value="address", key="#id")
    public void deleteAddress(Long id){
        log.info("[deleteAddress]: - Iniciando remoção do endereço");
        findAddressById(id);
        repository.deleteById(id);
        log.info("[deleteAddress]: - Remoção concluída com sucesso");
    }

    public Address getAddress(String cep){
        log.info("[getAddress]: Iniciando busca pelos detalhes do endereço pelo cep via API");
        CepResponse response = viaCepService.getCepDetails(cep);
        var address = Address.builder()
                .cep(response.getCep().replace("-", ""))
                .street(response.getLogradouro())
                .additionalInfo(response.getComplemento())
                .neighborhood(response.getBairro())
                .city(response.getLocalidade())
                .stateCode(response.getUf())
                .state(response.getEstado())
                .region(response.getRegiao())
                .build();

        log.info("[getAddress]: Detalhes do endereço com cep '{}' encontrados com sucesso", cep);
        return address;
    }
}
