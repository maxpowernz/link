import { useFormContext } from 'react-hook-form';
import { OptionProps } from '../types/input-types';
import { UseScopeProps, UseScopeReturn } from '../types/form-types';

/**
 * A custom hook to control conditional questions
 * This hook works based on an assumption that there's only one source
 * @param source
 * @param ctxOptions Parent context options for when nested scopes are used
 * @param condition
 * @param values
 */
export function useScope({ source, condition = true, values, options: ctxOptions }: UseScopeProps): UseScopeReturn {
  const { getValues } = useFormContext();

  if (source == null) return { isVisible: true, options: [] };

  const controlValue = getValues(source);
  // const allValues = getValues();
  // console.log({ controlValue, allValues, condition });

  const availableOptions = values ? Object.entries(values).flatMap(([key, val]) => (key === controlValue ? val : [])) : undefined;

  const isSatisfied = (): boolean => {
    if (typeof condition === 'function') {
      return condition(controlValue);
    }

    if (typeof controlValue === typeof condition) {
      return controlValue === condition;
    }

    return typeof condition === 'boolean' && condition;
  };

  // account for context options where applicable for nested scopes
  const isValidOption = () => {
    return ctxOptions?.length > 0 ? ctxOptions.find((option: OptionProps) => option.value === controlValue) != null : true;
  };

  return { isVisible: isSatisfied() && isValidOption(), options: availableOptions };
}
