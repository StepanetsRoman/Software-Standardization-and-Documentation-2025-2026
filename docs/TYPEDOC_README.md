# Документація програмного коду — Trivia Quiz

Збірка генерується **TypeDoc** з JSDoc-коментарів у модулях:

- `src/hooks` — `useQuizEngine` (питання, відповіді, підрахунок), `useQuizNavigation`;
- `src/stores` — `settingsStore` (категорія, складність), `historyStore` (результати раундів);
- `src/utils` — `cookieConsent` (банер згоди, категорії localStorage).

Команди:

```bash
npm run docs
```

Результат: `docs/api/index.html`.

Компоненти React (`AppButton`, `CookieConsentBanner`, сторінки гри) описані в **Storybook**:

```bash
npm run storybook
```

**Автор проєкту:** Степанець Роман Степанович, ВТк-24-1 — vtk241_srs@student.ztu.edu.ua
