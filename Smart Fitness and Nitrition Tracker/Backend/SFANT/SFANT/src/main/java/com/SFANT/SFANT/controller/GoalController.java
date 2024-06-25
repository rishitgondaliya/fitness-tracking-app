package com.SFANT.SFANT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SFANT.SFANT.dto.GoalDTO;
import com.SFANT.SFANT.model.Goal;
import com.SFANT.SFANT.services.GoalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    @Autowired
    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<Goal> createGoal(@PathVariable Long userId, @Valid @RequestBody Goal goal) {
        Goal savedGoal = goalService.createGoal(userId, goal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGoal);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<GoalDTO> getGoalByUserId(@PathVariable Long userId) {
        Goal goal = goalService.getGoalByUserId(userId);
        GoalDTO goalDTO = new GoalDTO(goal.getName(), goal.getDescription());
        return ResponseEntity.ok(goalDTO);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long userId) {
        goalService.deleteGoal(userId);
        return ResponseEntity.noContent().build();
    }
}
