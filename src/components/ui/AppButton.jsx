import React from "react";
import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    background: linear-gradient(120deg, #4f46e5, #7c3aed);
    border-color: var(--accent-strong);
    color: #f9fafb;
  `,
  secondary: css`
    background: rgba(15, 23, 42, 0.95);
    border-color: var(--border-subtle);
    color: var(--text-main);
  `,
  ghost: css`
    background: transparent;
    border-color: rgba(148, 163, 184, 0.45);
    color: var(--text-main);
    box-shadow: none;
  `
};

const StyledBtn = styled.button`
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-subtle);
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    opacity var(--transition-fast);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.45);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  ${(p) => variantStyles[p.$variant] ?? variantStyles.primary}
`;

/**
 * Базова кнопка інтерфейсу з варіантами оформлення.
 *
 * @param {Object} props
 * @param {"primary" | "secondary" | "ghost"} [props.variant]
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.disabled]
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest
 */
export function AppButton({ variant = "primary", children, type = "button", ...rest }) {
  return (
    <StyledBtn type={type} $variant={variant} {...rest}>
      {children}
    </StyledBtn>
  );
}
