package com.purna.hostel.controller;

import com.purna.hostel.dto.UserDTO;
import com.purna.hostel.entity.Role;
import com.purna.hostel.entity.User;
import com.purna.hostel.repository.RoleRepository;
import com.purna.hostel.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ✅ Register new user (ADMIN / STUDENT / WARDEN)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("❌ Username already taken");
        }
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("❌ Email already in use");
        }

        // ✅ Determine frontend role
        String frontendRole = user.getRoles() != null && !user.getRoles().isEmpty()
                ? user.getRoles().iterator().next().getName().toUpperCase()
                : "STUDENT";

        String roleToAssign;
        switch (frontendRole) {
            case "ADMIN":
                roleToAssign = "ROLE_ADMIN";
                break;
            case "WARDEN":
                roleToAssign = "ROLE_MANAGER";
                break;
            default:
                roleToAssign = "ROLE_USER";
        }

        // ✅ Find role in DB
        Role dbRole = roleRepository.findByName(roleToAssign)
                .orElseThrow(() -> new RuntimeException("❌ Role not found in database: " + roleToAssign));

        // ✅ Encode password before save
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // ✅ Set correct roles
        user.setRoles(Collections.singleton(dbRole));

        // ✅ Save user
        User created = userService.save(user);

        // ✅ Prepare response DTO
        UserDTO dto = new UserDTO();
        dto.setId(created.getId());
        dto.setUsername(created.getUsername());
        dto.setEmail(created.getEmail());
        dto.setFullName(created.getFullName());
        dto.setPhone(created.getPhone());
        dto.setRoles(Collections.singleton(roleToAssign));

        return ResponseEntity.ok(dto);
    }

    // ✅ Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        var userOpt = userService.findByUsername(loginRequest.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("❌ User not found");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("❌ Invalid credentials");
        }

        // ✅ Extract clean role (STUDENT / WARDEN / ADMIN)
        String cleanRole = user.getRoles().stream()
                .map(r -> r.getName().replace("ROLE_", "").toUpperCase())
                .findFirst()
                .orElse("STUDENT");

        // ✅ Prepare response payload for frontend
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("phone", user.getPhone());
        response.put("role", cleanRole);
        response.put("token", "mock-jwt-" + user.getId()); // temporary token

        return ResponseEntity.ok(response);
    }
}
