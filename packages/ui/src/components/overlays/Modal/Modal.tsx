import React from 'react';
import { ModalProps } from '../overlay-types';
import Button from '../../atoms/Button/Button';
import { Modal as DaisyModal } from 'react-daisyui';

export const Modal = React.forwardRef<HTMLBaseElement, ModalProps>(function Modal({
  heading,
  description,
  isOpen = false,
  isMainButtonError = false,
  mainButtonLabel,
  mainButtonOnClick = () => console.log('No event attached to ' + mainButtonLabel + ' button'),
  hasSecondaryButton,
  secondaryButtonLabel,
  secondaryButtonOnClick = () => console.log('No event attached to ' + secondaryButtonLabel + ' button'),
  hasCloseOnBackgroundClick = false,
  toggleVisible,
  ...props
}) {
  const tryToggleVisible = () => {
    if (hasCloseOnBackgroundClick) {
      toggleVisible();
    }
  };

  const mainButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toggleVisible();
    mainButtonOnClick(event);
  };

  const secondaryButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toggleVisible();
    secondaryButtonOnClick(event);
  };

  return (
    <div>
      <DaisyModal {...props} className="p-9 w-96.5" open={isOpen} onClickBackdrop={tryToggleVisible}>
        <DaisyModal.Header className="font-bold text-xl text-center mb-0">{heading}</DaisyModal.Header>
        <DaisyModal.Body className="test-base pt-4.5 pb-9 text-center">{description}</DaisyModal.Body>
        <DaisyModal.Actions className="modal-action justify-center mt-0">
          {hasSecondaryButton ? (
            <div className="flex-initial w-81">
              <Button aria-label="secondary modal" onClick={secondaryButtonClick} color="secondary" block={true}>
                {secondaryButtonLabel}
              </Button>
            </div>
          ) : (
            ''
          )}
          {
            <div className="flex-initial w-81">
              <Button aria-label="main modal" onClick={mainButtonClick} color="primary" error={isMainButtonError} block={true}>
                {mainButtonLabel}
              </Button>
            </div>
          }
        </DaisyModal.Actions>
      </DaisyModal>
    </div>
  );
});
