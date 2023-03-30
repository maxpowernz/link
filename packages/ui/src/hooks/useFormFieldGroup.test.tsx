import { act, render, renderHook, screen, userEvent, withFormWrapper } from '../test/test-utils';
import { TextInput } from '../components/atoms/TextInput/TextInput';
import { Dropdown } from '../components/atoms/Dropdown/Dropdown';
import * as formUtil from '../hooks/useSaveField';
import { getErrorMessage, isNestedFieldError, resolveError, useFormFieldGroup } from './useFormFieldGroup';

type TestData = {
  firstName: string;
  lastName: string;
};

describe('useFormFieldGroup', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  const props = {
    question: 'Please enter your name',
    name: 'firstName',
    required: true,
    fields: [
      { name: 'firstName', label: 'First Name', component: TextInput },
      { name: 'lastName', label: 'Last Name', component: TextInput },
    ],
  };

  const { question, required, fields } = props;

  it.each`
    disabled | opacity
    ${true}  | ${50}
    ${false} | ${75}
  `('should render correctly when disabled=$disabled', async ({ disabled, opacity }) => {
    const { result } = renderHook(() => useFormFieldGroup({ ...props, disabled }), {
      wrapper: withFormWrapper<TestData>({ defaultValues: {} }),
    });
    expect(result.current).toBeDefined();
    expect(result.current).toEqual(expect.objectContaining({ question, required, render: expect.any(Function) }));

    render(<>{result.current.render()}</>);

    const textboxes = screen.getAllByRole('textbox');
    expect(screen.getByText(question)).toBeInTheDocument();
    expect(textboxes.length).toBe(fields.length);
    expect(screen.getByText(fields[0].label)).toBeInTheDocument();
    expect(screen.getByText(fields[1].label)).toBeInTheDocument();
    expect(screen.getByText(fields[0].label)).toHaveClass(`opacity-${opacity}`);
    expect(screen.getByText(fields[1].label)).toHaveClass(`opacity-${opacity}`);

    await act(() => {
      result.current.setError?.('firstName', { type: 'custom', message: 'Custom message' });
    });
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });

  it('should copy multi input props', async () => {
    const sizes = [4, 8];
    const multiFields = [
      { ...fields[0], size: sizes[0] },
      { ...fields[1], size: sizes[1] },
    ];
    const { result } = renderHook(() => useFormFieldGroup({ ...props, isMultiInput: true, fields: multiFields }), {
      wrapper: withFormWrapper<TestData>({ defaultValues: {} }),
    });

    render(<>{result.current.render()}</>);

    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes[0]).toHaveClass(`w-grid-${sizes[0]}`);
    expect(textboxes[1]).toHaveClass(`w-grid-${sizes[1]}`);
  });

  it('should render correctly with no sub-label', async () => {
    const { result } = renderHook(
      () => useFormFieldGroup({ ...props, required: false, fields: fields.map(({ name, component }) => ({ name, component })) }),
      {
        wrapper: withFormWrapper<TestData>({ defaultValues: {} }),
      }
    );
    render(<>{result.current.render()}</>);

    expect(screen.queryByLabelText('required')).toBeNull();
    expect(screen.queryByText(fields[0].label)).toBeNull();
    expect(screen.queryByText(fields[1].label)).toBeNull();
  });

  describe('test useSaveField', () => {
    it('should work correctly for TextInputWidget', async () => {
      const user = userEvent.setup();
      const saveField = vi.fn();
      vi.spyOn(formUtil, 'useSaveField').mockReturnValue(saveField);

      const { result } = renderHook(() => useFormFieldGroup(props), {
        wrapper: withFormWrapper<TestData>({ defaultValues: {} }),
      });
      render(<>{result.current.render()}</>);

      const textbox = screen.getAllByRole('textbox')[0];
      const textContent = 'First name';

      await user.click(textbox);
      expect(textbox).toHaveFocus();

      await user.type(textbox, textContent);
      expect(textbox).toHaveValue(textContent);

      await user.tab();
      await expect(saveField).toHaveBeenCalledWith(expect.objectContaining({ name: 'firstName', value: textContent }));
    });

    it('should work correctly for Dropdown where incoming change is of OptionProps', async () => {
      const user = userEvent.setup();
      const saveField = vi.fn();
      vi.spyOn(formUtil, 'useSaveField').mockReturnValue(saveField);

      const options = [
        { value: '1', label: 'First' },
        { value: '2', label: 'Second' },
        { value: '3', label: 'Third' },
      ];

      const { result } = renderHook(() => useFormFieldGroup({ ...props, options, fields: [{ name: 'option', component: Dropdown }] }), {
        wrapper: withFormWrapper<TestData>({ defaultValues: {} }),
      });
      const { container } = render(<>{result.current.render()}</>);

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);
      expect(combobox).toHaveFocus();
      const menuList = container.querySelectorAll('div[id*=-option-]');
      expect(menuList).toHaveLength(options.length);

      await user.click(menuList[0]);
      await user.tab();
      expect(saveField).toHaveBeenCalledWith(expect.objectContaining({ name: 'option' }));
    });
  });

  it('should return correct type guard result', async () => {
    expect(isNestedFieldError({ message: 'Required' })).toBeFalsy();
    expect(getErrorMessage({ message: 'Required' })).toBe('Required');
    expect(isNestedFieldError({ value: { message: 'Required' } })).toBeTruthy();
    expect(getErrorMessage({ value: { message: 'Required' } })).toBe('Required');
  });

  describe('resolveError', () => {
    const name = 'field1';
    const ref = { name };
    const errorShape = { ref, message: 'Required' };
    const requiredError = { ...errorShape, type: 'required_error' };
    const invalidTypeError = { ...errorShape, type: 'invalid_type' };
    const emptyError = { ...errorShape, type: 'too_small', ref: { ...ref, value: '' } };
    const tooSmallError = { ...errorShape, type: 'too_small', ref: { ...ref, value: '123' } };

    const agreedError = { [name]: { type: 'custom', message: 'undefined' } };
    const customError = { [name]: { type: 'custom', message: 'custom error' } };

    it.each`
      testCase                       | error               | isRequired | expected
      ${'ignore required_error'}     | ${requiredError}    | ${false}   | ${null}
      ${'ignore invalid_type'}       | ${invalidTypeError} | ${false}   | ${null}
      ${'ignore too_small'}          | ${emptyError}       | ${false}   | ${null}
      ${'trigger too_small'}         | ${tooSmallError}    | ${false}   | ${tooSmallError}
      ${'ignore required_error'}     | ${requiredError}    | ${true}    | ${requiredError}
      ${'ignore invalid_type'}       | ${invalidTypeError} | ${true}    | ${invalidTypeError}
      ${'ignore too_small'}          | ${emptyError}       | ${true}    | ${emptyError}
      ${'trigger too_small'}         | ${tooSmallError}    | ${true}    | ${tooSmallError}
      ${'trigger too_small'}         | ${tooSmallError}    | ${true}    | ${tooSmallError}
      ${'ignore custom when agreed'} | ${agreedError}      | ${true}    | ${null}
      ${'ignore custom when agreed'} | ${agreedError}      | ${false}   | ${null}
      ${'return custom'}             | ${customError}      | ${false}   | ${customError}
      ${'return custom'}             | ${customError}      | ${true}    | ${customError}
    `('should $testCase when isRequired=$isRequired when name matches', async ({ error, isRequired, expected }) => {
      expect(resolveError({ error, isRequired })).toBe(expected);
    });

    // Making it ignore for reduce noise on screen for when very first triggered without touching the target field.
    // This will need to be updated according to business logic and requirements
    it.each`
      testCase                       | error          | isRequired | expected
      ${'ignore custom when agreed'} | ${agreedError} | ${true}    | ${null}
    `('should $testCase when isRequired=$isRequired when name matches', async ({ error, isRequired, expected }) => {
      expect(resolveError({ error, isRequired })).toBe(expected);
    });
  });
});
