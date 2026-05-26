import React from "react";

export function Scoreboard({ score, totalQuestions, correctCount, streak, bestStreak }) {
  return (
    <aside className="card scoreboard-card">
      <h3 className="card-subtitle">Результат</h3>
      <div className="scoreboard-row">
        <span>Поточний рахунок:</span>
        <span className="score-placeholder">{score}</span>
      </div>
      <div className="scoreboard-row">
        <span>Кількість запитань:</span>
        <span className="score-placeholder">{totalQuestions}</span>
      </div>
      <div className="scoreboard-row">
        <span>Правильні відповіді:</span>
        <span className="score-placeholder">{correctCount}</span>
      </div>
      <div className="scoreboard-row">
        <span>Поточна серія:</span>
        <span className="score-placeholder">{streak}</span>
      </div>
      <div className="scoreboard-row">
        <span>Найкраща серія:</span>
        <span className="score-placeholder">{bestStreak}</span>
      </div>
    </aside>
  );
}
