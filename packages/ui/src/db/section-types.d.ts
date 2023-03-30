import React from 'react';
import { Table } from 'dexie';
import { KeyType } from '../../../../types/model-type';
import { TableAdapter } from '../../adapters/TableAdapter';

export interface IStatus {
  hasStarted?: boolean;
  hasCompleted?: boolean;
  hasError?: boolean;
}

export interface ISectionItem {
  id?: KeyType;
  name?: string;
  isDisabled?: boolean;
}

export interface ISectionTable {
  name: string;
  table?: SectionTableType;
  uid?: Record<string, unknown>;
  displayNamePath?: string;
}

export type SectionTableProps = ISectionTable;

export type SectionItemType = ISectionItem & IStatus;
export type SectionItemGroupType = SectionItemType &
  SectionTableProps & {
    isExpanded?: boolean;
    isActive?: boolean;
    sections?: SectionItemType[];
    placeholder?: string | React.ReactNode;
  };

type SectionTableType = Table | TableAdapter;

export interface ISectionStore {
  groups: Record<string, TableAdapter<KeyType>>;
  selectedSectionId: unknown;
  applicationId: unknown;
  form: string;
}
