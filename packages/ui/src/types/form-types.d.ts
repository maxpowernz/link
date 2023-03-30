import React, { FormEventHandler, ReactElement } from 'react';
import { TypeOf } from 'zod/lib/types';
import { ZodObject } from 'zod';
import { Control, UseFormProps } from 'react-hook-form';
import { UseFormGetValues, UseFormReturn } from 'react-hook-form/dist/types/form';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

import { InputProps, OptionProps } from '@/components/ui/atoms';
import { IModel, KeyType } from '@/context/model-type';

export type RequiredType = boolean | 'deferred';

export type FieldProps = {
  question?: string;
  control?: Control;
  component: React.JSXElementConstructor;
  required?: RequiredType;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  scope?: UseScopeProps;
  valueAsNumber?: boolean;
} & InputProps;

export type FieldHandler = Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;

export type TargetFieldProps = Omit<FieldProps, 'question' | 'control'>;

export type FieldGroupProps = Omit<FieldProps, 'component'> & {
  isMultiInput?: boolean;
  fields: TargetFieldProps[];
};

export type FieldGroupReturn = Partial<UseFormReturn> &
  Partial<FieldProps> & {
    render: () => ReactElement;
  };

export type LoadTableProps = {
  form: Pick<UseFormReturn, 'setValue'>;
  uid: KeyType;
  model: IModel;
};

export type LoadTableReturn<T> = {
  result?: T;
  count?: number;
  isLoaded?: boolean;
};

type CommonType = number | boolean | string | Record<string, unknown> | unknown[];

type UseScopeProps = {
  source?: FieldPath;
  condition?: ((controlValue: UseFormGetValues) => boolean) | CommonType;
  values?: Record<string, OptionProps[]>;
} & Partial<Pick<ScopeContextProps, 'options'>>;

type UseScopeReturn = {
  isVisible: boolean;
  options?: OptionProps[];
};

export type FormProps = Partial<UseFormProps> & {
  model: IModel;
  uid: KeyType;
  onSubmit: (value?: TypeOf<ZodObject> | unknown) => void | FormEventHandler;
  children?: React.ReactNode;
  shouldValidateOnLoad?: boolean;
};
