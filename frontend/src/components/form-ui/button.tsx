import styled from 'styled-components';
import React from 'react';

const StyledButton = styled.button<{
  variant?: 'primary' | 'danger' | 'secondary';
  fullWidth?: boolean;
}>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  max-height: fit-content;
  transition: background 0.2s, color 0.2s;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  color: #000000;
  background: ${({ variant }) =>
    variant === 'danger' ? '#d33' :
      variant === 'secondary' ? '#666' :
        '#00eaff'};
  &:hover {
    background: ${({ variant }) =>
    variant === 'danger' ? '#a00' :
      variant === 'secondary' ? '#444' :
        '#00eaff'};
  }
  &:disabled {
    background: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth, ...rest }) => (
  <StyledButton variant={variant} fullWidth={fullWidth} {...rest}>
    {children}
  </StyledButton>
);
