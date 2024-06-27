package com.SFANT.SFANT.services;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SFANT.SFANT.dto.ExerciseDTO;
import com.SFANT.SFANT.model.Exercise;
import com.SFANT.SFANT.model.User;
import com.SFANT.SFANT.repository.ExerciseRepository;
import com.SFANT.SFANT.repository.UserRepository;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, UserRepository userRepository) {
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
    }
    @Autowired
    private CumulativeCountService cumulativeCountService;
    
    @Override
    public ExerciseDTO addExercise(ExerciseDTO exerciseDTO) {
        Exercise exercise = new Exercise();
        exercise.setName(exerciseDTO.getName());
        exercise.setDuration(exerciseDTO.getDuration());
        exercise.setCaloriesBurned(exerciseDTO.getCaloriesBurned());

        User user = userRepository.findById(exerciseDTO.getUserId())
                                  .orElseThrow(() -> new EntityNotFoundException("User with id " + exerciseDTO.getUserId() + " not found"));
        exercise.setUser(user);
        
        cumulativeCountService.updateExerciseCount(user, 1,"Exercises");

        Exercise savedExercise = exerciseRepository.save(exercise);

        return new ExerciseDTO(savedExercise.getId(),
                                savedExercise.getName(),
                                savedExercise.getDuration(),
                                savedExercise.getCaloriesBurned(),
                                savedExercise.getUser().getId());
    }

    @Override
    public List<Exercise> getAllExercisesByUserId(Long userId) {
        return exerciseRepository.getAllExercisesByUserId(userId);
    }

    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }
}
