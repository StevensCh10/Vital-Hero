package com.vitalhero.fullstack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.vitalhero.fullstack.intrerfaces.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class UserRepository{
    
    @PersistenceContext
    private EntityManager entityManager;

    public Optional<User> findUsersByEmail(String email) {
        String sql = "SELECT * WHERE email = " + email;

        Query query = entityManager.createNativeQuery(sql, User.class);
    
        @SuppressWarnings("unchecked")
        List<User> results = (List<User>) query.getResultList();
    
        return results.stream().findFirst();
    }
}
