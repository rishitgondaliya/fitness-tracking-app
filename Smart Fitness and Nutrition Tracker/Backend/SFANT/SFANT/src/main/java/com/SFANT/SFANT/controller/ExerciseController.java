package com.SFANT.SFANT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SFANT.SFANT.dto.ExerciseDTO;
import com.SFANT.SFANT.model.Exercise;
import com.SFANT.SFANT.services.ExerciseService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping("/add")
    public ResponseEntity<ExerciseDTO> addExercise(@RequestBody ExerciseDTO exerciseDTO) {
        ExerciseDTO addedExercise = exerciseService.addExercise(exerciseDTO);
        return ResponseEntity.ok().body(addedExercise);
    }

    // Endpoint to get all exercises by userId
    @GetMapping("/user/{userId}")
    public List<ExerciseDTO> getExercisesByUserId(@PathVariable Long userId) {
        List<Exercise> exercises = exerciseService.getAllExercisesByUserId(userId);
        return exercises.stream()
                .map(exercise -> new ExerciseDTO(
                        exercise.getId(),
                        exercise.getName(),
                        exercise.getDuration(),
                        exercise.getCaloriesBurned(),
                        exercise.getUser().getId()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }
}
