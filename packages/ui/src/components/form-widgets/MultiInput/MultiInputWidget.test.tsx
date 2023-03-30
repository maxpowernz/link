import { composeStories, render } from '../../../test/test-utils';

import * as scope from '../../../hooks/useScope';
import * as formField from '../../../hooks/useFormFieldGroup';
import * as stories from './MultiInputWidget.stories';
import { act } from '@testing-library/react';

const { Default } = composeStories(stories);

describe('form-widgets/MultiInput', () => {
  it.each`
    isVisible | calledTimes
    ${false}  | ${0}
    ${true}   | ${1}
  `('should render depending on when in scope = $isVisible', async ({ isVisible, calledTimes }) => {
    const renderFn = vi.fn();
    vi.spyOn(scope, 'useScope').mockReturnValue({ options: [], isVisible });
    vi.spyOn(formField, 'useFormFieldGroup').mockReturnValue({ render: renderFn });
    await act(() => render(<Default />));

    expect(renderFn).toHaveBeenCalledTimes(calledTimes);
  });
});
