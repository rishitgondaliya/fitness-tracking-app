package com.SFANT.SFANT.dto;

public class ExercisePlanDTO{
    private Long id;
    private String dayOfWeek;
    private String exerciseName;
    private String exerciseType;
    private int duration;
    private Long userId;

    public ExercisePlanDTO() {
    }

    public ExercisePlanDTO(Long id, String dayOfWeek, String exerciseName, String exerciseType, int duration,Long userId) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.exerciseName = exerciseName;
        this.exerciseType = exerciseType;
        this.duration = duration;
        this.userId = userId;
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
    public Long getUserId(){
        return userId;
    }
    public void setUserId(Long userId){
        this.userId=userId;
    }
}
