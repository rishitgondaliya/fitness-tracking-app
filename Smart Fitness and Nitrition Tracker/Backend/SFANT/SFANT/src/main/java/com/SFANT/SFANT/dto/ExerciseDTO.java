package com.SFANT.SFANT.dto;

public class ExerciseDTO {
    private Long id;
    private String name;
    private int duration;
    private int caloriesBurned;
    private Long userId;

    // Constructors, getters, and setters
    public ExerciseDTO(Long id, String name, int duration, int caloriesBurned, Long userId) {
        this.id=id;
        this.name = name;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
        this.userId = userId;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }
    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }
    public Long getUserId(){
        return userId;
    }
    public void setUserId(Long userId){
        this.userId=userId;
    }

   
}

