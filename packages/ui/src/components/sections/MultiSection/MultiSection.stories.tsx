import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { z, ZodTypeAny } from 'zod';

import { db } from "models";

import { useSectionTable, useSectionStatus } from '../hooks';
import { SectionItemGroupType } from '../../../db/section-types';
import { MultiSection } from './MultiSection';

const sectionList = [
  { name: 'Multi Section A' },
  { name: 'Multi Section B' },
  { name: 'Multi Section C' },
  { name: 'Dwellings', table: db.buildings, uid: { contactId: 1, applicationId: 1, type: 'building' } },
];

export default {
  title: 'Components/Sections/Multi Item Sections',
  component: MultiSection,
  parameters: {
    controls: {
      include: ['target', 'status', 'placeholder'],
    },
  },
  argTypes: {
    target: {
      options: sectionList.map(({ name: sectionName }) => sectionName),
      control: { type: 'select' },
    },
    status: {
      options: ['not started', 'incomplete', 'complete', 'invalid'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof MultiSection>;

const Template: ComponentStory<typeof MultiSection & z.infer<ZodTypeAny>> = (
  args: SectionItemGroupType & { target: string; status: string }
) => {
  const sectionItemType = sectionList.find((s) => s.name === args.target);
  const { selectedSectionId } = useSectionStatus();
  const table = useSectionTable({ name: args.target, ...sectionItemType });

  const resolveStatus = () => {
    switch (args.status) {
      case 'incomplete':
        return { hasStarted: true, hasCompleted: false, hasError: false };
      case 'complete':
        return { hasStarted: true, hasCompleted: true, hasError: false };
      case 'invalid':
        return { hasStarted: true, hasCompleted: false, hasError: true };
      case 'not started':
      default:
        return { hasStarted: false, hasCompleted: false, hasError: false };
    }
  };

  table.updateSection(selectedSectionId, { ...resolveStatus() }).then();

  return (
    <div className="w-90">
      {sectionList.map((section, idx) => (
        <React.Fragment key={idx}>
          <MultiSection {...section} placeholder={args.placeholder} />
        </React.Fragment>
      ))}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  target: '',
  status: 'not started',
  placeholder: 'No items added',
};
