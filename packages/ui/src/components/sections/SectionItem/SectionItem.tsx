import React from 'react';
import classnames from 'classnames';
import { animated, useSpring } from '@react-spring/web';

import { Count } from '../../atoms/markers/Count/Count';
import { Status, StatusProps } from "../../atoms/markers/Status/Status";

type SectionProps = {
  title: string | React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  isFocusDisabled?: boolean;
  isGroup?: boolean;
  count?: number;
  onClick?: (event?: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactElement | React.ReactElement[];
} & StatusProps;

type SectionActionProps = React.HTMLAttributes<HTMLButtonElement> & Partial<SectionProps>;

const TRANSITION = 'transition ease-in duration-200';
const FOCUS_NO_OUTLINE = 'focus-visible:outline-0';

export function SectionItem({
  title,
  isActive,
  isFocusDisabled = false,
  isGroup,
  isDisabled,
  onClick,
  className,
  count,
  children,
  ...props
}: SectionProps) {
  const tabIndex = isFocusDisabled || isDisabled ? -1 : 0;
  const isActionEnabled = isActive && !isDisabled;
  const isEnabledSubItem = isActionEnabled && !isGroup;

  //console.log({ isActive, isGroup, count, children, ...props });

  const style = useSpring({
    from: { display: 'none', opacity: 0 },
    to: isActionEnabled ? { opacity: 1, display: 'block' } : {},
    delay: isActionEnabled ? 0 : 150,
    reverse: !isActionEnabled,
  });

  // TODO: better way?
  const handleEnterKey = ({ code }: { code: string }) => {
    if (code === 'Enter') {
      console.log({ code });
      onClick?.();
    }
  };

  return (
    <div
      aria-disabled={isDisabled}
      role="button"
      tabIndex={tabIndex}
      className={classnames(
        'flex justify-between items-center h-10.5 rounded-md pr-1.5',
        {
          'cursor-not-allowed': isDisabled,
          'group-focus-visible:bg-blue-240-hover': !isDisabled,
          'focus-visible:bg-blue-240-hover': tabIndex === 0,
          'active:bg-blue-240-pressed hover:bg-blue-240-hover': !isActive && !isDisabled,
          'bg-blue-240-active': isEnabledSubItem,
        },
        TRANSITION,
        FOCUS_NO_OUTLINE,
        className
      )}
      onClick={onClick}
      onKeyDown={handleEnterKey}
    >
      <div className={classnames('relative flex items-center')}>
        <span
          className={classnames('absolute w-0.75 h-3 rounded-r-sm bg-blue-216-active', {
            'opacity-0': !isEnabledSubItem,
          })}
        />
        <span className={classnames({ 'p-3': !isDisabled, 'pl-3': isDisabled })}>{!isDisabled && <Status {...props} />}</span>
        <div className={classnames('flex gap-3 items-center')}>
          {title}
          {isGroup && <Count count={count} />}
        </div>
      </div>
      {children && <animated.div style={style}>{children}</animated.div>}
    </div>
  );
}

const ItemAction = React.forwardRef<HTMLButtonElement, SectionActionProps>(function CustomComponent(
  { children, className, ...props },
  ref
) {
  return (
    <button
      role="button"
      {...props}
      className={classnames('flex items-center gap-1.5 p-1.5 rounded-1.5 text-blue-217-content', TRANSITION, FOCUS_NO_OUTLINE, className)}
      ref={ref}
    >
      {children}
    </button>
  );
});

SectionItem.Action = ItemAction;
