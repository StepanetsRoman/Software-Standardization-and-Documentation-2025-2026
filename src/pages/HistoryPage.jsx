import React from "react";
import { useHistoryStore } from "../stores/historyStore.js";

export function HistoryPage({ userId }) {
  const history = useHistoryStore((state) => state.history);
  const items = userId != null ? history.filter((item) => item.userId === userId) : history;

  return (
    <section className="page page-results">
      <header className="page-header">
        <h1 className="page-title">Історія результатів</h1>
        <p className="page-description">
          Попередні ігри
          {userId ? (
            <>
              {" "}
              для користувача <strong>{userId}</strong>
            </>
          ) : (
            " усіх користувачів"
          )}
          .
        </p>
      </header>

      <div className="page-content">
        <div className="card results-card">
          <h2 className="card-title">Останні ігри</h2>
          <div className="card-body">
            {items.length === 0 && (
              <p className="card-hint">Поки що немає завершених ігор для відображення.</p>
            )}
            {items.slice(0, 20).map((item) => (
              <p key={item.id} className="results-row">
                <span className="results-label">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <span className="results-value">
                  {item.userId && <>[{item.userId}] </>}
                  {item.score}/{item.totalQuestions} • правильні: {item.correctCount},
                  серія: {item.bestStreak}
                </span>
              </p>
            ))}
            {items.length > 20 && (
              <p className="card-hint">Показано останні 20 ігор з {items.length}.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
