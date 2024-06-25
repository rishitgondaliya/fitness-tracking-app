package com.SFANT.SFANT.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SFANT.SFANT.model.Exercise;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> getAllExercisesByUserId(Long userId);
}

