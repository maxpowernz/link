import React from 'react';
import { render, screen, userEvent } from '../../../test/test-utils';

import * as hooks from '../hooks';
import { SingleSection } from './SingleSection';

describe('sections/SingleSection', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const setIdFn = vi.fn();
  const statusMock = {
    selectedSectionId: null,
    setSelectedSectionId: setIdFn,
    form: '',
    setForm: vi.fn(),
    applicationId: null,
    setApplicationId: vi.fn(),
  };
  const statusSpy = vi.spyOn(hooks, 'useSectionStatus');

  const addFn = vi.fn().mockResolvedValue(1);
  const tblMock = {
    sections: [],
    addSection: addFn,
    updateSection: vi.fn(),
    removeSection: vi.fn(),
    table: vi.fn(),
  };
  const tblSpy = vi.spyOn(hooks, 'useSectionTable');

  const name = 'Single Item Example';

  it('should render correctly', async () => {
    const user = userEvent.setup();

    statusSpy.mockReturnValueOnce(statusMock);
    tblSpy.mockReturnValueOnce(tblMock);

    const { rerender } = render(<SingleSection name={name} />);

    expect(statusSpy).toHaveBeenCalled();
    expect(tblSpy).toHaveBeenCalledWith({ name });

    const titleElem = screen.getByText(name);
    expect(titleElem).toHaveClass('opacity-50');

    await user.click(titleElem);
    expect(addFn).toHaveBeenCalledTimes(1);
    expect(setIdFn).toHaveBeenCalledWith(1);

    statusSpy.mockReturnValueOnce({ ...statusMock, selectedSectionId: 1 });
    tblSpy.mockReturnValueOnce({ ...tblMock, sections: [{ id: 1, hasStarted: false }] });

    rerender(<SingleSection name={name} />);
    expect(titleElem).not.toHaveClass('opacity-50');

    await user.click(titleElem);
    expect(addFn).toHaveBeenCalledTimes(1); // no additional calls;
    expect(setIdFn).toHaveBeenCalledWith(1);
  });
});
