/**
 * Zustand store історії ігор з персистенцією в `localStorage`.
 * @module historyStore
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "trivia-quiz-history";

export const useHistoryStore = create(
  persist(
    (set) => ({
      history: [],
      /**
       * Додає запис завершеної партії до історії. Дублікати з того ж результату протягом
       * короткого інтервалу відфільтровуються (захист від подвійного ефекту під React Strict Mode).
       *
       * @param {object} result
       * @param {string} result.userId
       * @param {number} result.score
       * @param {number} result.totalQuestions
       * @param {number} result.correctCount
       * @param {number} result.bestStreak
       */
      addGameResult: (result) =>
        set((state) => {
          const tsAdded = Date.now();
          const next = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            tsAdded,
            ...result
          };
          const prev = state.history[0];
          const prevTime =
            typeof prev?.tsAdded === "number"
              ? prev.tsAdded
              : Date.parse(prev?.timestamp || "") || tsAdded;
          if (
            prev &&
            prev.userId === next.userId &&
            prev.score === next.score &&
            prev.totalQuestions === next.totalQuestions &&
            prev.correctCount === next.correctCount &&
            prev.bestStreak === next.bestStreak &&
            tsAdded - prevTime < 850
          ) {
            return state;
          }
          return {
            history: [next, ...state.history]
          };
        }),
      /** Очищує всю локальну історію (лише браузер цього пристрою). */
      clearHistory: () => set({ history: [] })
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ history: state.history })
    }
  )
);
