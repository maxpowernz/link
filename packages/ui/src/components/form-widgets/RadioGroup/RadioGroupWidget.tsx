import React, { useId } from 'react';

import { useModelContext } from '../../../context/ModelContext';
import { convertToOptions } from "../../../utils/options/options-util";
import Radio from "../../atoms/Radio/Radio";
import { useSaveField } from "../../../hooks/useSaveField";
import { FieldProps } from "../../../types/form-types";
import { useFormField } from "../../../hooks/useFormField";
import { useScope } from "../../../hooks/useScope";

export type RadioGroupProps = Omit<FieldProps, 'component'> & {
  cols?: number;
};

const defaultOptions = [
  { id: 'yes', label: 'Yes', value: 'true' },
  { id: 'no', label: 'No', value: 'false' },
];

export const RadioGroupInput = React.forwardRef(function CustomInput(
  { options = defaultOptions, size, cols, ...props }: RadioGroupProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const groupId = useId();
  // tailwind-safelist sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4
  const layout = cols ? `grid auto-cols-auto sm:grid-cols-${cols}` : 'flex flex-wrap';

  return (
    <div className={`${layout} w-grid-${size} items-center gap-y-1.5 gap-x-1.5`}>
      {convertToOptions(options)?.map((option) => {
        const { id, value, label } = option;
        return (
          <Radio
            key={`${groupId}-${id}-${value}`}
            {...props}
            label={label}
            value={value}
            ref={ref}
            defaultChecked={value === props.value}
            className="h-9"
            name="radio"
          />
        );
      })}
    </div>
  );
});

export function RadioGroupWidget({ scope = {}, size = 12, ...props }: RadioGroupProps): JSX.Element {
  const { table } = useModelContext();
  const saveField = useSaveField();

  const onChange = (e: Event) => {
    return saveField({
      name: props.name,
      value: (e.target as HTMLInputElement)?.value,
    });
  };

  const otherProps = (table && { onChange }) ?? {};

  const { render } = useFormField({
    ...props,
    size,
    component: RadioGroupInput,
    ...otherProps,
  });

  const { isVisible } = useScope(scope);

  return isVisible ? render() : <></>;
}
