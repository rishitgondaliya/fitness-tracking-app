package com.SFANT.SFANT.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SFANT.SFANT.dto.MealDTO;
import com.SFANT.SFANT.model.Meal;
import com.SFANT.SFANT.model.User;
import com.SFANT.SFANT.repository.MealRepository;
import com.SFANT.SFANT.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;
    private UserRepository userRepository;

    @Autowired
    private CumulativeCountService cumulativeCountService;

    public MealService(MealRepository mealRepository,UserRepository userRepository){
        this.mealRepository=mealRepository;
        this.userRepository=userRepository;
    }

    public MealDTO addMeal(MealDTO mealDTO) {
        Meal meal = new Meal();

        meal.setMealName(mealDTO.getMealName());
        meal.setCalories(mealDTO.getCalories());
        meal.setCarbohydrates(mealDTO.getCarbohydrates());
        meal.setProtein(mealDTO.getProtein());
        meal.setFat(mealDTO.getFat());
        
        User user = userRepository.findById(mealDTO.getUserId())
                                  .orElseThrow(() -> new RuntimeException("User not found"));
        meal.setUser(user);

        cumulativeCountService.updateExerciseCount(user, 1,"Meal");

        Meal savedMeal= mealRepository.save(meal);

        return new MealDTO(savedMeal.getId(),
                            savedMeal.getMealName(),
                            savedMeal.getCalories(),
                            savedMeal.getCarbohydrates(),
                            savedMeal.getProtein(),
                            savedMeal.getFat(),
                            savedMeal.getUser().getId()
        );
    }

    
    public List<MealDTO> getMealsByUserId(Long userId) {
        List<Meal> meals = mealRepository.findByUserId(userId);
        return meals.stream().map(meal -> new MealDTO(
            meal.getId(),
            meal.getMealName(),
            meal.getCalories(),
            meal.getProtein(),
            meal.getCarbohydrates(),
            meal.getFat(),
            meal.getUser().getId()
        )).collect(Collectors.toList());
    }

    public void deleteMeal(Long mealId) {
        mealRepository.deleteById(mealId);
    }
}
