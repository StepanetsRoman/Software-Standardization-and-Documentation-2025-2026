import React from "react";
import { useHistoryStore } from "../stores/historyStore.js";

export function ResultsPage({ score, totalQuestions, correctCount, bestStreak, userId }) {
  const history = useHistoryStore((state) => state.history);
  const userHistory = userId ? history.filter((item) => item.userId === userId) : [];
  return (
    <section className="page page-results">
      <header className="page-header">
        <h1 className="page-title">Сторінка результатів</h1>
        <p className="page-description">
          Підсумок гри для користувача <strong>{userId}</strong>.
        </p>
      </header>

      <div className="page-content">
        <div className="card results-card">
          <h2 className="card-title">Підсумок гри</h2>
          <div className="card-body">
            <p className="results-row">
              <span className="results-label">Загальний рахунок:</span>
              <span className="results-value">
                {score} / {totalQuestions}
              </span>
            </p>
            <p className="results-row">
              <span className="results-label">Правильні відповіді:</span>
              <span className="results-value">{correctCount}</span>
            </p>
            <p className="results-row">
              <span className="results-label">Найкраща серія:</span>
              <span className="results-value">{bestStreak}</span>
            </p>
          </div>
        </div>

        {userHistory.length > 0 && (
          <div className="card" style={{ marginTop: 12 }}>
            <h2 className="card-title">Попередні ігри користувача</h2>
            <div className="card-body">
              {userHistory.slice(0, 10).map((item) => (
                <p key={item.id} className="results-row">
                  <span className="results-label">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <span className="results-value">
                    {item.score}/{item.totalQuestions} • правильні: {item.correctCount},
                    серія: {item.bestStreak}
                  </span>
                </p>
              ))}
              {userHistory.length > 10 && (
                <p className="card-hint">
                  Показано останні 10 ігор з {userHistory.length}.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
