import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useFormField } from '../../../hooks/useFormField';
import { useScope } from '../../../hooks/useScope';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import { FieldProps } from "../../../types/form-types";
import { convertToOptions, extractValues } from "../../../utils/options/options-util";
import { CustomDropdownProps, OptionProps } from "../../../types/input-types";

export type DropdownProps = Omit<FieldProps, 'component'> & CustomDropdownProps;

export function DropdownWidget({ options, placeholder = 'Select...', scope = {}, isMulti, ...props }: DropdownProps) {
  const { control } = useFormContext();
  const { field } = useController({ control, ...props });

  const defaultOption = !isMulti && options?.length ? { value: '', label: placeholder } : null;
  const allOptions = [defaultOption, convertToOptions(options ?? [])].filter(Boolean).flat() as OptionProps[];

  const onChange = (selected: unknown) => {
    field.onChange(extractValues(selected));
  };

  const { render } = useFormField({ ...props, options: allOptions, placeholder, isMulti, component: Dropdown, onChange });
  const { isVisible } = useScope(scope);

  return isVisible ? render() : <></>;
}
