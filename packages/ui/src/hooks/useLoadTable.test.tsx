import { z } from 'zod';
import * as dexieQuery from 'dexie-react-hooks';

import { renderHook } from '../test/test-utils';
import { MockDB, schema } from '../test/mock-model';

import { initFormValues, safeResolve, useLoadTable } from './useLoadTable';

describe('useLoadTable', () => {
  const db = new MockDB('TestDB', { friends: '++, name, age' });
  const uid = 1;

  describe('safeResolve', () => {
    it('should return value as is when successful', () => {
      expect(safeResolve(z.string(), 'test')).toEqual('test');
      expect(safeResolve(z.object({ name: z.string() }), { name: 'test' })).toEqual({ name: 'test' });
      expect(safeResolve(z.boolean(), true)).toEqual(true);
      expect(safeResolve(z.number(), 1)).toEqual(1);
    });

    it('should return array when array parse error', () => {
      expect(safeResolve(z.array(z.string()), { 0: 'first', 1: 'second' })).toEqual(['first', 'second']);
    });

    it('should return value as is when no array parse error', () => {
      expect(safeResolve(z.string(), { 0: 'first', 1: 'second' })).toEqual({ 0: 'first', 1: 'second' });
    });
  });

  describe('initFormValues', () => {
    const setValue = vi.fn();
    const form = { setValue };
    const model = { table: db.friends, schema };

    it('should return 0 table records', async () => {
      const actual = await initFormValues({ form, uid, model });
      expect(actual).toEqual({ result: undefined, count: 0, isLoaded: true });
      expect(setValue).not.toHaveBeenCalled();
    });

    it('should return n table records', async () => {
      await db.friends.add({ name: 'Friend 1', age: 25 });

      const actual = await initFormValues({ form, uid, model });
      expect(actual).toEqual({ result: { name: 'Friend 1', age: 25 }, count: 1, isLoaded: true });
      expect(setValue).toHaveBeenNthCalledWith(1, 'name', 'Friend 1', expect.any(Object));
      expect(setValue).toHaveBeenNthCalledWith(2, 'age', 25, expect.any(Object));
    });
  });

  it('should return correct result', async () => {
    const form = { setValue: vi.fn() };
    const model = { table: db.friends, schema };

    const useLiveQuerySpy = vi.spyOn(dexieQuery, 'useLiveQuery');
    useLiveQuerySpy.mockReturnValueOnce(undefined);

    const { result, rerender } = renderHook(() => useLoadTable({ form, model, uid }));

    expect(useLiveQuerySpy).toHaveBeenCalled();
    expect(result.current).toEqual({});

    const returnValue = { result: { name: 'Friend 1', age: 25 }, count: 1, isLoaded: true };
    useLiveQuerySpy.mockReturnValueOnce(returnValue);

    rerender();

    expect(useLiveQuerySpy).toHaveBeenCalled();
    expect(result.current).toEqual(returnValue);
  });
});
