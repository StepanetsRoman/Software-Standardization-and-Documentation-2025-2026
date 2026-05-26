import React from "react";
import ReactDOM from "react-dom";

export function GameOverDialog({
  open,
  score,
  totalQuestions,
  correctCount,
  bestStreak,
  onRestartRound,
  onNextRound
}) {
  if (!open) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const content = (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">Гру завершено!</h2>
        <p className="modal-text">
          Ви відповіли правильно на{" "}
          <strong>
            {correctCount} із {totalQuestions}
          </strong>{" "}
          запитань.
        </p>
        <p className="modal-text">
          Підсумковий рахунок: <strong>{score}</strong>, найкраща серія:{" "}
          <strong>{bestStreak}</strong>.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={onRestartRound}>
            Повторити цей тур
          </button>
          <button type="button" className="btn btn-secondary" onClick={onNextRound}>
            Наступний тур (змінити налаштування)
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, modalRoot);
}
