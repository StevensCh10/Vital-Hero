package com.vitalhero.fullstack.dto;

import com.vitalhero.fullstack.intrerfaces.User;

public record ResponseDTO (User user, String token) { }
