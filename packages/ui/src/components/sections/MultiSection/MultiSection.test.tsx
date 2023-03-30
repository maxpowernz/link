import React from 'react';
import { render, screen, fireEvent } from '../../../test/test-utils';

import * as hooks from '../hooks';
import * as ctx from '../context';
import { GroupChildren, GroupParent, MultiSection } from './MultiSection';

describe('sections/MultiSection', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const setIdFn = vi.fn();
  // Mocking with default selected and to be set to null for non-selected state
  const statusMock = {
    selectedSectionId: 1,
    setSelectedSectionId: setIdFn,
    form: '',
    setForm: vi.fn(),
    applicationId: null,
    setApplicationId: vi.fn(),
  };
  const statusSpy = vi.spyOn(hooks, 'useSectionStatus');

  const addFn = vi.fn().mockResolvedValue(1);
  const removeFn = vi.fn().mockResolvedValue(1);
  const syncFn = vi.fn();
  const section = { id: 1, hasStarted: false };
  const tblMock = {
    sections: [],
    addSection: addFn,
    updateSection: vi.fn(),
    removeSection: removeFn,
    sync: syncFn,
    table: vi.fn(),
  };
  const tblSpy = vi.spyOn(hooks, 'useSectionTable');

  const name = 'Multi Item Section Example';

  describe('MultiSection', () => {
    it('should render correctly', async () => {
      statusSpy.mockReturnValue({ ...statusMock, selectedSectionId: null });
      tblSpy.mockReturnValue(tblMock);
      const { rerender } = render(<MultiSection name={name} />);

      expect(statusSpy).toHaveBeenCalled();
      expect(tblSpy).toHaveBeenCalledWith({ name });
      expect(setIdFn).toHaveBeenCalledWith(undefined);

      tblSpy.mockReturnValue({ ...tblMock, sections: [section] });
      rerender(<MultiSection name={name} />);

      expect(setIdFn).toHaveBeenCalledWith(section.id);
    });

    it('should not attempt to set id when existing', async () => {
      statusSpy.mockReturnValue(statusMock);
      render(<MultiSection name={name} />);
      expect(setIdFn).not.toHaveBeenCalled();
    });
  });

  describe('GroupParent', () => {
    it('should render parent correctly', async () => {
      const ctxSpy = vi.spyOn(ctx, 'useSectionGroupContext');
      ctxSpy.mockReturnValue({ ...tblMock, name });
      statusSpy.mockReturnValue(statusMock);
      render(<GroupParent />);
      const title = screen.queryByText(name);

      expect(statusSpy).toHaveBeenCalled();
      expect(ctxSpy).toHaveBeenCalled();
      expect(title).toHaveClass('opacity-50');
      expect(screen.queryByTitle('Add')).not.toBeVisible();
    });

    it('should render action button correctly', async () => {
      const ctxSpy = vi.spyOn(ctx, 'useSectionGroupContext');
      ctxSpy.mockReturnValue({ ...tblMock, name, isExpanded: true });
      statusSpy.mockReturnValue({ ...statusMock, selectedSectionId: null });
      const { rerender } = render(<GroupParent />);
      vi.advanceTimersByTime(500);

      const btn = screen.queryByTitle('Add');
      expect(btn).toBeInTheDocument();
      expect(btn?.className).toContain('hover:');

      ctxSpy.mockReturnValue({ ...tblMock, name, isExpanded: false });
      ctxSpy.mockReturnValue({ ...tblMock, name, sections: [section] });
      statusSpy.mockReturnValue(statusMock);
      rerender(<GroupParent />);
      vi.advanceTimersByTime(500);

      expect(btn).toBeInTheDocument();
      expect(btn?.className).toContain('hover:');
    });

    // userEvent won't trigger event
    it('should invoke add action correctly', async () => {
      const ctxSpy = vi.spyOn(ctx, 'useSectionGroupContext');
      ctxSpy.mockReturnValue({ ...tblMock, name, isExpanded: true });
      const toggleFn = vi.fn();
      render(<GroupParent toggle={toggleFn} />);
      vi.advanceTimersByTime(500);

      //  eslint-disable-next-line
      const btn = screen.queryByTitle('Add')!;

      const newItemName = `${name} 1`;

      btn.focus();
      fireEvent.keyDown(btn);
      expect(addFn).not.toHaveBeenCalled();
      expect(toggleFn).not.toHaveBeenCalled();

      fireEvent.click(btn);
      expect(addFn).toHaveBeenCalledWith(newItemName);
      expect(toggleFn).toHaveBeenCalledWith(true);
      expect(syncFn).toHaveBeenCalled();
    });
  });

  describe('GroupChildren', () => {
    const itemName = 'Item 1';
    const ctxMock = {
      ...tblMock,
      sections: [
        { ...section, name: itemName },
        { id: 2, name: 'Item 2' },
      ],
      name,
      isExpanded: true,
    };

    it('should render child correctly', async () => {
      const ctxSpy = vi.spyOn(ctx, 'useSectionGroupContext');
      ctxSpy.mockReturnValue(ctxMock);
      statusSpy.mockReturnValue({ ...statusMock, selectedSectionId: null });
      render(<GroupChildren />);
      vi.advanceTimersByTime(500);
      //  eslint-disable-next-line
      const subItem = screen.queryByText(itemName, { exact: false })!;

      expect(statusSpy).toHaveBeenCalled();
      expect(ctxSpy).toHaveBeenCalled();

      expect(subItem).toBeInTheDocument();
      const btn = screen.queryAllByTitle('Remove');
      expect(btn).toHaveLength(2);
      expect(btn[0]).not.toBeVisible();
      expect(btn[1]).not.toBeVisible();

      fireEvent.click(subItem);
      vi.advanceTimersByTime(500);
      expect(setIdFn).toHaveBeenCalledWith(section.id);
    });

    it('should render action button correctly', async () => {
      const ctxSpy = vi.spyOn(ctx, 'useSectionGroupContext');
      ctxSpy.mockReturnValue(ctxMock);
      statusSpy.mockReturnValue({ ...statusMock, selectedSectionId: 1 });
      render(<GroupChildren />);
      vi.advanceTimersByTime(500);

      const btn = screen.queryAllByTitle('Remove')[0];
      expect(btn).toBeInTheDocument();
      expect(btn?.className).toContain('hover:');
    });

    it('should invoke remove action correctly', async () => {
      const ctxSpy = vi.spyOn(ctx, 'useSectionGroupContext');
      ctxSpy.mockReturnValue(ctxMock);
      statusSpy.mockReturnValue(statusMock);
      render(<GroupChildren />);
      vi.advanceTimersByTime(500);

      //  eslint-disable-next-line
      const btn = screen.queryAllByTitle('Remove')[0];
      fireEvent.click(btn);
      expect(removeFn).toHaveBeenCalledWith(section.id);
      expect(setIdFn).toHaveBeenCalled();
      // expect(setIdFn).toHaveBeenCalledWith(2);
    });

    it('should render placeholder correctly', async () => {
      const placeholder = 'No items added';
      const ctxSpy = vi.spyOn(ctx, 'useSectionGroupContext');
      ctxSpy.mockReturnValue({ ...ctxMock, sections: [], placeholder });
      statusSpy.mockReturnValue(statusMock);
      render(<GroupChildren />);
      vi.advanceTimersByTime(500);
      //  eslint-disable-next-line
      const subItem = screen.queryByText(placeholder, { exact: false })!;

      expect(subItem).toBeInTheDocument();
      const btn = screen.queryAllByTitle('Remove')[0];
      expect(btn).not.toBeVisible();

      fireEvent.click(subItem);
      vi.advanceTimersByTime(500);
      expect(setIdFn).not.toHaveBeenCalled();
    });
  });
});
