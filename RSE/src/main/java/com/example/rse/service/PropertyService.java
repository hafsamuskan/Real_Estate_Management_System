package com.example.rse.service;

import com.example.rse.model.Property;
import com.example.rse.repository.PropertyRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;
    
    @Transactional
    public void savePropertyImage(String name, String location, byte[] image) {
        Property property = new Property(null, image, location, 0, location, location, location, null, location);
        property.setOwnerName(name);
        property.setLocation(location);
        property.setImageUrl(image);
        propertyRepository.save(property);
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Optional<Property> findById(Long id) {
        return propertyRepository.findById(id);
    }

    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    public void deletePropertyById(Long id) {
        propertyRepository.deleteById(id);
    }

    public List<Property> getPropertiesByOwnerName(String ownerName) {
        return propertyRepository.findByOwnerName(ownerName);
    }
