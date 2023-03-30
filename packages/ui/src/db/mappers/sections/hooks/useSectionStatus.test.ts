import { renderHook } from '../../../../test/test-utils';

import { useSectionStatus } from './useSectionStatus';

describe('util/section/hooks/useSectionStatus', () => {
  it('should return data', async () => {
    const { result } = renderHook(useSectionStatus);

    expect(result.current).toEqual({
      selectedSectionId: expect.anything(),
      setSelectedSectionId: expect.any(Function),
      applicationId: expect.anything(),
      setApplicationId: expect.any(Function),
      form: expect.any(String),
      setForm: expect.any(Function),
    });
  });
});
