import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { QuizHeader } from "./QuizHeader.jsx";
import { CookieConsentBanner } from "./CookieConsentBanner.jsx";

const AppRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 18px;

  @media (min-width: 768px) {
    padding: 32px 40px;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Footer = styled.footer`
  font-size: 0.78rem;
  text-align: center;
  color: var(--text-muted);
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 14px;

  a {
    color: #a5b4fc;
    text-decoration: none;
    border-bottom: 1px solid rgba(165, 180, 252, 0.35);

    &:hover {
      color: #c7d2fe;
    }
  }
`;

export function Layout({ children }) {
  return (
    <AppRoot>
      <QuizHeader />
      <Main>{children}</Main>
      <Footer>
        <span>
          Trivia Quiz — вікторина (історія, наука, фільми). Локальне збереження псевдоніма та
          результатів у браузері. Політики: Privacy · Cookies · GDPR · EULA.
        </span>
        <FooterLinks aria-label="Правові документи">
          <Link to="/legal/privacy">Конфіденційність</Link>
          <Link to="/legal/eula">EULA</Link>
          <Link to="/legal/cookies">Cookies</Link>
          <Link to="/legal/gdpr">GDPR</Link>
          <Link to="/">Головна</Link>
        </FooterLinks>
      </Footer>
      <CookieConsentBanner />
    </AppRoot>
  );
}
