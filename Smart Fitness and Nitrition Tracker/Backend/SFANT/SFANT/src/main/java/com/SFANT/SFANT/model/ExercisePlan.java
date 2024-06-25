package com.SFANT.SFANT.model;

import jakarta.persistence.*;

@Entity
@Table
public class ExercisePlan{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dayOfWeek;
    private String exerciseName;
    private String exerciseType;
    private int duration;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public ExercisePlan() {
    }

    public ExercisePlan(String dayOfWeek, String exerciseName, String exerciseType, int duration) {
        this.dayOfWeek = dayOfWeek;
        this.exerciseName = exerciseName;
        this.exerciseType = exerciseType;
        this.duration = duration;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public String getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
    
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}