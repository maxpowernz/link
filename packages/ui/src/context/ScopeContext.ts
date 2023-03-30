import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { OptionProps } from '../types/input-types';
import { UseScopeProps, UseScopeReturn } from '../types/form-types';

type ScopeContextProps = Partial<UseScopeProps> &
  Partial<UseScopeReturn> & {
    source: string;
    highlight: boolean;
    isExpanded?: boolean;
    setIsExpanded?: Dispatch<SetStateAction<boolean>>;
    registerTarget?: (targetId: string, isVisible: boolean) => void;
    hasVisibleTarget?: () => boolean;
    options?: OptionProps[];
  };

export const ScopeContext = createContext<ScopeContextProps>({ highlight: false, source: '' });

export function useScopeContext() {
  return useContext(ScopeContext);
}
