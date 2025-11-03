package com.purna.hostel.controller;

import com.purna.hostel.entity.User;
import com.purna.hostel.entity.Role;
import com.purna.hostel.service.UserService;
import com.purna.hostel.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Get all students
    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        List<User> students = userService.getAllStudents();
        return students.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(students);
    }

    // ✅ Search students by name
    @GetMapping("/students/search")
    public ResponseEntity<List<User>> searchStudents(@RequestParam String name) {
        List<User> results = userService.searchStudents(name);
        return results.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(results);
    }

    // ✅ Add new student (Admin adds)
    @PostMapping("/students")
    public ResponseEntity<User> addStudent(@RequestBody User student) {
        Role studentRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("❌ Student role not found"));

        student.setRoles(new HashSet<>(Collections.singleton(studentRole)));
        return ResponseEntity.ok(userService.save(student));
    }

    // ✅ Update student
    @PutMapping("/students/{id}")
    public ResponseEntity<User> updateStudent(@PathVariable Long id, @RequestBody User updated) {
        User existing = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ Student not found"));

        existing.setFullName(updated.getFullName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setUsername(updated.getUsername());
        existing.setRoom(updated.getRoom());

        return ResponseEntity.ok(userService.save(existing));
    }


}
