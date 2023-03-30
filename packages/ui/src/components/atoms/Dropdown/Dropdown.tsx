import React from 'react';
import classnames from 'classnames';
import Select, { components } from 'react-select';

import { CustomDropdownProps } from '../../../types/input-types';
import Caret from '../../../assets/icons/18x18/caret.svg';
import Close from '../../../assets/icons/18x18/close.svg';

import { useOptions, isPlaceholder } from '../../../utils/options/options-util';

export const Dropdown = React.forwardRef(function CustomInput(
  { className, error, disabled, label, isClearable = false, isSearchable = true, isMulti, size = 4, ...props }: CustomDropdownProps,
  ref: React.ForwardedRef<never>
) {
  const PLACEHOLDER = 'text-placeholder opacity-50';

  const convert = useOptions(props.options);

  const value = convert(props.value);
  const defaultValue = convert(props.defaultValue);

  return (
    <Select
      unstyled
      className={`w-grid-${size}`}
      maxMenuHeight={294}
      classNames={{
        container: () => classnames({ '!cursor-not-allowed bg-white': disabled }),
        control: ({ isFocused, isDisabled, menuIsOpen }) =>
          classnames(
            `flex text-base border rounded bg-gray-5 hover:bg-gray-10 p-[11px] min-h-10.5`,
            {
              '!bg-white !hover:bg-white': isDisabled || (menuIsOpen && !isSearchable),
              'border-1 border-gray-10 !cursor-not-allowed': isDisabled,
              'rounded-b-none': menuIsOpen,
              'border-1 border-fmg-green': (menuIsOpen || isFocused) && !isDisabled && !error,
              'border-transparent': !isDisabled && !error && !menuIsOpen && !isFocused,
              'border-1 border-error': error,
            },
            className
          ),
        option: ({ isDisabled, isSelected, isFocused, data }) =>
          classnames('flex place-content-center h-10.5 p-2.5', {
            'bg-gray-10': isFocused && !isSelected,
            'bg-gray-5': isSelected,
            'active:bg-gray-10': !isDisabled,
            [PLACEHOLDER]: isPlaceholder(data),
          }),
        menu: () =>
          classnames('!bg-white border rounded-b border-1 border-t-0 border-fmg-green mt-[-1px]', {
            '!border-error': error,
          }),
        valueContainer: () => classnames('flex flex-wrap gap-1.5', { '-m-1.5': isMulti }),
        placeholder: () => classnames(PLACEHOLDER, { 'm-1.5': isMulti }),
        input: ({ hasValue }) => classnames({ 'm-1.5': isMulti && !hasValue }),
        multiValue: () => classnames('!bg-white p-1.5 border rounded border-multi-value flex gap-1.5'),
        singleValue: ({ data }) => classnames({ [PLACEHOLDER]: isPlaceholder(data) }),
        noOptionsMessage: () => 'p-3 !text-start',
      }}
      components={{
        DropdownIndicator: ({ isFocused, isDisabled }) => (
          <Caret
            className={classnames({ 'opacity-50': !isDisabled && !error && !isFocused, 'fill-gray-20': isDisabled, 'fill-error': error })}
          />
        ),
        MultiValueRemove: (removeProps) => (
          <components.MultiValueRemove {...removeProps}>
            <Close className={classnames('fill-multi-value-remove')} />
          </components.MultiValueRemove>
        ),
      }}
      {...props}
      value={value}
      defaultValue={defaultValue}
      ref={ref}
      isClearable={isClearable}
      isDisabled={disabled}
      isMulti={isMulti}
      aria-disabled={disabled}
      aria-invalid={Boolean(error)}
      aria-label={label || props.name}
    />
  );
});

export default Dropdown;
