import React from 'react';
import classnames from 'classnames';
import { animated, useTransition } from '@react-spring/web';

import Plus from '../../../assets/icons/18x18/plus.svg';
import Remove from '../../../assets/icons/18x18/close.svg';

import { Accordion, AccordionChildProps } from '../../../decorators/Accordion/Accordion';

import { SectionGroupContext, useSectionGroupContext } from '../context';

import { useSectionTable, useSectionStatus, useSectionGroupReducer } from '../hooks';
import { SectionItem } from '../SectionItem/SectionItem';

import { SectionItemType, SectionItemGroupType } from '../../../db/section-types';

export function MultiSection(props: SectionItemGroupType) {
  const { selectedSectionId, setSelectedSectionId } = useSectionStatus();
  const groupTable = useSectionTable(props);
  const groupStatus = useSectionGroupReducer(groupTable.sections);

  if (!selectedSectionId) {
    setSelectedSectionId(groupTable.sections[0]?.id);
  }

  return (
    <SectionGroupContext.Provider
      value={{
        ...props,
        ...groupStatus,
        ...groupTable,
      }}
    >
      <Accordion isDefaultOpen={groupStatus.isExpanded} onShow={groupStatus.toggle}>
        <Accordion.Heading className="group focus-visible:outline-0" render={(props) => <GroupParent {...props} />} />
        <Accordion.Content render={() => <GroupChildren />} />
      </Accordion>
    </SectionGroupContext.Provider>
  );
}

export function GroupParent(props: AccordionChildProps) {
  const { selectedSectionId } = useSectionStatus();
  const { sections, name, addSection, sync, ...ctx } = useSectionGroupContext();

  ctx.hasStarted = sections.length > 0;
  ctx.hasCompleted = sections.every((section) => section.hasCompleted);
  ctx.hasError = sections.some((section) => section.hasError);
  ctx.isActive = ctx.isExpanded || sections.some((section) => section.id === selectedSectionId);

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addSection?.(`${name} ${sections.length + 1}`);
    // This is from Accordion not ctx
    props.toggle?.(true);
    sync?.();
  };

  return (
    <SectionItem
      title={<span className={classnames({ 'opacity-50': !ctx.hasStarted })}>{name}</span>}
      isGroup
      isFocusDisabled
      count={sections.length}
      {...ctx}
    >
      <SectionItem.Action
        className="hover:bg-blue-240-active focus-visible:bg-blue-240-active"
        onClick={handleAdd}
        onKeyDown={(e) => e.stopPropagation()}
        title="Add"
      >
        <>
          Add
          <Plus />
        </>
      </SectionItem.Action>
    </SectionItem>
  );
}

export function GroupChildren() {
  const { selectedSectionId, setSelectedSectionId } = useSectionStatus();
  const { removeSection, sections, placeholder, isExpanded, name } = useSectionGroupContext();

  const handleOnClick = async (id: unknown) => {
    if (id == null) return;
    setSelectedSectionId?.(id);
  };

  const handleRemove = async (id: unknown) => {
    await removeSection?.(id);
    const nextSection = sections.find((section) => section.id !== id);
    setSelectedSectionId?.(nextSection?.id);
  };

  const showPlaceholder = sections.length === 0 && Boolean(placeholder);

  const transitions = useTransition(
    [...(showPlaceholder ? [{ name: placeholder, id: null, isDisabled: true }] : sections)].map((data) => ({ ...data })),
    {
      key: (item: SectionItemType) => item.id,
      from: { opacity: 0 },
      // TODO: Modal & Async operation
      leave: { opacity: 0, height: 0, config: { duration: 150 } },
      enter: { opacity: 1 },
    }
  );

  return (
    <ul id={`submenu-${name}`}>
      {transitions((style, section) => {
        const isActive = selectedSectionId === section.id;
        return (
          <animated.li className="border-l-2 ml-5 pl-2" style={style}>
            <SectionItem
              {...section}
              title={`${section.name ?? ''}`}
              isActive={isActive}
              isFocusDisabled={!isExpanded}
              onClick={() => handleOnClick(section.id)}
            >
              <SectionItem.Action
                className="hover:bg-blue-240-hover-10 focus-visible:bg-blue-240-hover-10"
                onClick={() => handleRemove(section.id)}
                title="Remove"
              >
                <Remove />
              </SectionItem.Action>
            </SectionItem>
          </animated.li>
        );
      })}
    </ul>
  );
}
