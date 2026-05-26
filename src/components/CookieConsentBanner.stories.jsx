import React from "react";
import { MemoryRouter } from "react-router-dom";
import { within, userEvent } from "@storybook/test";
import { CookieConsentBanner } from "./CookieConsentBanner.jsx";
import { COOKIE_CONSENT_STORAGE_KEY } from "../utils/cookieConsent.js";

const meta = {
  title: "Legal/CookieConsentBanner",
  component: CookieConsentBanner,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      return (
        <MemoryRouter initialEntries={[context.parameters.routerPath || "/"]}>
          <div style={{ paddingBottom: 240 }}>
            <Story />
          </div>
        </MemoryRouter>
      );
    }
  ],
  parameters: {
    routerPath: "/",
    docs: {
      description: {
        component:
          "Банер Trivia Quiz: пояснює localStorage для псевдоніма, налаштувань раунду та результатів вікторини; окремо зберігає згоду на категорії cookies (ключ trivia-quiz-cookie-consent-v1)."
      }
    }
  }
};

export default meta;

/** Банер із трьома головними діями. */
export const DefaultBanner = {};

/** Відкриває режим «Налаштувати» й показує перемикачі категорій (інтеракція). */
export const CustomizeInteractive = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /налаштувати/i }));
  }
};

/** Адаптивний вигляд на типовій ширині мобільного екрана. */
export const MobileViewport = {
  parameters: {
    viewport: {
      viewports: {
        palm384: {
          name: "Palm 384",
          styles: { width: "384px", height: "736px" },
          type: "mobile"
        }
      },
      defaultViewport: "palm384"
    }
  }
};
