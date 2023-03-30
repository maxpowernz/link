import React from 'react';
import { composeStories, render, screen, fireEvent } from '../../../test/test-utils';
import { Modal } from './Modal';
import * as stories from './Modal.stories';

const { Delete } = composeStories(stories);

describe('overlays/Modal', () => {
  it('Modal should render correctly and buttons open and close as expected', async () => {
    render(<Delete />);
    const openButton = screen.getByRole('button');
    fireEvent.click(openButton);
    const buttonError = screen.getByText('Delete');
    const buttonSecondary = screen.getByText('Cancel');
    const modal = screen.getByLabelText('Modal');
    expect(modal).toContainHTML('aria-hidden="false"');
    expect(buttonSecondary).toHaveClass('btn-block btn-secondary');
    expect(buttonError).toHaveClass('btn-block btn-error');

    //Test secondary button click
    fireEvent.click(buttonSecondary);
    expect(modal).toContainHTML('aria-hidden="true"');

    //Test primary button click
    fireEvent.click(openButton);
    fireEvent.click(buttonError);
    expect(modal).toContainHTML('aria-hidden="true"');

    //Test background click
    fireEvent.click(openButton);
    fireEvent.click(modal);
    expect(modal).toContainHTML('aria-hidden="true"');
  });
});
