import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const InputWrapper = styled.div`
  margin-bottom: 16px;
  display: block;
`;

const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
  color: #00eaff; // Neon blue color
`;

const InputStyle = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError'
}) <{ hasError?: boolean }>`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ hasError }) => (hasError ? "#d33" : "#ccc")}; // Default border
  font-size: 1rem;
  &:focus {
    outline: 2px solid #0070f3; // Default focus
    border-color: #0070f3;
  }
`;

const ErrorMsg = styled.span`
  color: #d33; // Default error color
  font-size: 0.9em;
  margin-top: 2px;
  display: block;
`;

function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

type FormInputProps = {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  mask?: 'cpf';
  [x: string]: any; // for other props like placeholder, etc
};

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  register,
  error,
  mask,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask === 'cpf') {
      e.target.value = maskCpf(e.target.value);
    }
    if (rest.onChange) rest.onChange(e);
  };
  return (
    <InputWrapper>
      <Label>
        {label}
        <InputStyle type={type} {...register} hasError={!!error} {...rest} onChange={handleChange} />
      </Label>
      {error && <ErrorMsg>{error.message}</ErrorMsg>}
    </InputWrapper>
  );
};