import * as React from 'react';
import { z } from 'zod';

import { act, render, renderHook, screen, withFormWrapper } from '../../test/test-utils';
import * as scopeContext from '../../context/ScopeContext';
import * as scopeHook from '../../hooks/useScope';
import { Scope, ScopedGroup, useScopeRoot } from './Scope';
import { Globals } from '@react-spring/web';
import { RadioGroupWidget } from "../../components/form-widgets/RadioGroup/RadioGroupWidget";
import TextInputWidget from "../../components/form-widgets/TextInput/TextInputWidget";

const schema = z.object({
  accountType: z.string(),
  accountTypeOther: z.string(),
});

export type FormValues = z.infer<typeof schema>;

const accountTypes = [
  { id: 'person', label: 'Person', value: 'person' },
  { id: 'collective', label: 'Collective', value: 'col' },
  { id: 'trust', label: 'Trust', value: 'trust' },
  { id: 'partnership', label: 'Partnership', value: 'partnership' },
  { id: 'trader', label: 'Trader', value: 'trader' },
  { id: 'ltd', label: 'Limited Company', value: 'ltd' },
  { id: 'other', label: 'Other', value: 'other' },
];

beforeAll(() => {
  Globals.assign({
    skipAnimation: true,
  });

  vi.useFakeTimers();
});

afterAll(() => {
  vi.clearAllTimers();
});

function ScopeComponent({ condition }: { condition?: string }) {
  return (
    <Scope highlight>
      <Scope.Source>
        <RadioGroupWidget name="accountType" question="Account type" options={accountTypes} cols={3} size={10} required />
      </Scope.Source>
      <Scope.Target condition={condition}>
        <TextInputWidget name="accountTypeOther" question="Please specify account type" size={12} required />
      </Scope.Target>
    </Scope>
  );
}

describe('Scope', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('useScopeRoot', () => {
    it('should render hook correctly', () => {
      const { result } = renderHook(useScopeRoot);

      act(() => {
        result.current.registerTarget('id1', false);
      });
      expect(result.current.hasVisibleTarget()).toBeFalsy();

      act(() => {
        result.current.registerTarget('id2', true);
      });
      expect(result.current.hasVisibleTarget()).toBeTruthy();
    });
  });

  describe('ScopedGroup', () => {
    const textContent = 'textContent';
    it('should render correctly', async () => {
      render(
        <ScopedGroup>
          <>{textContent}</>
        </ScopedGroup>
      );
      expect(screen.getByText('textContent')).toHaveClass('scoped-group');
    });

    it('should style correctly', async () => {
      const useScopeContextSpy = vi.spyOn(scopeContext, 'useScopeContext');
      useScopeContextSpy.mockReturnValue({ highlight: true, isExpanded: true, source: '' });
      render(
        <ScopedGroup>
          <>{textContent}</>
        </ScopedGroup>
      );
      expect(useScopeContextSpy).toHaveBeenCalled();
      expect(screen.getByText('textContent')).toHaveClass('bg-fmg-green-5');
    });
  });

  it.each`
    testCase                                | condition    | hasVisibleTarget
    ${'no condition and visible target'}    | ${undefined} | ${true}
    ${'condition and visible target'}       | ${'other'}   | ${true}
    ${'no condition and no visible target'} | ${undefined} | ${false}
    ${'condition and no visible target'}    | ${'other'}   | ${false}
  `('should set value correctly when $testCase', async ({ condition, hasVisibleTarget }) => {
    const setIsRootExpanded = vi.fn();
    const useScopeContextSpy = vi.spyOn(scopeContext, 'useScopeContext');
    useScopeContextSpy.mockReturnValue({
      highlight: true,
      source: 'accountType',
      hasVisibleTarget: () => hasVisibleTarget,
      setIsExpanded: setIsRootExpanded,
    });

    render(<ScopeComponent condition={condition} />, { wrapper: withFormWrapper<FormValues>({ defaultValues: {} }) });
    expect(setIsRootExpanded).toHaveBeenCalledWith(Boolean(condition) && hasVisibleTarget);
  });

  it.each`
    highlight | fnCallTimes
    ${true}   | ${1}
    ${false}  | ${1}
  `('should register target depending on whenter Root=$isRoot', async ({ highlight, fnCallTimes }) => {
    const registerTarget = vi.fn();
    const setIsExpanded = vi.fn();
    const useScopeContextSpy = vi.spyOn(scopeContext, 'useScopeContext');
    useScopeContextSpy.mockReturnValue({ highlight, source: 'accountType', registerTarget, setIsExpanded });

    render(<ScopeComponent />, { wrapper: withFormWrapper<FormValues>({ defaultValues: {} }) });
    expect(registerTarget).toHaveBeenCalledTimes(fnCallTimes);
    expect(setIsExpanded).toHaveBeenCalledTimes(fnCallTimes);
  });

  it.each`
    isVisible
    ${true}
    ${false}
  `('should show/hide target correctly when evaluated visibiblity=$isVisible', async ({ isVisible }) => {
    const useScopeContextSpy = vi.spyOn(scopeContext, 'useScopeContext');
    useScopeContextSpy.mockReturnValue({ highlight: true, source: 'accountType' });
    const useScopeSpy = vi.spyOn(scopeHook, 'useScope');
    useScopeSpy.mockReturnValue({ isVisible });

    render(<ScopeComponent />, { wrapper: withFormWrapper<FormValues>({ defaultValues: {} }) });
    vi.advanceTimersByTime(1000);

    const textInputField = await screen.queryByRole('textbox');
    expect(Boolean(textInputField)).toBe(isVisible);
  });
});
