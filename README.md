# Trivia Quiz

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-purple)](https://github.com/pmndrs/zustand)
[![styled-components](https://img.shields.io/badge/styled--components-6-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Веб-додаток для проходження **вікторини (Trivia Quiz)**. Користувач вводить псевдонім, обирає параметри раунду, відповідає на запитання з тематик історія / наука / фільми, після чого бачить результат і локальну історію спроб. Усе працює у браузері без серверної авторизації та без платежів.

---

## Що вміє застосунок

1. **Вхід** — на головній (`/`) вводиться псевдонім (username); він потрапляє в URL як `/user/<псевдонім>/…`.
2. **Налаштування раунду** — категорія (`історія`, `наука`, `фільми` або будь-яка), складність, кількість питань.
3. **Гра** — послідовні питання з варіантами відповіді; рахується кількість правильних, серія та найкраща серія.
4. **Результат** — після завершення раунду показується підсумок; запис додається в локальну історію.
5. **Історія** — перегляд попередніх спроб для обраного псевдоніма (лише на цьому пристрої).
6. **Правові сторінки** — Privacy, EULA, Cookies, GDPR у markdown і в UI за маршрутами `/legal/…`.
7. **Банер згоди** — керування категоріями cookies/localStorage перед опційною обробкою.

Проєкт **не** є інтернет-магазином, соцмережею, банківським чи аналітичним сервісом.

---

## Стек

| Категорія | Технології |
| --- | --- |
| UI | React 18, styled-components |
| Збірка | Vite 5 |
| Маршрутизація | React Router v6 |
| Стан | Zustand + persist (`localStorage`) |
| Форми | react-hook-form, yup |
| Документація коду | TypeDoc (JSDoc у `hooks`, `stores`, `utils`) |
| UI-каталог | Storybook 8 |
| Тести | Vitest, Testing Library |
| Якість | ESLint 9, Prettier 3 |

---

## Встановлення та запуск

**Вимога:** Node.js ≥ 18.18.

```bash
git clone https://github.com/StepanetsRoman/Software-Standardization-and-Documentation-2025-2026
cd Software-Standardization-and-Documentation-2025-2026
npm install
npm run dev
```

Відкрийте в браузері адресу з консолі (за замовчуванням `http://localhost:5176` — порт у [`vite.config.js`](./vite.config.js)).

| Команда | Призначення |
| --- | --- |
| `npm start` / `npm run dev` | розробка |
| `npm run build` | production у `dist/` |
| `npm run preview` | перегляд збірки |
| `npm run docs` | TypeDoc → `docs/api/` |
| `npm run storybook` | Storybook → `http://localhost:6006` |
| `npm run build-storybook` | статика в `storybook-static/` |
| `npm run test` | Vitest |
| `npm run lint` | ESLint |
| `npm run license:report` | `license-report.md` + `.txt` |

### Типовий сценарій

1. Введіть псевдонім на `/` → «Перейти до вікторини».
2. На `/user/<псевдонім>/start` оберіть категорію та кількість питань → розпочати гру.
3. Відповідайте на `/game`; після останнього питання відкриється `/results`.
4. Перегляньте `/history` для попередніх раундів цього псевдоніма.

---

## Storybook

```bash
npm run storybook
```

Історії описують реальні компоненти проєкту:

- **UI/AppButton** — кнопки інтерфейсу (primary, secondary, ghost).
- **Legal/CookieConsentBanner** — банер згоди з play-сценарієм «Налаштувати».

---

## Згенерована документація (TypeDoc)

```bash
npm run docs
```

Після виконання відкрийте `docs/api/index.html`. Документуються модулі:

- `useQuizEngine`, `useQuizNavigation` — логіка раунду;
- `settingsStore`, `historyStore` — налаштування та історія в `localStorage`;
- `cookieConsent` — згода на категорії зберігання.

Вступний текст: [`docs/TYPEDOC_README.md`](./docs/TYPEDOC_README.md).

---

## Ліцензія та залежності

- Код проєкту: [MIT](./LICENSE).
- Звіт ліцензій npm-залежностей: [`license-report.md`](./license-report.md) (оновлюється командою `npm run license:report`).
- Більшість залежностей також під MIT — сумісно з ліцензією проєкту.

---

## GDPR, cookies та localStorage

| Ключ / дані | Призначення |
| --- | --- |
| `trivia-quiz-cookie-consent-v1` | вибір категорій згоди (банер) |
| `trivia-quiz-settings` | категорія, складність, кількість питань |
| `trivia-quiz-history` | результати раундів (псевдонім, бали, дата) |
| Псевдонім у URL | маршрутизація сесії без реєстрації |

Детально:

- [PRIVACY_POLICY.md](./PRIVACY_POLICY.md)
- [COOKIES_POLICY.md](./COOKIES_POLICY.md)
- [GDPR_EXPLANATION.md](./GDPR_EXPLANATION.md)
- [EULA.md](./EULA.md)

У застосунку: `/legal/privacy`, `/legal/cookies`, `/legal/gdpr`, `/legal/eula`.

---


## Структура репозиторію

```
├── src/
│   ├── components/     # UI, банер cookies, scoreboard
│   ├── hooks/          # useQuizEngine, useQuizNavigation
│   ├── pages/          # старт, гра, результати, історія, legal
│   ├── stores/         # settings, history (Zustand)
│   └── utils/          # cookieConsent
├── docs/api/           # після npm run docs
├── .storybook/
├── PRIVACY_POLICY.md
├── EULA.md
├── COOKIES_POLICY.md
└── GDPR_EXPLANATION.md
```

---

## Troubleshooting

| Проблема | Що зробити |
| --- | --- |
| Порт 5176 зайнятий | змініть `server.port` у `vite.config.js` |
| Банер не з’являється | видаліть `trivia-quiz-cookie-consent-v1` у DevTools → Application → Local Storage |
| Порожня історія | переконайтесь, що завершили раунд (останнє питання) |
| Storybook без stories | файли мають закінчуватись на `.stories.jsx` у `src/` |

---

## Автор

| | |
| --- | --- |
| **Виконавець** | Степанець Роман Степанович |
| **Група** | ВТк-24-1 |
| **Email** | vtk241_srs@student.ztu.edu.ua |
| **GitHub** | [StepanetsRoman](https://github.com/StepanetsRoman/Software-Standardization-and-Documentation-2025-2026) |
| **Керівник** | Савіцький Роман Святославович |

Навчальний проєкт з дисципліни «Стандартизація та документування програмних систем» (Житомирська політехніка).

