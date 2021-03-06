import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [fetchedMeals, setfetchedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-cart-b1cd7-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong! " + response.status);
      }

      const data = await response.json();
      const newMealsList = [];
      for (const key in data) {
        newMealsList.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setfetchedMeals(newMealsList);
    };

    fetchMeals().catch((error) => {
      setFetchError(error.message);
    });

    // setTimeout(15000);
    setIsLoading(false);
    // console.log(fetchedMeals);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={styles.mealsLoading}>Loading...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section>
        <p className={styles.mealsFetchError}>{fetchError}</p>
      </section>
    );
  }

  const mealsList = fetchedMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
