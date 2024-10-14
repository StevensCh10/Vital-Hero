package com.vitalhero.fullstack.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.vitalhero.fullstack.exception.EntityNotFound;
import com.vitalhero.fullstack.intrerfaces.User;
import com.vitalhero.fullstack.model.BloodCenter;
import com.vitalhero.fullstack.model.Doctor;
import com.vitalhero.fullstack.model.Donor;
import com.vitalhero.fullstack.repository.BloodCenterRepository;
import com.vitalhero.fullstack.repository.DoctorRepository;
import com.vitalhero.fullstack.repository.DonorRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    DonorRepository donorRepository;

    @Autowired
    DoctorRepository doctorRepository;
    
    @Autowired
    BloodCenterRepository bloodcenterRepository;

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        var login = tokenService.validateToken(token);

        
        if (login != null) {
            User user = findUserByEmail(login);
        
            if (user == null) {
                throw new EntityNotFound("Usuário não encontrado");
            }
        
            var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private User findUserByEmail(String login) {
        Donor donor = donorRepository.findByEmail(login);
        if (donor != null) {
            return donor;
        }
    
        Doctor doctor = doctorRepository.findByEmail(login);
        if (doctor != null) {
            return doctor;
        }
    
        BloodCenter bloodCenter = bloodcenterRepository.findByEmail(login);
        if (bloodCenter != null) {
            return bloodCenter;
        }
    
        return null;
    }    

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}