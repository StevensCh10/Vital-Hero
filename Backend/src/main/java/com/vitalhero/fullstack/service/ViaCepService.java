package com.vitalhero.fullstack.service;

import org.springframework.stereotype.Service;

import com.vitalhero.fullstack.client.CepResponse;
import com.vitalhero.fullstack.client.SendViaCep;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ViaCepService {
    
    private final SendViaCep sendViaCep;

    public CepResponse getCepDetails(String cep) {
        return sendViaCep.getCepInfo(cep);
    }
}
