import React, { useId } from "react";
import { Checkbox } from "../../atoms/CheckBox/Checkbox";
import { useFormField } from "../../../hooks/useFormField";
import { useSaveField } from "../../../hooks/useSaveField";
import { useScope } from "../../../hooks/useScope";
import { CheckboxGroupProps } from "../../../types/input-types";
import { FieldHandler } from "../../../types/form-types";
import { useController, useFormContext } from "react-hook-form";

export const CheckboxGroup = React.forwardRef(function CheckboxGroup(
  { options = [], cols, size, name, value = [], ...props }: CheckboxGroupProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const groupId = useId();
  const layout = cols ? `grid grid-cols-${cols} sm:grid-cols-${cols}` : "flex flex-wrap";
  const values = [...value];

  return (
    <div className={`${layout} w-grid-${size} items-center gap-x-1.5`} data-testid={`checkbox-group-${name}`}>
      {options.map((option) => {
        const { id, label, value } = option;
        return (
          <Checkbox
            {...props}
            defaultChecked={values.includes(value)}
            id={id}
            key={`${groupId}-${value}`}
            label={label}
            name={name}
            ref={ref}
            value={value}
          />
        );
      })}
    </div>
  );
});

export function CheckboxGroupWidget({
                                      scope = {},
                                      name,
                                      size = 12,
                                      required,
                                      ...props
                                    }: CheckboxGroupProps): JSX.Element {
  const { control } = useFormContext();
  const { field } = useController({ control, name });
  const saveField = useSaveField();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const set = new Set();
    e.target && e.target.checked ? set.add(e.target.value) : set.delete(e.target.value);

    field.onChange(set);

    return saveField({
      name,
      value: set
    });
  };

  const onBlur = () => {
    return;
  };
  const fieldHandlers = { onChange, onBlur } as FieldHandler;

  const { render } = useFormField({
    component: CheckboxGroup,
    ...props,
    required,
    size,
    name,
    ...{ fieldHandlers }
  });

  const { isVisible } = useScope(scope);
  return isVisible ? render() : <></>;
}

export default CheckboxGroupWidget;