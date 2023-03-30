import { composeStories, render, screen, act, userEvent } from '../../../test/test-utils';

import * as scope from '../../../hooks/useScope';
import * as formField from '../../../hooks/useFormField';
import * as stories from './DropdownWidget.stories';

const { Default, NoData } = composeStories(stories);

describe('form-widgets/Dropdown', () => {
  it('should render Default correctly', async () => {
    const placeholder = 'Please select...';
    const formSpy = vi.spyOn(formField, 'useFormField');
    await act(() => render(<Default menuIsOpen placeholder={placeholder} />));
    const placeholders = screen.getAllByText(placeholder);
    expect(placeholders).toHaveLength(2);
    expect(formSpy).toHaveBeenCalledWith(expect.objectContaining({ onChange: expect.any(Function) }));
  });

  const optionTypes = [
    { value: '10', label: 'Kg' },
    { value: '20', label: 'g' },
  ];
  const nonOptionTypes = [1, 2];

  it.each`
    testcase        | options           | selected
    ${'OptionProp'} | ${optionTypes}    | ${(idx: number) => optionTypes[idx].label}
    ${'Primitive'}  | ${nonOptionTypes} | ${(idx: number) => nonOptionTypes[idx]}
  `('should add Default option correctly to $testcase array', async ({ options, selected }) => {
    const user = userEvent.setup();
    const placeholder = 'Please select...';
    const { container } = await act(() => render(<Default menuIsOpen placeholder={placeholder} options={options} />));
    const combobox = screen.getAllByRole('combobox');
    expect(combobox).not.toBeNull();
    await user.click(combobox[0]);
    const menuList = container.querySelectorAll('div[id*=-option-]');
    expect(menuList).toHaveLength(options.length + 1);
    expect(menuList[0]).toHaveTextContent(placeholder);

    await user.click(menuList[1]);
    const selectedOption = screen.getByText(selected(1));
    expect(selectedOption).toBeInTheDocument();
  });

  it('should render NoData correctly', async () => {
    const noOptionsMessage = 'No data';
    const { container } = await act(() => render(<NoData menuIsOpen noOptionsMessage={noOptionsMessage} options={null} />));
    const noOptionText = screen.getAllByText(noOptionsMessage);
    expect(noOptionText).toHaveLength(1);
    const combobox = screen.getAllByRole('combobox');
    await userEvent.click(combobox[0]);
    const menuList = container.querySelectorAll('div[id*=-option-]');
    expect(menuList).toHaveLength(0);
  });

  it.each`
    isVisible | calledTimes
    ${false}  | ${0}
    ${true}   | ${1}
  `('should render depending on in scope = $isVisible', async ({ isVisible, calledTimes }) => {
    const renderFn = vi.fn();
    vi.spyOn(scope, 'useScope').mockReturnValue({ options: [], isVisible });
    vi.spyOn(formField, 'useFormField').mockReturnValue({ render: renderFn });
    await act(() => render(<Default />));

    expect(renderFn).toHaveBeenCalledTimes(calledTimes);
  });
});
