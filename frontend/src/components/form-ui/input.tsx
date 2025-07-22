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
`;

const InputStyle = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'hasError'
}) <{ hasError?: boolean }>`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ hasError }) => (hasError ? "#d33" : "#ccc")};
  font-size: 1rem;
  &:focus {
    outline: 2px solid #0070f3;
    border-color: #0070f3;
  }
`;

const ErrorMsg = styled.span`
  color: #d33;
  font-size: 0.9em;
  margin-top: 2px;
  display: block;
`;

type FormInputProps = {
    label: string;
    type?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    [x: string]: any; // para outros props como placeholder, etc
};

export const FormInput: React.FC<FormInputProps> = ({
    label,
    type = "text",
    register,
    error,
    ...rest
}) => (
    <InputWrapper>
        <Label>
            {label}
            <InputStyle type={type} {...register} hasError={!!error} {...rest} />
        </Label>
        {error && <ErrorMsg>{error.message}</ErrorMsg>}
    </InputWrapper>
);
