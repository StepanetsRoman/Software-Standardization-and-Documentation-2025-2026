import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { UserSelectPage } from "./pages/UserSelectPage.jsx";
import { StartPage } from "./pages/StartPage.jsx";
import { GamePage } from "./pages/GamePage.jsx";
import { ResultsPage } from "./pages/ResultsPage.jsx";
import { HistoryPage } from "./pages/HistoryPage.jsx";
import { GameOverDialog } from "./components/GameOverDialog.jsx";
import { LegalMarkdownPage } from "./pages/LegalMarkdownPage.jsx";
import { useQuizEngine } from "./hooks/useQuizEngine.js";
import { useSettingsStore } from "./stores/settingsStore.js";
import { useHistoryStore } from "./stores/historyStore.js";

import cookiesMarkdown from "../COOKIES_POLICY.md?raw";
import eulaMarkdown from "../EULA.md?raw";
import gdprMarkdown from "../GDPR_EXPLANATION.md?raw";
import privacyMarkdown from "../PRIVACY_POLICY.md?raw";

function QuizRoutes() {
  const { userId } = useParams();
  const settings = useSettingsStore((state) => state.settings);
  const addGameResult = useHistoryStore((state) => state.addGameResult);
  const quiz = useQuizEngine(settings);
  const navigate = useNavigate();
  const [showGameOver, setShowGameOver] = useState(false);
  const handledFinishRef = useRef(false);

  useEffect(() => {
    if (!quiz.isFinished) {
      handledFinishRef.current = false;
      return;
    }
    if (handledFinishRef.current) {
      return;
    }
    handledFinishRef.current = true;

    addGameResult({
      userId,
      score: quiz.score,
      totalQuestions: quiz.totalQuestions,
      correctCount: quiz.correctCount,
      bestStreak: quiz.bestStreak
    });
    setShowGameOver(true);
    navigate(`/user/${encodeURIComponent(userId)}/results`, {
      replace: true
    });
  }, [
    addGameResult,
    navigate,
    quiz.bestStreak,
    quiz.correctCount,
    quiz.isFinished,
    quiz.score,
    quiz.totalQuestions,
    userId
  ]);

  const handleStart = () => {
    quiz.resetQuiz();
    setShowGameOver(false);
    navigate(`/user/${encodeURIComponent(userId)}/game`, { replace: true });
  };

  const handleRestartRound = () => {
    quiz.resetQuiz();
    setShowGameOver(false);
    navigate(`/user/${encodeURIComponent(userId)}/game`, { replace: true });
  };

  const handleNextRound = () => {
    quiz.resetQuiz();
    setShowGameOver(false);
    navigate(`/user/${encodeURIComponent(userId)}/start`, { replace: true });
  };

  return (
    <>
      <nav className="page-content" aria-label="Навігація по сторінках">
        <div className="card">
          <div className="card-body">
            <div className="form-row">
              <span className="form-label">
                Маршрути для користувача <strong>{userId}</strong>
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Link className="btn btn-secondary" to="start">
                  Старт
                </Link>
                <Link className="btn btn-secondary" to="game">
                  Гра
                </Link>
                <Link className="btn btn-secondary" to="results">
                  Результати
                </Link>
                <Link className="btn btn-secondary" to="history">
                  Історія
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="start" element={<StartPage onStart={handleStart} userId={userId} />} />
        <Route path="game" element={<GamePage quiz={quiz} userId={userId} />} />
        <Route
          path="results"
          element={
            <ResultsPage
              score={quiz.score}
              totalQuestions={quiz.totalQuestions}
              correctCount={quiz.correctCount}
              bestStreak={quiz.bestStreak}
              userId={userId}
            />
          }
        />
        <Route path="history" element={<HistoryPage userId={userId} />} />
        <Route
          path="*"
          element={<Navigate to={`/user/${encodeURIComponent(userId)}/start`} replace />}
        />
      </Routes>

      <GameOverDialog
        open={showGameOver}
        score={quiz.score}
        totalQuestions={quiz.totalQuestions}
        correctCount={quiz.correctCount}
        bestStreak={quiz.bestStreak}
        onRestartRound={handleRestartRound}
        onNextRound={handleNextRound}
      />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/legal/privacy"
          element={
            <LegalMarkdownPage
              title="Політика конфіденційності"
              markdown={privacyMarkdown}
            />
          }
        />
        <Route
          path="/legal/eula"
          element={
            <LegalMarkdownPage
              title="Ліцензійна угода з кінцевим користувачем (EULA)"
              markdown={eulaMarkdown}
            />
          }
        />
        <Route
          path="/legal/cookies"
          element={
            <LegalMarkdownPage title="Політика щодо cookies" markdown={cookiesMarkdown} />
          }
        />
        <Route
          path="/legal/gdpr"
          element={
            <LegalMarkdownPage
              title="Інформація щодо обробки персональних даних (GDPR)"
              markdown={gdprMarkdown}
            />
          }
        />
        <Route path="/" element={<UserSelectPage />} />
        <Route path="/user/:userId/*" element={<QuizRoutes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
