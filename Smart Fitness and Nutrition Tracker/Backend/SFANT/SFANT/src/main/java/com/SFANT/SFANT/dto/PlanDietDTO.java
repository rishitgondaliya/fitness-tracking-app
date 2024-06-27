package com.SFANT.SFANT.dto;

public class PlanDietDTO {
    private Long id;
    private String dietPlanName;
    private String description;
    private String mealType;
    private Long userId;

    public PlanDietDTO() {}

    public PlanDietDTO(Long id, String dietPlanName, String description, String mealType,Long userId) {
        this.id = id;
        this.dietPlanName = dietPlanName;
        this.description = description;
        this.mealType = mealType;
        this.userId=userId;
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
    public Long getUserId(){
        return userId;
    }
    public void setUserId(Long userId){
        this.userId=userId;
    }
}
