package com.example.rse.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rse.model.InterestedTenant;

public interface InterestedTenantRepository extends JpaRepository<InterestedTenant, Long> {
}
