package com.SFANT.SFANT.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SFANT.SFANT.dto.PlanDietDTO;
import com.SFANT.SFANT.model.DietPlan;
import com.SFANT.SFANT.model.User;
import com.SFANT.SFANT.repository.DietPlanRepository;
import com.SFANT.SFANT.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DietPlanServiceImpl {

    @Autowired
    private  DietPlanRepository dietPlanRepository;
    
    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private CumulativeCountService cumulativeCountService;

    public PlanDietDTO createDietPlan(PlanDietDTO dietPlanDTO) {
        DietPlan dietPlan = new DietPlan();
        dietPlan.setDietPlanName(dietPlanDTO.getDietPlanName());
        dietPlan.setDescription(dietPlanDTO.getDescription());
        dietPlan.setMealType(dietPlanDTO.getMealType());

        User user = userRepository.findById(dietPlanDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User with id " + dietPlanDTO.getUserId() + " not found"));
        dietPlan.setUser(user);

        cumulativeCountService.updateExerciseCount(user, 1,"DietPlan");

        DietPlan savedDietPlan = dietPlanRepository.save(dietPlan);

        return new PlanDietDTO(savedDietPlan.getId(),
                savedDietPlan.getDietPlanName(),
                savedDietPlan.getDescription(),
                savedDietPlan.getMealType(),
                savedDietPlan.getUser().getId());
    }

      public List<PlanDietDTO> getAllDietPlansByUserId(Long userId) {

        return dietPlanRepository.findByUserId(userId).stream().map(dietPlan -> {
            PlanDietDTO  dietPlanDTO = new PlanDietDTO();
            dietPlanDTO.setId(dietPlan.getId());
            dietPlanDTO.setDietPlanName(dietPlan.getDietPlanName());
            dietPlanDTO.setDescription(dietPlan.getDescription());
            dietPlanDTO.setMealType(dietPlan.getMealType());
            dietPlanDTO.setUserId(dietPlan.getUser().getId());

            return dietPlanDTO;
        }).collect(Collectors.toList());
    }

    public void deleteDietPlanById(Long id) {
        if (!dietPlanRepository.existsById(id)) {
            throw new RuntimeException("Diet Plan not found");
        }
        dietPlanRepository.deleteById(id);
    }
}