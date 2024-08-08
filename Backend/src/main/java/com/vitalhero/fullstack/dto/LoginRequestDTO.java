package com.vitalhero.fullstack.dto;

import lombok.Getter;

public record LoginRequestDTO(@Getter String email, @Getter String password) {
}
