import { z } from 'zod';
import { renderHook } from '../test/test-utils';

import { MockDB } from '../test/mock-model';
import * as ModelCtx from '../context/ModelContext';

import { useSaveField } from './useSaveField';

describe('useSaveField', () => {
  const db = new MockDB('TestDB', { friends: '++id, name, age, isCloseFriend' });
  const field = { name: 'name', value: 'Friend 1' };
  const uid = 1;

  beforeAll(() => {
    vi.spyOn(ModelCtx, 'useModelContext').mockReturnValue({ table: db.friends, uid, schema: z.object({}) });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should have instantiated table correctly', () => {
    const table = db.friends;
    expect(table).toBeDefined();
  });

  it('should execute add', async () => {
    const table = db.friends;
    expect(table).toBeDefined();

    table.add = vi.fn().mockResolvedValueOnce(1);

    const { result } = renderHook(useSaveField);
    expect(result.current).toBeDefined();

    await result.current(field);

    await table.where({ name: 'Friend 1' }).first();
    expect(table.add).toHaveBeenNthCalledWith(1, { name: 'Friend 1' }, uid);
  });

  it('should execute update', async () => {
    const table = db.friends;

    table.add = vi.fn();
    table.update = vi.fn().mockResolvedValueOnce(1);

    const { result } = renderHook(useSaveField);
    expect(result.current).toBeDefined();

    await result.current(field);

    expect(table.update).toHaveBeenNthCalledWith(1, uid, { name: 'Friend 1' });
    expect(table.add).toHaveBeenCalledTimes(0);
  });
});
