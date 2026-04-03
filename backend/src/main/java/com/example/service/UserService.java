package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo){
        this.repo = repo;
    }

    public List<User> findAll(){
        return repo.findAll();
    }

    public User save(User user){
    	if(user.getId() != null && !repo.existsById(user.getId())){
    	    throw new RuntimeException("User not found");
    	}
        return repo.save(user);
    }

    public void delete(Long id){
        repo.deleteById(id);
    }
}