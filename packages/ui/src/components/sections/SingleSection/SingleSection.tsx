import React from 'react';
import classnames from 'classnames';

import { useSectionStatus, useSectionTable } from '../hooks';

import { SectionItem } from '../SectionItem/SectionItem';
import { SectionTableProps } from '../../../db/section-types';

export function SingleSection(props: SectionTableProps) {
  const { selectedSectionId, setSelectedSectionId } = useSectionStatus();
  const table = useSectionTable(props);
  const section = table.sections?.[0];
  const isActive = section?.id === selectedSectionId;

  const handleOnClick = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    let id: unknown;
    if (section == null) {
      id = await table.addSection?.();
    } else {
      id = section.id;
    }
    setSelectedSectionId(id);
  };

  return (
    <SectionItem
      {...section}
      isActive={isActive}
      title={<span className={classnames({ 'opacity-50': !section?.hasStarted && !isActive })}>{props.name}</span>}
      onClick={handleOnClick}
    />
  );
}
