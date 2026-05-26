/**
 * Глобальні налаштування вікторини (Zustand + persist у `localStorage`).
 * @module settingsStore
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "trivia-quiz-settings";

/** @typedef {"any"|"history"|"science"|"movies"} QuizCategoryOption */
/** @typedef {"any"|"easy"|"medium"|"hard"} QuizDifficultyOption */

/**
 * @typedef {Object} QuizSettings
 * @property {QuizCategoryOption} category
 * @property {QuizDifficultyOption} difficulty
 * @property {number} questionCount
 * @property {number} timePerQuestion секунди на запитання (може впливати на майбутні таймери)
 */

/** @type {QuizSettings} */
const defaultSettings = {
  category: "any",
  difficulty: "any",
  questionCount: 5,
  timePerQuestion: 30
};

export const useSettingsStore = create(
  persist(
    (set) => ({
      /** @type {QuizSettings} */
      settings: defaultSettings,
      /**
       * Частково оновлює налаштування гри й злив дефолти з персістен станом safely.
       *
       * @param {Partial<QuizSettings>} patch
       */
      updateSettings: (patch) =>
        set((state) => ({
          settings: { ...defaultSettings, ...state.settings, ...patch }
        }))
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ settings: state.settings }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        settings: { ...defaultSettings, ...persistedState?.settings }
      })
    }
  )
);
