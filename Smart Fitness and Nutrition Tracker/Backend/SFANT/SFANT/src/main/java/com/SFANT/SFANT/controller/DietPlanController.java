package com.SFANT.SFANT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SFANT.SFANT.dto.PlanDietDTO;
import com.SFANT.SFANT.services.DietPlanServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/dietplans")
public class DietPlanController {

    @Autowired
    private DietPlanServiceImpl dietPlanService;

    @PostMapping("/add")
    public ResponseEntity<PlanDietDTO> createDietPlan(@RequestBody PlanDietDTO planDietDTO) {
        PlanDietDTO createdDietPlan = dietPlanService.createDietPlan(planDietDTO);
        return ResponseEntity.ok(createdDietPlan);
    }

    @GetMapping("get/{userId}")
    public ResponseEntity<List<PlanDietDTO>> getAllDietPlans(@PathVariable Long userId) {
        List<PlanDietDTO> dietPlans = dietPlanService.getAllDietPlansByUserId(userId);
        return ResponseEntity.ok(dietPlans);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDietPlanById(@PathVariable Long id) {
        dietPlanService.deleteDietPlanById(id);
        return ResponseEntity.noContent().build();
    }
}

