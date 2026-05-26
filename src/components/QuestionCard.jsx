import React from "react";

export function QuestionCard({ question, index, total }) {
  if (!question) {
    return (
      <section className="card question-card">
        <h2 className="card-title">Запитання</h2>
        <p className="card-body">Запитання не знайдено.</p>
      </section>
    );
  }

  return (
    <section className="card question-card">
      <h2 className="card-title">
        Запитання {index + 1} з {total}
      </h2>
      <p className="card-body">{question.question}</p>
    </section>
  );
}
