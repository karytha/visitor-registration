import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const SelectWrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
  color: #00eaff;
`;

const Select = styled.select.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError'
}) <{ hasError?: boolean }>`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ hasError }) => (hasError ? "#d33" : '#00eaff')};
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

type Option = {
  value: string | number;
  label: string;
};

type FormSelectProps = {
  label: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: FieldError;
  [x: string]: any;
};

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  register,
  error,
  ...rest
}) => (
  <SelectWrapper>
    <Label>
      {label}
      <Select {...register} hasError={!!error} {...rest}>
        <option value="">Selecione...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Select>
    </Label>
    {error && <ErrorMsg>{error.message}</ErrorMsg>}
  </SelectWrapper>
);