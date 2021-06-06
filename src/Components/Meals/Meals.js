// import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <section>
      <MealsSummary />
      <section>
        <AvailableMeals />
      </section>
    </section>
  );
};

export default Meals;
