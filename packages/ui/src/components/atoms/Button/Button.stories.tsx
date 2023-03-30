import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Buttons/Basic Buttons',
  component: Button,
  parameters: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  const { children, ...rest } = args;
  return <Button {...rest}>{children}</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
  'aria-label': 'Primary Button',
  children: 'Primary Button',
  color: 'primary',
};

export const PrimaryBlock = Template.bind({});
PrimaryBlock.args = {
  'aria-label': 'Primary Button',
  children: 'Primary Block Button',
  color: 'primary',
  block: true,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  'aria-label': 'Primary Button',
  children: 'Primary Button',
  color: 'primary',
  disabled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  'aria-label': 'Secondary Button',
  children: 'Secondary Button',
  color: 'secondary',
};

export const SecondaryBlock = Template.bind({});
SecondaryBlock.args = {
  'aria-label': 'Secondary Button',
  block: true,
  children: 'Secondary Block Button',
  color: 'secondary',
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  'aria-label': 'Secondary Button',
  children: 'Secondary Button',
  color: 'secondary',
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  'aria-label': 'Error Button',
  children: 'Error Button',
  color: 'primary',
  error: true,
};

export const ErrorBlock = Template.bind({});
ErrorBlock.args = {
  'aria-label': 'Error Button',
  block: true,
  children: 'Error Block Button',
  color: 'primary',
  error: true,
};

export const ErrorDisabled = Template.bind({});
ErrorDisabled.args = {
  'aria-label': 'Error Button',
  children: 'Error Button',
  disabled: true,
  error: true,
};

export const PrimaryBlockLight = Template.bind({});
PrimaryBlockLight.args = {
  'aria-label': 'Primary Block Light Button',
  children: 'Primary Block Light',
  disabled: false,
  color: 'primary-block-light',
};

export const PrimaryBlockLightDisabled = Template.bind({});
PrimaryBlockLightDisabled.args = {
  'aria-label': 'Primary Block Light Button',
  children: 'Primary Block Light',
  disabled: true,
  color: 'primary-block-light',
};
