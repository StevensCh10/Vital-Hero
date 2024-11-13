package com.vitalhero.fullstack.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "send-cep-client", url = "https://viacep.com.br/ws")
public interface SendViaCep {
    
    @GetMapping("/{cep}/json")
    CepResponse getCepInfo(@PathVariable String cep);
}
