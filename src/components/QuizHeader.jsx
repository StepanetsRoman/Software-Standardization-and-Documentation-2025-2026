import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 20px;
  border-radius: 18px;
  background: radial-gradient(circle at top left, #1e293b 0, #020617 55%);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.45);

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #a855f7, #6366f1, #22c55e);
  -webkit-background-clip: text;
  color: transparent;
`;

const Subtitle = styled.div`
  font-size: 0.9rem;
  color: var(--text-muted);
`;

export function QuizHeader() {
  return (
    <Header>
      <Logo>Trivia Quiz</Logo>
      <Subtitle>
        Особисті маршрути з id користувача, налаштування вікторини та локальний збережений
        прогрес.
      </Subtitle>
    </Header>
  );
}
