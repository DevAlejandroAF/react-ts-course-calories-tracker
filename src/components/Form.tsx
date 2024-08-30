import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
};

export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0,
  });

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const isNumericField = ["category", "calories"].includes(event.target.id);
    setActivity({
      ...activity,
      [event.target.id]: isNumericField
        ? +event.target.value
        : event.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoría:</label>
        <select id="category" value={activity.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida: jugo de naranja, ensalada. Ejercicio: Bicicleta, Pesas"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories">Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. Ej. 300, 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
