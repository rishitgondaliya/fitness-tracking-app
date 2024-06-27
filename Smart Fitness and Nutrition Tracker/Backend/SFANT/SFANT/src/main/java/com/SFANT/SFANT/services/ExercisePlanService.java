package com.SFANT.SFANT.services;

import java.util.List;

import com.SFANT.SFANT.dto.ExercisePlanDTO;

public interface ExercisePlanService{
    ExercisePlanDTO createExercisePlan(ExercisePlanDTO exercisePlanDTO);
    List<ExercisePlanDTO> getAllExercisePlansById(Long id);
    void deleteExercisePlan(Long id);
}

