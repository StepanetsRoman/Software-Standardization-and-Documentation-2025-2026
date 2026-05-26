import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppButton } from "./ui/AppButton.jsx";
import {
  acceptAllCookieCategories,
  createDefaultCategories,
  loadCookieConsent,
  rejectOptionalCookieCategories,
  saveCustomCookieCategories,
  shouldShowCookieBanner
} from "../utils/cookieConsent.js";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.55) 100%);
`;

const Panel = styled.div`
  position: fixed;
  z-index: 41;
  left: 12px;
  right: 12px;
  bottom: 12px;
  max-width: min(720px, calc(100vw - 24px));
  margin: 0 auto;
  border-radius: 20px;
  padding: 18px 18px 16px;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(99, 102, 241, 0.12);
  backdrop-filter: blur(14px);
  pointer-events: auto;

  @media (min-width: 640px) {
    padding: 22px 22px 18px;
    left: 24px;
    right: 24px;
    bottom: 24px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: linear-gradient(120deg, #a855f7, #6366f1, #22c55e);
  -webkit-background-clip: text;
  color: transparent;
`;

const Lead = styled.p`
  margin: 0 0 12px;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--text-muted);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const Customize = styled.div`
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(148, 163, 184, 0.25);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.85rem;
  color: var(--text-main);
`;

const Switch = styled.input`
  width: 42px;
  height: 22px;
  accent-color: #6366f1;
  cursor: pointer;
`;

const Meta = styled.div`
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
`;

const MetaLink = styled(Link)`
  color: #a5b4fc;
  text-decoration: none;
  border-bottom: 1px solid rgba(165, 180, 252, 0.35);
  &:hover {
    color: #c7d2fe;
  }
`;

/**
 * Банер згоди на cookies з варіантами «прийняти», «відхилити опційні» та «налаштувати».
 * Зберігає вибір у `localStorage` відповідно до політики cookies та пояснення GDPR.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => shouldShowCookieBanner());
  const [customOpen, setCustomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(() => {
    const existing = typeof window !== "undefined" ? loadCookieConsent() : null;
    return existing
      ? Boolean(existing.categories.analytics)
      : createDefaultCategories().analytics;
  });
  const [marketing, setMarketing] = useState(() => {
    const existing = typeof window !== "undefined" ? loadCookieConsent() : null;
    return existing
      ? Boolean(existing.categories.marketing)
      : createDefaultCategories().marketing;
  });

  const necessaryNote = useMemo(
    () =>
      "Необхідні: ключ згоди trivia-quiz-cookie-consent-v1. Функціональні: налаштування гри та історія результатів.",
    []
  );

  if (!visible) return null;

  const close = () => setVisible(false);

  const onAccept = () => {
    acceptAllCookieCategories();
    close();
  };

  const onReject = () => {
    rejectOptionalCookieCategories();
    close();
  };

  const onSaveCustom = () => {
    saveCustomCookieCategories({ analytics, marketing });
    close();
  };

  return (
    <>
      <Backdrop aria-hidden />
      <Panel role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title">
        <TitleRow>
          <Title id="cookie-consent-title">Конфіденційність та cookies</Title>
        </TitleRow>
        <Lead>
          Trivia Quiz зберігає у вашому браузері (<code>localStorage</code>) псевдонім
          сесії, налаштування раунду (категорія, складність, кількість питань) та результати
          вікторини (бали, правильні відповіді). Окремо зберігається запис вашої згоди на
          категорії cookies. Дані не надсилаються на сервер — лише на цьому пристрої. Можна
          прийняти всі категорії, залишити лише необхідні або налаштувати опційні вручну.
        </Lead>
        {!customOpen && (
          <Actions>
            <AppButton variant="primary" onClick={onAccept}>
              Прийняти всі
            </AppButton>
            <AppButton variant="secondary" onClick={onReject}>
              Лише необхідні
            </AppButton>
            <AppButton variant="ghost" onClick={() => setCustomOpen(true)}>
              Налаштувати
            </AppButton>
          </Actions>
        )}
        {customOpen && (
          <Customize>
            <ToggleRow>
              <span>Необхідні (завжди увімкнено)</span>
              <Switch type="checkbox" checked disabled aria-label="Необхідні cookies" />
            </ToggleRow>
            <ToggleRow>
              <span>Аналітика (опційно)</span>
              <Switch
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                aria-label="Аналітичні cookies"
              />
            </ToggleRow>
            <ToggleRow>
              <span>Маркетинг (опційно)</span>
              <Switch
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                aria-label="Маркетингові cookies"
              />
            </ToggleRow>
            <Actions>
              <AppButton variant="primary" onClick={onSaveCustom}>
                Зберегти вибір
              </AppButton>
              <AppButton variant="ghost" onClick={() => setCustomOpen(false)}>
                Назад
              </AppButton>
            </Actions>
          </Customize>
        )}
        <Meta>
          <span>{necessaryNote}</span>
          <MetaLink to="/legal/gdpr">GDPR</MetaLink>
          <MetaLink to="/legal/cookies">Політика cookies</MetaLink>
          <MetaLink to="/legal/privacy">Конфіденційність</MetaLink>
        </Meta>
      </Panel>
    </>
  );
}
