package com.SFANT.SFANT.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SFANT.SFANT.dto.ExercisePlanDTO;
import com.SFANT.SFANT.model.ExercisePlan;
import com.SFANT.SFANT.model.User;
import com.SFANT.SFANT.repository.ExercisePlanRepository;
import com.SFANT.SFANT.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExercisePlanServiceImpl implements ExercisePlanService {

    private final ExercisePlanRepository exercisePlanRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExercisePlanServiceImpl(ExercisePlanRepository exercisePlanRepository, UserRepository userRepository) {
        this.exercisePlanRepository = exercisePlanRepository;
        this.userRepository = userRepository;

    }
    @Autowired
    private CumulativeCountService cumulativeCountService;
        


    @Override
    public ExercisePlanDTO createExercisePlan(ExercisePlanDTO exercisePlanDTO) {

        ExercisePlan exercisePlan = new ExercisePlan();
        exercisePlan.setId(exercisePlanDTO.getId());
        exercisePlan.setDayOfWeek(exercisePlanDTO.getDayOfWeek());
        exercisePlan.setExerciseName(exercisePlanDTO.getExerciseName());
        exercisePlan.setExerciseType(exercisePlanDTO.getExerciseType());
        exercisePlan.setDuration(exercisePlanDTO.getDuration());
        User user = userRepository.findById(exercisePlanDTO.getUserId()).orElseThrow(() -> new EntityNotFoundException("User with id " + exercisePlanDTO.getUserId() + " not found"));

        exercisePlan.setUser(user);


        cumulativeCountService.updateExerciseCount(user, 1,"ExercisePlan");
        
        ExercisePlan savedExercisePlan = exercisePlanRepository.save(exercisePlan);

        return new ExercisePlanDTO(savedExercisePlan.getId(),
                savedExercisePlan.getDayOfWeek(),
                savedExercisePlan.getExerciseName(),
                savedExercisePlan.getExerciseType(),
                savedExercisePlan.getDuration(),
                savedExercisePlan.getUser().getId());
    }

    @Override
    public List<ExercisePlanDTO> getAllExercisePlansById(Long id) {
        return exercisePlanRepository.findAll().stream().map(exercisePlan -> {
            ExercisePlanDTO exercisePlanDTO = new ExercisePlanDTO();
            exercisePlanDTO.setId(exercisePlan.getId());
            exercisePlanDTO.setDayOfWeek(exercisePlan.getDayOfWeek());
            exercisePlanDTO.setExerciseName(exercisePlan.getExerciseName());
            exercisePlanDTO.setExerciseType(exercisePlan.getExerciseType());
            exercisePlanDTO.setDuration(exercisePlan.getDuration());
            exercisePlanDTO.setUserId(exercisePlan.getUser().getId());

            return exercisePlanDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteExercisePlan(Long id) {
        exercisePlanRepository.deleteById(id);
    }
}
