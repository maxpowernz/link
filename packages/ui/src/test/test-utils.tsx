import React, { ReactElement } from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

vi.mock('../assets/brand/fmg-logo.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/arrow-left.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/box.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/calendar.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/caret.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/check-box.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/check-circle.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/circle.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/close.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/drag.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/duplicate.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/file.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/grid.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/half-circle.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/hamburger.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/invalid.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/location.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/minus-circle.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/new-application.svg', () => ({
  default: 'svg',
}));
vi.mock('../assets/icons/18x18/new-referral.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/plus.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/save.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/search.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/stack.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/sync.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/toggled.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/unchecked.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/upload.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/18x18/wifi.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/attachment.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/calculator.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/camera.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/files.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/home.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/note.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/offline.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/online.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/pencil.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/settings.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/user.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/24x24/users.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/30x30/file.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/42x42/add-circle.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/42x42/add-file.svg', () => ({ default: 'svg' }));
vi.mock('../assets/icons/42x42/add-user.svg', () => ({ default: 'svg' }));

afterEach(() => {
  cleanup();
});

type WrapperType = React.JSXElementConstructor<{
  children: React.ReactElement;
}>;

export function withProviders(Wrapper: WrapperType = React.Fragment) {
  return function CreatedWrapper({ children }: { children: ReactElement }) {
    return <Wrapper>{children}</Wrapper>;
  };
}

function customRender(ui: React.ReactElement, options: { wrapper?: WrapperType } = {}) {
  return render(ui, {
    ...options,
    // wrap provider(s) here if needed
    wrapper: withProviders(options.wrapper),
  });
}

export * from './withFormWrapper';
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export * from '@storybook/testing-react';
export { customRender as render };
