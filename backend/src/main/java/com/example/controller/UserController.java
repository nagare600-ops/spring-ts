package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	private final UserService service;

	public UserController(UserService service) {
		this.service = service;
	}

	@GetMapping
	public List<User> getAll() {
		return service.findAll();
	}

	@PostMapping
	public User create(@RequestBody User user) {
		return service.save(user);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	@PutMapping("/{id}")
	public User update(@PathVariable Long id, @RequestBody User user){

	    user.setId(id);

	    return service.save(user);
	}
}