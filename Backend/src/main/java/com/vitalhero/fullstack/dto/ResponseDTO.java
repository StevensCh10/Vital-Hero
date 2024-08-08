package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.UserDTO;

public record ResponseDTO(UserDTO user, String token) { }
