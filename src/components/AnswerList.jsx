import React from "react";

export function AnswerList({ answers, onSelect, disabled }) {
  if (!answers || answers.length === 0) {
    return null;
  }

  return (
    <section className="card answers-card">
      <h3 className="card-subtitle">Варіанти відповіді</h3>
      <ul className="answers-list">
        {answers.map((answer) => (
          <li key={answer.id} className="answers-item">
            <button
              className="btn answer-btn"
              type="button"
              onClick={() => onSelect?.(answer.id)}
              disabled={disabled}
            >
              {answer.text}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
