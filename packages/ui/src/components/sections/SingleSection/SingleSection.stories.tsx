import React from 'react';
import { z, ZodTypeAny } from 'zod';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { db } from 'models';

import { useSectionStatus, useSectionTable } from '../hooks';
import { SectionItemType } from '../../../db/section-types';
import { SingleSection } from './SingleSection';

const sectionList = [
  { name: 'Single Section A' },
  { name: 'Single Section B' },
  { name: 'Single Section C' },
  { name: 'Client Information', table: db.clientInfos, uid: { contactId: 1 } },
];

export default {
  title: 'Components/Sections/Single Item Sections',
  component: SingleSection,
  parameters: {
    controls: {
      include: ['target', 'status'],
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
} as ComponentMeta<typeof SingleSection>;

const Template: ComponentStory<typeof SingleSection & z.infer<ZodTypeAny>> = (
  args: SectionItemType & { target: string; status: string }
) => {
  const sectionItem = sectionList.find((s) => s.name === args.target);
  const sectionStatus = useSectionStatus();
  const table = useSectionTable({ name: args.target, ...sectionItem });

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

  table.updateSection(sectionStatus.selectedSectionId, { ...resolveStatus() }).then();

  return (
    <div className="w-90">
      {sectionList.map((section, idx) => (
        <React.Fragment key={idx}>
          <SingleSection {...section} />
        </React.Fragment>
      ))}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  target: '',
  status: 'not started',
};
