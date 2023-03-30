import React from 'react';
import { Props } from 'react-select';
import { FieldHandler, FieldProps } from '@/components/util/form/form-types';

export type InputProps = {
  'aria-label'?: string | undefined; //TODO: reverse it back to 'aria-label' in components
  ariaLabel?: string | undefined;
  className?: string;
  defaultValue?: string | undefined;
  disabled?: boolean;
  error?: string | boolean;
  id?: string | undefined;
  label?: string;
  name: string;
  options?: OptionProps[] | string[] | number[];
  pattern?: string;
  placeholder?: string;
  size?: number;
  maxLength?: number;
  fieldHandlers?: FieldHandler;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type OptionProps = {
  id?: string;
  label: string;
  name?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type CustomRadioGroupProps = {
  cols?: number;
  error?: string | boolean | object;
} & InputProps;

export type CheckboxProps = {
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  required?: boolean;
} & OptionProps;

export type CheckboxGroupProps = {
  cols?: number;
  size?: number;
  options?: OptionProps[];
  name: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any; // TODO: fix this any value to accept string[] || number[]
} & Omit<FieldProps, 'component'>;

export type CustomDropdownProps = Omit<Props, 'size' | 'onChange' | 'options'> &
  InputProps & { value?: Pick<OptionProps>; defaultValue?: Pick<OptionProps> };

export type ButtonProps = {
  'aria-label': string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
};

export type BlockButtonProps = ButtonProps & {
  block?: boolean;
  children: React.ReactNode;
  color: 'primary' | 'secondary' | 'primary-block-light';
  error?: boolean;
  startIcon?: React.ReactNode;
};

export type InlineButtonProps = ButtonProps & {
  children?: React.ReactNode;
  color: 'light' | 'secondary' | 'secondary-light';
  startIcon: React.ReactNode;
};

export type RoundButtonProps = ButtonProps & {
  startIcon: React.ReactNode;
};

export type LoginButtonProps = ButtonProps & {
  imageUrl?: string;
};

export type TextInputProps = Pick<
  InputProps,
  | 'ariaLabel'
  | 'disabled'
  | 'error'
  | 'fieldHandlers'
  | 'id'
  | 'label'
  | 'maxLength'
  | 'name'
  | 'pattern'
  | 'placeholder'
  | 'size'
  | 'value'
>;
