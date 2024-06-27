package com.SFANT.SFANT.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SFANT.SFANT.dto.MealDTO;
import com.SFANT.SFANT.services.MealService;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    @Autowired
    MealService mealService;

    @PostMapping("/add")
    public ResponseEntity<MealDTO> addMeal(@RequestBody MealDTO mealDTO) {
        MealDTO newMeal = mealService.addMeal(mealDTO);
        return ResponseEntity.ok(newMeal);
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<List<MealDTO>> getMealsByUserId(@PathVariable Long userId) {
        List<MealDTO> meals = mealService.getMealsByUserId(userId);
        return ResponseEntity.ok(meals);
    }

    @DeleteMapping("/delete/{mealId}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long mealId) {
        mealService.deleteMeal(mealId); 
        return ResponseEntity.noContent().build();
    }
}