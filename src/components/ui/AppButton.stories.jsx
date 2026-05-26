import { AppButton } from "./AppButton.jsx";

const meta = {
  title: "UI/AppButton",
  component: AppButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "Візуальний акцент кнопки"
    },
    disabled: {
      control: "boolean",
      description: "Стан недоступності"
    },
    children: {
      control: "text",
      description: "Вміст кнопки"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "Базовий безпечний для темної теми контроль. Використовується в банері cookies та може служити узгодженим UI-примітивом."
      }
    }
  }
};

export default meta;

export const Primary = {
  args: {
    variant: "primary",
    children: "Продовжити"
  }
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Скасувати"
  }
};

export const GhostDisabled = {
  args: {
    variant: "ghost",
    disabled: true,
    children: "Недоступна дія"
  }
};
