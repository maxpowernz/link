import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import Button from '../../atoms/Button/Button';

export default {
  title: 'Overlays/Modal',
  component: Modal,
  parameters: {},
  args: {
    isOpen: false,
  },
  argTypes: {
    isOpen: {
      control: false,
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const { ...rest } = args;

  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Button aria-label="modal open" color="primary" onClick={toggleVisible}>
        {'Open Modal'}
      </Button>
      <Modal {...rest} isOpen={visible} toggleVisible={toggleVisible}></Modal>
    </>
  );
};

export const Delete = Template.bind({});
Delete.args = {
  heading: 'Delete Item',
  description: 'Are you sure you want to delete this Item? This action cannot be undone.',
  isMainButtonError: true,
  mainButtonLabel: 'Delete',
  hasSecondaryButton: true,
  secondaryButtonLabel: 'Cancel',
  hasCloseOnBackgroundClick: true,
};

export const Add = Template.bind({});
Add.args = {
  heading: 'Add Item',
  description: 'Are you sure you want to Add this Item?',
  mainButtonLabel: 'Add',
  hasSecondaryButton: true,
  secondaryButtonLabel: 'Cancel',
};

export const OK = Template.bind({});
OK.args = {
  heading: 'Submission Complete',
  description: 'Your submission has been completed. Submission Number: 1234567',
  mainButtonLabel: 'OK',
};
