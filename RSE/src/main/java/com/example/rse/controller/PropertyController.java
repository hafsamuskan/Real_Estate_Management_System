
package com.example.rse.controller;

import com.example.rse.model.Property;
import com.example.rse.model.User;
import com.example.rse.service.PropertyService;
import com.example.rse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private final PropertyService propertyService;

    @Autowired
    private final UserService userService;
    
    public PropertyController(PropertyService propertyService, UserService userService) {
        this.propertyService = propertyService;
        this.userService = userService;
    }

    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createProperty(
            @RequestParam("username") String username,
            @RequestParam("imageUrl") MultipartFile imageFile,
            @RequestParam("bhkType") String bhkType,
            @RequestParam("depositPrice") double depositPrice,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("ownerName") String ownerName,
            @RequestParam("ownerContact") Long ownerContact,
            @RequestParam("propertyStatus") String propertyStatus) {

        Optional<User> user = userService.findByUsername(username);

        if (user.isPresent() && "agent".equalsIgnoreCase(user.get().getRole())) {
            try {
                Property property = new Property(ownerContact, null, propertyStatus, depositPrice, propertyStatus, propertyStatus, propertyStatus, ownerContact, propertyStatus);
                property.setImageUrl(imageFile.getBytes());
                property.setBhkType(bhkType);
                property.setDepositPrice(depositPrice);
                property.setLocation(location);
                property.setDescription(description);
                property.setOwnerName(ownerName);
                property.setOwnerContact(ownerContact);
                property.setPropertyStatus(propertyStatus);

                Property savedProperty = propertyService.saveProperty(property);
                return ResponseEntity.ok(savedProperty.getId()); // Return property ID
            } catch (IOException e) {
                return ResponseEntity.status(500).body("Error processing the file");
            }
        }

        return ResponseEntity.status(403).body("Unauthorized to create property listing");
    }

    @GetMapping("/image/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<byte[]> getPropertyImage(@PathVariable Long id) {
        Optional<Property> property = propertyService.findById(id);

        if (property.isPresent()) {
            byte[] image = property.get().getImageUrl();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG) // Use MediaType.IMAGE_PNG if needed
                    .body(image);
        }

        return ResponseEntity.status(404).body(null);
    }

    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> updateProperty(
        @PathVariable Long id, 
        @RequestBody Property updatedProperty, 
        @RequestParam String username
    ) {
        Optional<User> user = userService.findByUsername(username);

        if (user.isPresent() && "agent".equalsIgnoreCase(user.get().getRole())) {
            Optional<Property> existingProperty = propertyService.findById(id);

            if (existingProperty.isPresent()) {
                Property property = existingProperty.get();
                property.setImageUrl(updatedProperty.getImageUrl());
                property.setBhkType(updatedProperty.getBhkType());
                property.setDepositPrice(updatedProperty.getDepositPrice());
                property.setLocation(updatedProperty.getLocation());
                property.setDescription(updatedProperty.getDescription());
                property.setOwnerName(updatedProperty.getOwnerName());
                property.setOwnerContact(updatedProperty.getOwnerContact());
                property.setPropertyStatus(updatedProperty.getPropertyStatus());

                Property savedProperty = propertyService.saveProperty(property);
                return ResponseEntity.ok(savedProperty); // Return property ID
            }

            return ResponseEntity.status(404).body("Property not found");
        }

        return ResponseEntity.status(403).body("Unauthorized to update property listing");
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id, @RequestParam String username) {
        Optional<User> user = userService.findByUsername(username);

        if (user.isPresent() && "agent".equalsIgnoreCase(user.get().getRole())) {
            Optional<Property> property = propertyService.findById(id);

            if (property.isPresent()) {
                propertyService.deletePropertyById(id);
                return ResponseEntity.ok("Property deleted successfully");
            }

            return ResponseEntity.status(404).body("Property not found");
        }

        return ResponseEntity.status(403).body("Unauthorized to delete property listing");
    }
    
    

    @GetMapping("/get/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyService.findById(id);

        if (property.isPresent()) {
            return ResponseEntity.ok(property.get());
        }

        return ResponseEntity.status(404).body("Property not found");
    }
    
    
    
    

    @GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getAllProperties() {
        return ResponseEntity.ok(propertyService.findAll());
    }
    
    
    @GetMapping("/properties")
    public List<Property> getPropertiesByOwnerName(@RequestParam String ownerName) {
        return propertyService.getPropertiesByOwnerName(ownerName);
    }

    @GetMapping("/view")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> viewProperties(@RequestParam String username) {
        Optional<User> user = userService.findByUsername(username);

        if (user.isPresent() && ("client".equalsIgnoreCase(user.get().getRole()) || "agent".equalsIgnoreCase(user.get().getRole()))) {
            List<Property> properties = propertyService.findAll();
            return ResponseEntity.ok(properties);
        }

        return ResponseEntity.status(403).body("Unauthorized to view properties");
    }
}
