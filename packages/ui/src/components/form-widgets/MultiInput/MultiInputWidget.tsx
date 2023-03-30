import React, { ReactElement } from 'react';

import { useFormFieldGroup,  } from '../../../hooks/useFormFieldGroup';
import {  useScope } from '../../../hooks/useScope';
import { TextInputProps } from '../../../types/input-types';
import { DropdownProps } from '../Dropdown/DropdownWidget';
import { FieldGroupProps } from "../../../types/form-types";

type InputTypes = DropdownProps & TextInputProps;

export type MultiInputWidgetProps = {
  children: ReactElement<InputTypes>[];
  sizes?: number[];
} & Omit<FieldGroupProps, 'fields'>;

export function MultiInputWidget({ scope = {}, children, ...props }: MultiInputWidgetProps): ReactElement {
  const formFields = [children].flat().map((child: ReactElement<InputTypes>, index) => {
    return {
      ...child.props,
      component: child.type,
      key: child.key,
      size: props?.sizes && props.sizes[index],
    };
  });

  const groupObject = {
    ...props,
    name: props.name,
    isMultiInput: true,
    fields: formFields,
  } as FieldGroupProps;

  const { render } = useFormFieldGroup(groupObject);
  const { isVisible } = useScope(scope);
  return isVisible ? render() : <></>;
}
