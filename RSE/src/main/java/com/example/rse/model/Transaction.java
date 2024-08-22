package com.example.rse.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 10)
    private String clientName;
    
    @Column(nullable = false, length = 10)
    private String agentName;

    @Column(nullable = false) 
    @NotNull(message = "Date is required")
    @PastOrPresent(message = "Date must be in the past or present")
    private LocalDate date;
    
    @Column(nullable = false, length = 80)
    @NotBlank(message = "Location is required")
    private String location;
    
    @Column(nullable = false, length = 10)
    @NotBlank(message = "Property type is required")
    @Pattern(regexp = "^(Apartment|House|Villa|Land|Commercial)$", message = "Property type must be one of the following: Apartment, House, Villa, Land, Commercial")
    private String propertyType;
    
   
    
    @Column(nullable = false, length = 10)
    @NotBlank(message = "Deal type is required")
    @Pattern(regexp = "^(Sale|Rent)$", message = "Deal type must be one of the following: Sale, Rent, Lease")
    private String dealType;
    
    @NotNull(message = "Transaction amount is required")
    @Min(value = 0, message = "Transaction amount must be a positive number")
    private Double transactionAmount;
    

    
    private String clientEmail;
    
    
	public Long getId() {
		return id;
	}
	public String getClientName() {
		return clientName;
	}
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getPropertyType() {
		return propertyType;
	}
	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}
	
	public String getDealType() {
		return dealType;
	}
	public void setDealType(String dealType) {
		this.dealType = dealType;
	}
	public Double getTransactionAmount() {
		return transactionAmount;
	}
	public void setTransactionAmount(Double transactionAmount) {
		this.transactionAmount = transactionAmount;
	}
	public String getClientEmail() {
		return clientEmail;
	}
	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}
	
    
    
    

    
}
