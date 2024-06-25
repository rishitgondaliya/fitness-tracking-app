package com.SFANT.SFANT.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table()
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dietPlanName;
    private String description;
    private String mealType;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public DietPlan() {}

    // Constructor with parameters
    public DietPlan(String dietPlanName, String description, String mealType) {
        this.dietPlanName = dietPlanName;
        this.description = description;
        this.mealType = mealType;
    }

    // Getter and Setter methods
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDietPlanName() {
        return dietPlanName;
    }

    public void setDietPlanName(String dietPlanName) {
        this.dietPlanName = dietPlanName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

