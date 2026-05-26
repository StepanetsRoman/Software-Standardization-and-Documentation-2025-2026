/**
 * Легкий локальний стейт переходів між екранами (альтернативний патерн до роутера).
 * @module useQuizNavigation
 */
import { useCallback, useState } from "react";

/** @enum {Record<string,string>} Константи іменованих кроків вікторини */
export const QUIZ_VIEW = {
  START: "start",
  GAME: "game",
  RESULTS: "results"
};

/**
 * @returns {{
 *   view: string,
 *   goToStart: () => void,
 *   goToGame: () => void,
 *   goToResults: () => void
 * }}
 */
export function useQuizNavigation() {
  const [view, setView] = useState(QUIZ_VIEW.START);

  const goToStart = useCallback(() => setView(QUIZ_VIEW.START), []);
  const goToGame = useCallback(() => setView(QUIZ_VIEW.GAME), []);
  const goToResults = useCallback(() => setView(QUIZ_VIEW.RESULTS), []);

  return {
    view,
    goToStart,
    goToGame,
    goToResults
  };
}
