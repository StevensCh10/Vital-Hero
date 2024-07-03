package com.vitalhero.fullstack.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        registry.addMapping("/**")
                //.allowedOrigins("http://localhost:5173") // tenho que mudar isso
                .allowedMethods("GET", "POST", "DELETE", "PUT");
    }
}