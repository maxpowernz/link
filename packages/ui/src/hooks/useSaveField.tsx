import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

import { useModelContext } from '../context/ModelContext';

export function useSaveField() {
  const { table, uid } = useModelContext();

  return (field: Pick<ControllerRenderProps, 'name' | 'value'>) => {
    const { name, value } = field;

    table?.update(uid, { [name]: value }).then(function (updated: number) {
      if (updated) {
        console.log(`${name} updated with ${value}`);
      } else {
        table.add({ [name]: value }, uid).then((data) => console.log(`${data}: ${name} added with ${value}`));
      }
    });
  };
}
