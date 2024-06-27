package com.SFANT.SFANT.services;

import java.util.List;

import com.SFANT.SFANT.dto.ExerciseDTO;
import com.SFANT.SFANT.model.Exercise;

public interface ExerciseService {
    ExerciseDTO addExercise(ExerciseDTO exerciseDTO);
    List<Exercise> getAllExercisesByUserId(Long userId);
    void deleteExercise(Long id);
}


