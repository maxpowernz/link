import React from 'react';
import { Button as DaisyButton } from 'react-daisyui';
import classnames from 'classnames';
import { InlineButtonProps } from '../../../types/input-types';

/**
 *
 * NOTE: Icons must have the property "fill" set to "currentColor" so that the component
 * can apply the color scheme to the icon.
 *
 */

export const InlineButton = function InlineButton({ children, className, color, disabled, ...props }: InlineButtonProps) {
  const height = color === 'light' ? 'h-10.5' : 'h-9';
  const isSquare = !Boolean(children);

  return (
    <DaisyButton
      {...props}
      className={classnames(
        `
        no-animation 
        normal-case 
        font-light 
        min-h-0 
        rounded
        ${height}
        ${className ? className : ''}
        `,
        {
          'btn-ghost': color === 'light',
          'btn-primary-inline-light': color === 'secondary',
          'btn-primary-light': color === 'secondary-light',
          'w-9 btn-square': isSquare,
          'btn-disabled': disabled,
          'px-3': !isSquare,
        }
      )}
    >
      {children}
    </DaisyButton>
  );
};

export default InlineButton;
