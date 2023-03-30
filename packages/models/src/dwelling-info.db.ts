import { z } from 'zod';
import { db } from './@database';

export const schema = z.object({
  itemDesc: z.string(),
  situationOfRisk: z.string(),
  cover: z.string(),
  sumInsured: z.string().regex(/\d/),
  volExcess: z.string().regex(/\d/),
  intParties: z.object({ name: z.string().min(1, { message: 'Required' }) }).array(),
  occupancy: z.string(),
  hasShortTermGuest: z.string().optional(),
  isMortgageSale: z.string().optional(),
});

export type FormValues = z.infer<typeof schema>;

export const table = db.dwellingInfos;
