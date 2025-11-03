package com.purna.hostel.controller;

import com.purna.hostel.entity.Complaint;
import com.purna.hostel.entity.User;
import com.purna.hostel.service.ComplaintService;
import com.purna.hostel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:4200")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private UserService userService;

    // ✅ Submit complaint by student
    @PostMapping("/submit")
    public Complaint submitComplaint(@RequestBody Complaint complaint) {
        if (complaint.getUserId() == null) {
            throw new RuntimeException("User ID is required in complaint request.");
        }

        User user = userService.getUserById(complaint.getUserId());
        return complaintService.submitComplaint(user, complaint);
    }

    // ✅ Get complaints by a specific user (Student View)
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getComplaintsByUser(@PathVariable Long userId) {
        return complaintService.getComplaintsByUser(userId).stream()
                .map(complaint -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", complaint.getId());
                    map.put("studentName", complaint.getUser() != null ? complaint.getUser().getFullName() : "Unknown");
                    map.put("subject", complaint.getSubject());
                    map.put("complaint", complaint.getDescription());
                    map.put("status", complaint.getStatus());
                    map.put("date", complaint.getCreatedAt());
                    return map;
                })
                .collect(Collectors.toList());
    }

    // ✅ Get all complaints (Warden/Admin View)
    @GetMapping("/all")
    public List<Map<String, Object>> getAllComplaints() {
        return complaintService.getAllComplaints().stream()
                .map(complaint -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", complaint.getId());
                    map.put("studentName", complaint.getUser() != null ? complaint.getUser().getFullName() : "Unknown");
                    map.put("subject", complaint.getSubject());
                    map.put("complaint", complaint.getDescription());
                    map.put("status", complaint.getStatus());
                    map.put("date", complaint.getCreatedAt());
                    return map;
                })
                .collect(Collectors.toList());
    }

    // ✅ Update complaint status (Resolve)
    @PutMapping("/update-status/{complaintId}")
    public Complaint updateComplaintStatus(@PathVariable Long complaintId, @RequestParam String status) {
        return complaintService.updateComplaintStatus(complaintId, status);
    }
}
