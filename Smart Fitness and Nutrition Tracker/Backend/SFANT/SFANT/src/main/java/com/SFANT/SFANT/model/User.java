package com.SFANT.SFANT.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Exercise> exercises;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ExercisePlan> exercisePlans;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Meal> meal;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<DietPlan> dietPlan;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CumulativeCountEntity> commulativeCountEntities;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Goal goal;

    public User() {
    }

    public User(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
       this.goal=goal;
    }
}