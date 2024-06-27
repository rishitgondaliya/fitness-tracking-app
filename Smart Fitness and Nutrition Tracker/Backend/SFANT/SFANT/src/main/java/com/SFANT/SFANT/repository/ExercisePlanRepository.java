package com.SFANT.SFANT.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SFANT.SFANT.model.ExercisePlan;

public interface ExercisePlanRepository extends JpaRepository<ExercisePlan, Long> {
    List<ExercisePlan> findByUserId(Long userId);
}
