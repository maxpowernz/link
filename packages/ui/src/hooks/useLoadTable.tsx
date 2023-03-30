import { useLiveQuery } from 'dexie-react-hooks';
import { ZodInvalidTypeIssue } from 'zod/lib/ZodError';
import { ZodType } from 'zod/lib/types';

import { LoadTableProps, LoadTableReturn } from '../types/form-types';

export function safeResolve(type: ZodType, value: object | string | number | boolean) {
  const result = type?.safeParse(value);

  if (!result || result?.success) return value;

  const { error: { issues = [] } = {} } = result;
  const hasArrayParseError = issues.find((issue) => (issue as ZodInvalidTypeIssue)?.expected === 'array');
  return hasArrayParseError ? Object.values(value) : value;
}

export async function initFormValues<T>({ form, uid, model }: LoadTableProps): Promise<LoadTableReturn<T>> {
  const count = await model.table?.count();
  const result = await model.table?.get(uid);

  if (count) {
    Object.entries<object>(result).forEach(([key, val]) => {
      const resolved = safeResolve(model.schema.shape[key], val);

      form.setValue(key, resolved, { shouldDirty: false, shouldValidate: true, shouldTouch: false });
    });
  }
  return { result, count, isLoaded: count != null };
}

export function useLoadTable<T>(props: LoadTableProps): LoadTableReturn<T> {
  // TODO: Fix double rendering from useLiveQuery
  return useLiveQuery(async () => await initFormValues(props)) ?? {};
}
