package com.SFANT.SFANT.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SFANT.SFANT.model.DietPlan;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findByUserId(Long userId);
    List<DietPlan> getAllDietPlanByUserId(Long userId);
}
