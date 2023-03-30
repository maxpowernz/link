import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

import { FieldGroupProps, FieldGroupReturn } from '../types/form-types';
import { useSaveField } from './useSaveField';
import { useRequired } from './useRequired';

type CustomFieldError = Partial<FieldError> & { [key: string]: Partial<FieldError> };

export function isNestedFieldError(error: Partial<FieldError> | CustomFieldError): error is CustomFieldError {
  return error != null && (error as CustomFieldError)?.message == null;
}

export function getErrorMessage(error: Partial<FieldError> | CustomFieldError) {
  if (isNestedFieldError(error)) {
    return Object.values(error)
      .map((fieldErr) => (fieldErr as FieldError).message)
      .join(', ');
  }
  return error?.message;
}

export function resolveError({ isRequired, error }: { isRequired: boolean; error?: FieldError }) {
  if (error == null) return error;

  const { ref: { value } = {} } = error;
  if (['invalid_type', 'required_error', 'too_small'].includes(error.type) && !isRequired && !value) {
    return null;
  }

  const errorMessage = getErrorMessage(error);
  if (errorMessage === 'undefined') {
    return null;
  }

  return error;
}

export function useFormFieldGroup({
  question,
  name,
  required,
  control: defaultControl,
  fields,
  size: totalSize = 4,
  fieldHandlers,
  isMultiInput = false,
  ...props
}: FieldGroupProps): FieldGroupReturn {
  const { control: contextControl, ...formMethods } = useFormContext();
  const control = defaultControl ?? contextControl;
  const saveField = useSaveField();
  const isRequired = useRequired(name, required);

  const render = () => (
    <>
      <div id={`question-${name}`} className="form-question text-base text-text font-medium">
        <span className="text-end">{question}</span>
        {isRequired ? (
          <span className="w-1.5 text-warning text-center pt-1.5" data-testid="required" role="img">
            *
          </span>
        ) : null}
      </div>

      <div id={`fields-${name}`} className="form-fields">
        {fields.map(({ component: Component, name: fieldName, label, size = totalSize, ...multiFieldProps }) => (
          <Controller
            key={fieldName}
            name={fieldName}
            control={control}
            render={({ field, fieldState: { error: rawError } }) => {
              const error = resolveError({ isRequired, error: rawError });
              return (
                <div className="flex flex-col gap-1">
                  <Component
                    {...field}
                    {...(isMultiInput ? { ...multiFieldProps } : { ...props })}
                    value={field.value ?? ''}
                    name={fieldName}
                    size={size}
                    error={error}
                    label={label}
                    required={required}
                    onBlur={() => {
                      field.onBlur();
                      saveField(field);
                    }}
                    {...fieldHandlers}
                  />
                  {!(error || label) ? null : (
                    <div
                      className={`text-xs text-${
                        error ? 'error' : `text-primary opacity-${props.disabled ? '50' : '75'}`
                      } font-normal px-1.5`}
                    >
                      {getErrorMessage(error as FieldError) ?? label}
                    </div>
                  )}
                </div>
              );
            }}
          />
        ))}
      </div>
    </>
  );

  return { question, required, render, control, ...formMethods };
}
