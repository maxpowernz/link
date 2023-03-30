import { ZodObject } from 'zod';
import { TypeOf } from 'zod/lib/types';
import Dexie, { IndexableType, Table } from 'dexie';
import { DefaultValues } from 'react-hook-form/dist/types/form';

export interface IModel {
  schema: ZodObject;
  db?: Dexie;
  table?: Table<TypeOf<ZodObject>>;
  defaultValues?: DefaultValues;
}

export type KeyType = IndexableType;
