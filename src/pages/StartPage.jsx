import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSettingsStore } from "../stores/settingsStore.js";

const schema = yup.object({
  category: yup.string().required(),
  difficulty: yup.string().required(),
  questionCount: yup
    .number()
    .typeError("Введіть число")
    .integer("Має бути цілим числом")
    .min(3, "Мінімум 3 запитання")
    .max(30, "Максимум 30 запитань")
    .required("Обов'язкове поле"),
  timePerQuestion: yup
    .number()
    .typeError("Введіть число")
    .integer("Має бути цілим числом")
    .min(5, "Мінімум 5 секунд")
    .max(120, "Максимум 120 секунд")
    .required("Обов'язкове поле")
});

export function StartPage({ onStart, userId }) {
  const settings = useSettingsStore((state) => state.settings);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: settings,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  const onSubmit = (values) => {
    updateSettings(values);
    onStart?.();
  };

  return (
    <section className="page page-start">
      <header className="page-header">
        <h1 className="page-title">Стартова сторінка</h1>
        <p className="page-description">
          Налаштуйте параметри вікторини перед початком гри. Поточний користувач:{" "}
          <strong>{userId}</strong>.
        </p>
      </header>

      <div className="page-content">
        <form className="card" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className="card-title">Налаштування вікторини</h2>
          <div className="card-body">
            <div className="form-row">
              <label className="form-label">Тема</label>
              <select className="input" {...register("category")}>
                <option value="any">Будь-яка</option>
                <option value="history">Історія</option>
                <option value="science">Наука</option>
                <option value="movies">Фільми</option>
              </select>
              {errors.category && (
                <span className="form-error">{errors.category.message}</span>
              )}
            </div>

            <div className="form-row">
              <label className="form-label">Складність</label>
              <select className="input" {...register("difficulty")}>
                <option value="any">Будь-яка</option>
                <option value="easy">Легка</option>
                <option value="medium">Середня</option>
                <option value="hard">Складна</option>
              </select>
              {errors.difficulty && (
                <span className="form-error">{errors.difficulty.message}</span>
              )}
            </div>

            <div className="form-row">
              <label className="form-label">Кількість запитань</label>
              <input
                type="number"
                className="input"
                min={3}
                max={30}
                {...register("questionCount")}
              />
              {errors.questionCount && (
                <span className="form-error">{errors.questionCount.message}</span>
              )}
            </div>

            <div className="form-row">
              <label className="form-label">Час на одне запитання (сек)</label>
              <input
                type="number"
                className="input"
                min={5}
                max={120}
                {...register("timePerQuestion")}
              />
              {errors.timePerQuestion && (
                <span className="form-error">{errors.timePerQuestion.message}</span>
              )}
            </div>

            <button className="btn btn-primary" type="submit">
              Почати гру
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
