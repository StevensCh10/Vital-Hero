package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;

import lombok.Getter;

public record ResponseDTO(@Getter UserDTO user, String token) { }
