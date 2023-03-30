import { z } from 'zod';

import { renderHook, withFormWrapper } from '../test/test-utils';
import { schema } from '../test/mock-model';
import * as context from '../context/ModelContext';

import { useRequired } from './useRequired';

describe('useRequired', () => {
  it.each`
    required
    ${true}
    ${false}
    ${undefined}
  `('should return correct result when required=$required', async ({ required }) => {
    const model = { schema, uid: 0 };

    const useModelContextSpy = vi.spyOn(context, 'useModelContext');
    useModelContextSpy.mockReturnValue(model);

    const { result } = renderHook(() => useRequired('driverLicenseNo', required), {
      wrapper: withFormWrapper<z.infer<typeof schema>>({ defaultValues: { age: 16 } }),
    });

    expect(useModelContextSpy).toHaveBeenCalled();
    expect(result.current).toBe(required);
  });

  it.each`
    age   | expected
    ${16} | ${false}
    ${18} | ${true}
  `('should evaluate required correctly when age=$age', async ({ age, expected }) => {
    const model = { schema, uid: 0 };

    const useModelContextSpy = vi.spyOn(context, 'useModelContext');
    useModelContextSpy.mockReturnValue(model);

    const { result } = renderHook(() => useRequired('driverLicenseNo', 'deferred'), {
      wrapper: withFormWrapper<z.infer<typeof schema>>({ defaultValues: { age } }),
    });

    expect(useModelContextSpy).toHaveBeenCalled();
    expect(result.current).toBe(expected);
  });
});
