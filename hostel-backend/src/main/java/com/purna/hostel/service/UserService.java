package com.purna.hostel.service;

import com.purna.hostel.entity.Role;
import com.purna.hostel.entity.User;
import com.purna.hostel.repository.RoleRepository;
import com.purna.hostel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User createUser(User user, Set<String> roleNames) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("❌ Role not found in DB: " + roleName));
            roles.add(role);
        }

        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("❌ User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ User not found with ID: " + id));
    }

    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("❌ User not found with username: " + username));
    }

    // ✅ Get all students (ROLE_USER)
    public List<User> getAllStudents() {
        return userRepository.findByRoleName("ROLE_USER");
    }

    // ✅ Search students by keyword (for Manage Student page)
    public List<User> searchStudents(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return userRepository.findByRoleName("ROLE_USER");
        }
        return userRepository.searchStudents(keyword);
    }


}
