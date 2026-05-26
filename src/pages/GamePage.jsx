import React from "react";
import { QuestionCard } from "../components/QuestionCard.jsx";
import { AnswerList } from "../components/AnswerList.jsx";
import { Scoreboard } from "../components/Scoreboard.jsx";
import { useSettingsStore } from "../stores/settingsStore.js";

export function GamePage({ quiz, userId }) {
  const settings = useSettingsStore((state) => state.settings);
  const {
    currentQuestion,
    totalQuestions,
    currentIndex,
    score,
    correctCount,
    streak,
    bestStreak,
    handleAnswer
  } = quiz;

  return (
    <section className="page page-game">
      <header className="page-header">
        <h1 className="page-title">Основна сторінка гри</h1>
        <p className="page-description">
          Користувач: <strong>{userId}</strong>. Відповідайте на запитання відповідно до
          вибраних налаштувань.
        </p>
        <p className="page-description">
          Час на одне запитання: {settings.timePerQuestion} с, кількість запитань:{" "}
          {settings.questionCount}.
        </p>
      </header>

      <div className="page-content page-content-grid">
        <div className="game-main-column">
          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={totalQuestions}
          />
          <AnswerList
            answers={currentQuestion?.answers ?? []}
            disabled={false}
            onSelect={handleAnswer}
          />
        </div>
        <div className="game-side-column">
          <Scoreboard
            score={score}
            totalQuestions={totalQuestions}
            correctCount={correctCount}
            streak={streak}
            bestStreak={bestStreak}
          />
        </div>
      </div>
    </section>
  );
}
