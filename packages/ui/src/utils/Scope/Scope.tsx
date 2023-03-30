import React, { Children, useEffect, useId, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import classnames from 'classnames';
import { useSpring, animated } from '@react-spring/web';

import { ScopeContext, useScopeContext } from '../../context/ScopeContext';
import { useScope } from "../../hooks/useScope";
import { UseScopeProps } from "../../types/form-types";
import { OptionProps } from "../../types/input-types";

type ScopedGroupProps = {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  highlight?: boolean;
  options?: OptionProps[];
};

type ScopeTargetProps = ScopedGroupProps & Omit<UseScopeProps, 'source'>;

/**
 * Hook that stores and evaluates targets' visibility statuses
 */
export function useScopeRoot() {
  const targets = useRef<Record<string, boolean>>({});
  function registerTarget(id: string, isVisible = false) {
    targets.current[id] = isVisible;
  }

  const hasVisibleTarget = () => Object.values(targets.current).reduce((acc, val) => acc || val, false);

  return { registerTarget, hasVisibleTarget };
}

/**
 * Utility wrapper component for conditional rendering
 * @param children
 * @param className
 * @param highlight
 * @param options can be passed in if this scope has a parent
 * @constructor
 */
export function Scope({ children, className, highlight = false, options }: ScopedGroupProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { registerTarget, hasVisibleTarget } = useScopeRoot();

  return (
    <ScopeContext.Provider value={{ highlight, isExpanded, setIsExpanded, registerTarget, hasVisibleTarget, options, source: '' }}>
      <ScopedGroup className={className}>{children}</ScopedGroup>
    </ScopeContext.Provider>
  );
}

export function ScopedGroup({ children, className }: ScopedGroupProps) {
  const { highlight, isExpanded } = useScopeContext();

  const nodeRef = useRef(null);

  return (
    <div
      ref={nodeRef}
      className={classnames(
        'scoped-group',
        {
          'py-3 bg-fmg-green-5 border-y-0 border-x-1.5 mx-[-3px] border-fmg-green-20 transition-color duration-300':
            highlight && isExpanded,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

function Source({ children }: ScopedGroupProps) {
  const context = useScopeContext();

  return (
    <div className="form-container mx-[-3px]">
      {Children.map(children, (child) => {
        context.source = child.props.name;
        //console.log(context.options, child.props.options);
        return React.cloneElement(child, { options: context.options ?? child.props.options });
      })}
    </div>
  );
}

function Target({ children, condition, values }: ScopeTargetProps) {
  const id = useId();
  const context = useScopeContext();
  useWatch({ name: context.source });

  const { isVisible, options } = useScope({ ...context, condition, values });

  useEffect(() => {
    context.registerTarget?.(id, isVisible);
    context.setIsExpanded?.(Boolean(condition) && (context.hasVisibleTarget?.() || false));
  });

  const style = useSpring({
    from: { display: 'none', opacity: 0 },
    to: isVisible ? { opacity: 1, display: 'block' } : {},
    delay: 100,
    duration: 500,
    reverse: !isVisible,
  });

  return (
    <animated.div style={style}>
      <div className={classnames('form-container')}>
        {Children.map(children, (child) => {
          // TODO: Write test for cloning options
          return React.cloneElement(child, { options: options ?? child.props.options });
        })}
      </div>
    </animated.div>
  );
}

Scope.Source = Source;
Scope.Target = Target;

export default Scope;
