import { z } from 'zod';
import { db } from './@database';

export const schema = z.object({
  contactId: z.string(),
  operations: z.string().optional(),
  trunover: z.string().optional(),
  operatingModel: z.string().optional(),
  productionType: z.string().optional(),
  productionUnits: z.object({ units: z.number(), metric: z.string() }),
  operatingProps: z.object({ situationOfRisk: z.string(), description: z.string() }),
  ownership: z.string(),
  premSize: z.object({ hec: z.number(), sqm: z.number() }),
  numEmployees: z.object({ full: z.number(), part: z.number(), casual: z.number() }),
});

export type FormValues = z.infer<typeof schema>;

export const table = db.farmInfos;
