package com.example.rse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.rse.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
