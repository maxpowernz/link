import { useWatchSections } from '../../../db/mappers/sections/hooks';
import { SectionItemType, SectionTableProps } from '../../../db/section-types';

/**
 * Hook that stores child sections statuses
 */
export function useSectionTable({ name, ...props }: SectionTableProps) {
  const { result, table } = useWatchSections<SectionItemType>({ name, ...props });

  const addSection = async (name = '') => {
    const record = { ...props.uid, name, hasStarted: false };
    let result = await table.add(record);
    if (!result) {
      const id = self.crypto.randomUUID();
      result = await table.add({ ...record, id }, id);
    }
    return result;
  };

  const updateSection = async (id: unknown, section: SectionItemType) => {
    await table.update(id, section);
  };

  const removeSection = async (id: unknown) => {
    await table.delete(id);
  };

  //console.log({ name, result, table });

  return {
    addSection,
    updateSection,
    removeSection,
    sections: result,
    table,
  };
}
