package com.example.rse.model;


import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import java.io.Serializable;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;

@Entity
public class Property implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")  // Use LONGBLOB for large binary data
    private byte[] imageUrl;
    
    @Column(length = 35)
    @NotNull
    @NotBlank(message = "BHK type is required")
    @Pattern(regexp = "^[0-9]+[BHK]{3}$", message = "BHK type should be in a valid format like '2BHK', '3BHK'")
    private String bhkType;
    
    @Column(nullable = false)
    @Min(value = 0, message = "Deposit price must be a positive number")
    private double depositPrice;
    
    @Column(nullable = false, length = 80)
    @NotBlank(message = "Location is required")
    private String location;
    
//    @Size(max = 100, message = "Description should not exceed 100 characters")
    private String description;
    
    @NotBlank(message = "Owner name is required")
    @Column(nullable = false, length = 20)
 
    private String ownerName;
    
    
    
    @Column(unique = true, nullable = false, length = 10)
    private Long ownerContact;
    
    @Column(nullable = false, length = 10)
    @NotBlank(message = "Property status is required")
    @Pattern(regexp = "^(Available|Sold|Rented)$", message = "Property status must be 'Available', 'Sold', or 'Rented'")
    private String propertyStatus;
    

    
    
    public Property(Long id, byte[] imageUrl,
			@NotNull @NotBlank(message = "BHK type is required") @Pattern(regexp = "^[0-9]+[BHK]{3}$", message = "BHK type should be in a valid format like '2BHK', '3BHK'") String bhkType,
			@Min(value = 0, message = "Deposit price must be a positive number") double depositPrice,
			@NotBlank(message = "Location is required") String location, String description,
			@NotBlank(message = "Owner name is required") String ownerName, Long ownerContact,
			@NotBlank(message = "Property status is required") @Pattern(regexp = "^(Available|Sold|Rented)$", message = "Property status must be 'Available', 'Sold', or 'Rented'") String propertyStatus) {
		super();
		this.id = id;
		this.imageUrl = imageUrl;
		this.bhkType = bhkType;
		this.depositPrice = depositPrice;
		this.location = location;
		this.description = description;
		this.ownerName = ownerName;
		this.ownerContact = ownerContact;
		this.propertyStatus = propertyStatus;
	}

    
    
    public Property() {
		super();
		// TODO Auto-generated constructor stub
	}



	// Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public byte[] getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(byte[] imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBhkType() { return bhkType; }
    public void setBhkType(String bhkType) { this.bhkType = bhkType; }

    public double getDepositPrice() { return depositPrice; }
    public void setDepositPrice(double depositPrice) { this.depositPrice = depositPrice; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public Long getOwnerContact() { return ownerContact; }
    public void setOwnerContact(Long ownerContact) { this.ownerContact = ownerContact; }
    
	public String getPropertyStatus() {
		return propertyStatus;
	}
	public void setPropertyStatus(String propertyStatus) {
		this.propertyStatus = propertyStatus;
	}



	
	
	
	
}
