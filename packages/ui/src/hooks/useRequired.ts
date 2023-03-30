import { ZodIssueBase } from 'zod/lib/ZodError';

import { RequiredType } from '../types/form-types'
import { useModelContext } from '../context/ModelContext';
import { useFormContext } from 'react-hook-form';

export function useRequired(name: string, required?: RequiredType) {
  const model = useModelContext();
  const form = useFormContext();

  if (required !== 'deferred') return required;

  const { schema } = model;
  const {
    error: { issues },
  } = schema.safeParse(form.getValues());

  const isRequired = issues.some(({ path, message }: ZodIssueBase) => path.includes(name) && message === 'undefined');
  if (!isRequired) {
    form.watch(name);
  }

  return isRequired;
}
