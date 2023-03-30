import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModelContext } from '../context/ModelContext';
import { useLoadTable } from '../hooks/useLoadTable';
import { FormProps } from '../types/form-types';

export function FormProviderWrapper({ model, uid, onSubmit, children, defaultValues, mode = 'onChange', shouldValidateOnLoad = false }: FormProps) {
  const form = useForm({ resolver: zodResolver(model.schema), mode, defaultValues });

  const { result, isLoaded } = useLoadTable({ form, model, uid });

  if (isLoaded == null || (model.table && !isLoaded)) return null;

  if (shouldValidateOnLoad) {
    form.trigger().then();
    form.watch();
  }

  return (
    <FormProvider {...form}>
      <ModelContext.Provider value={{ ...model, uid, defaultValues: result ?? defaultValues }}>
        <form className="form-container" onSubmit={form.handleSubmit(onSubmit)}>
          {children}
        </form>
      </ModelContext.Provider>
    </FormProvider>
  );
}

export default FormProviderWrapper;
