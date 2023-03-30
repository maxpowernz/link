import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header, HeaderProps } from './Header';
import OnLineContextDecorator from '../../../decorators/OnLineContextDecorator';

export default {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    online: true,
    headerType: 'acquisition',
    accountName: 'New Application',
    primaryContact: 'New Contact',
    useLongData: false,
  },
  argTypes: {
    online: { control: 'boolean' },
    useLongData: {
      control: 'boolean',
    },
  },
  decorators: [OnLineContextDecorator],
} as ComponentMeta<typeof Header>;

export const Default: ComponentStory<typeof Header> = (args: HeaderProps & { useLongData?: boolean }) => {
  const newApplication = args.headerType === 'newApplication';

  //return long test data
  if (newApplication && args.useLongData) {
    args.accountName =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utern';
    args.primaryContact =
      'Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt';
  }

  return (
    <>
      <Header {...args} />
    </>
  );
};
