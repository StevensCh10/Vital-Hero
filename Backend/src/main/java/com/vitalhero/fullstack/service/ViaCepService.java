package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.client.CepResponse;
import com.vitalhero.fullstack.client.SendViaCep;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ViaCepService {
    
    private final SendViaCep sendViaCep;

    public CepResponse getCepDetails(String cep) {
        log.info("[getCepDetails]: Iniciando busca por informações do CEP via API");
        var response = sendViaCep.getCepInfo(cep);
        log.info("[getCepDetails]: Busca concluída com sucesso");
        return response;
    }
}
