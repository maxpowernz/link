import React from 'react';
import { CheckboxProps } from '../../../types/input-types';
import CheckboxIcon from '../../../assets/icons/18x18/check-box.svg';
import BoxIcon from '../../../assets/icons/18x18/box.svg';
import classnames from 'classnames';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function CustomInput(
  { id, defaultChecked, disabled, error, label, name, value, required, ...props },
  ref
) {
  const rounded = 'transition duration-300 ease-in rounded-full';
  const isError = Boolean(error);

  return (
    <div className={classnames(`inline-flex items-center h-10.5 p-3 focus-visible:outline-0`)}>
      <label
        className={classnames(
          `group relative inline-flex items-center justify-center gap-1.5 cursor-pointer select-none focus-visible:outline-0 `,
          {
            '!cursor-not-allowed': disabled,
          }
        )}
        data-testid={`checkbox-label-wrapper-${name}`}
        aria-invalid={isError}
      >
        <input
          id={`checkbox-${name}-${value}`}
          data-testid={`checkbox-${name}-${value}`}
          value={value}
          type="checkbox"
          name={name}
          ref={ref}
          disabled={disabled}
          className={classnames(`peer w-4.5 h-4.5 opacity-0 focus-visible:ring-0`)}
          defaultChecked={defaultChecked}
          {...props}
        />
        <BoxIcon
          className={classnames('absolute left-0 peer-checked:invisible text-gray-25', {
            'bg-gray-5': disabled,
          })}
        />
        <CheckboxIcon
          className={classnames('absolute left-0 invisible peer-checked:visible', {
            'text-fmg-green': !isError,
            'opacity-50': disabled,
            'text-error': isError,
          })}
        />
        <span
          className={classnames(
            `absolute w-7.5 h-7.5 -left-1.5 -z-50 group-hover:bg-fmg-green-20 group-focus-visible:bg-fmg-green-20 peer-focus-visible:bg-fmg-green-20 ${rounded}`,
            {
              'group-hover:bg-transparent group-focus-visible:bg-transparent': disabled,
              'group-hover:peer-checked:bg-transparent group-focus-visible:bg-transparent ': isError,
            }
          )}
        ></span>
        <span className="peer-disabled:opacity-50 text-text-primary " data-testid={`checkbox-label-${name}`}>
          {label}
        </span>
      </label>
    </div>
  );
});

export default Checkbox;
