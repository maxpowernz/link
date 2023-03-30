import { z } from 'zod';
import Dexie, { Table } from 'dexie';

export const schema = z.object({
  name: z.string(),
  age: z.number().superRefine((data, ctx) => {
    if (data >= 18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'undefined',
        received: 'undefined',
        path: ['driverLicenseNo'],
      });
    }
  }),
  statementDelivery: z.set(z.string()).optional(),
  driverLicenseNo: z.string().optional(),
});

export type FormValues = z.infer<typeof schema>;

export class MockDB extends Dexie {
  friends!: Table<FormValues>;
  statementDelivery!: Table<FormValues>;

  constructor(name: string, schema: Record<string, string>) {
    super(name);
    this.version(1).stores(schema);
  }
}
