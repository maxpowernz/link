import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Status } from './Status';

export default {
  title: 'Atoms/Marker/Status',
  component: Status,
  parameters: {},
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => {
  return <Status {...args} />;
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  hasStarted: false,
};

export const Incomplete = Template.bind({});
Incomplete.args = {
  hasStarted: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...Incomplete.args,
  hasError: true,
};

export const Complete = Template.bind({});
Complete.args = {
  ...Incomplete.args,
  hasCompleted: true,
};
