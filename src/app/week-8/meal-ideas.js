"use client";

import React, { useEffect, useState } from 'react';
import styles from './meal-ideas.module.css';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState({});

  const fetchMealIdeas = async (ingredient) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching meal ideas:", error);
      return [];
    }
  };

  const fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error("Error fetching meal details:", error);
      return null;
    }
  };

  const loadMealIdeas = async () => {
    if (ingredient) {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
    } else {
      setMeals([]);
    }
  };

  const handleMealClick = async (mealId) => {
    if (expandedMealId === mealId) {
      setExpandedMealId(null);
      return;
    }

    if (!mealDetails[mealId]) {
      const mealDetail = await fetchMealDetails(mealId);
      if (mealDetail) {
        const mealIngredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = mealDetail[`strIngredient${i}`];
          const measure = mealDetail[`strMeasure${i}`];
          if (ingredient) {
            mealIngredients.push(`${ingredient} - ${measure}`);
          } else {
            break;
          }
        }
        setMealDetails((prev) => ({
          ...prev,
          [mealId]: { ingredients: mealIngredients, image: mealDetail.strMealThumb }
        }));
      }
    }

    setExpandedMealId(mealId);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h1 className={styles.heading}>Meal Ideas</h1>
      {ingredient ? (
        meals.length > 0 ? (
          <ul className={styles.mealList}>
                            
            <h2>Click on any dish to see the ingredients.</h2>
            {meals.map(meal => (

              <li key={meal.idMeal} className={styles.mealItem}>
                <div className={styles.mealIng}>
                <div className={styles.mealName} onClick={() => handleMealClick(meal.idMeal)}>
                  {meal.strMeal}
                </div>
                {expandedMealId === meal.idMeal && mealDetails[meal.idMeal] && (
                  <div className={styles.mealDetails}>
                    <ul className={styles.ingredientsList}>
                      {mealDetails[meal.idMeal].ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.heading}>No meal ideas found for {ingredient}.</p>
        )
      ) : (
        <p>Select an item from the shopping list to see meal ideas.</p>
      )}
    </div>
  );
};

export default MealIdeas;
