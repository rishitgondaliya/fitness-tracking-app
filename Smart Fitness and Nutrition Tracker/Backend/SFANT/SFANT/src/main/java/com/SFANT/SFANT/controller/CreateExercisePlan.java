package com.SFANT.SFANT.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SFANT.SFANT.dto.ExercisePlanDTO;
import com.SFANT.SFANT.services.ExercisePlanService;

@RestController
@RequestMapping("/api/exercisePlan")
public class CreateExercisePlan {
   
    @Autowired
    ExercisePlanService exercisePlanService;

    @PostMapping("/create")
    public ResponseEntity<ExercisePlanDTO> createPlan(@RequestBody ExercisePlanDTO exercisePlanDTO){
        return ResponseEntity.ok(exercisePlanService.createExercisePlan(exercisePlanDTO));
    }

    @GetMapping("/get/{id}")
    public List<ExercisePlanDTO> getAllPlanById(@PathVariable Long id){
        return exercisePlanService.getAllExercisePlansById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable long id){
        exercisePlanService.deleteExercisePlan(id);
        return ResponseEntity.noContent().build();
    }
}
