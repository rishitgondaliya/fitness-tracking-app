package com.SFANT.SFANT.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SFANT.SFANT.Exception.ResourceNotFoundException;
import com.SFANT.SFANT.model.Goal;
import com.SFANT.SFANT.model.User;
import com.SFANT.SFANT.repository.GoalRepository;
import com.SFANT.SFANT.repository.UserRepository;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    @Autowired
    public GoalService(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    public Goal createGoal(Long userId, Goal goal) {
        boolean goalExists = goalRepository.findByUserId(userId).isPresent();
        if (goalExists) {
            throw new RuntimeException("User already has a goal set.");
        }

        return userRepository.findById(userId).map(user -> {
            goal.setUser(user);
            return goalRepository.save(goal);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    public Goal getGoalByUserId(Long userId) {
        return goalRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found for Current User" + userId));
    }

    public void deleteGoal(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        Goal goal = user.getGoal();
        if (goal != null) {
            user.setGoal(null); 
            goalRepository.delete(goal);
            userRepository.save(user); 
        }
    }
}
