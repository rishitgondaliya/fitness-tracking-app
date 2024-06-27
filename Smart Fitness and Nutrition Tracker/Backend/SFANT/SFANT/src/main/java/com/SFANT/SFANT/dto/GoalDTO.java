package com.SFANT.SFANT.dto;

public class GoalDTO {
    private String name;
    private String description;

    public GoalDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
