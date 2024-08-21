package com.example.rse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rse.model.InterestedTenant;
import com.example.rse.repository.InterestedTenantRepository;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin(origins = "http://localhost:3000") // Adjust this to match your frontend URL
public class AgentController {

    @Autowired
    private InterestedTenantRepository interestedTenantRepository;
    
    @GetMapping("/interested-tenants")
    public ResponseEntity<List<InterestedTenant>> getInterestedTenants() {
        try {
            List<InterestedTenant> tenants = interestedTenantRepository.findAll();
            return ResponseEntity.ok(tenants);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/interested-tenants")
    public ResponseEntity<?> addInterestedTenant(@RequestBody InterestedTenant tenantData) {
        try {
            InterestedTenant savedTenant = interestedTenantRepository.save(tenantData);
            return ResponseEntity.ok(savedTenant);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving interested tenant: " + e.getMessage());
        }
    }
}