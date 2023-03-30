import store from '../store';

export function useSectionStatus() {
  const applicationId = store.useStore(store.getApplicationId);
  const selectedSectionId = store.useStore(store.getSelectedSectionId);
  const form = store.useStore(store.getForm);
  return {
    selectedSectionId,
    setSelectedSectionId: store.setSelectedSectionId,
    applicationId,
    setApplicationId: store.setApplicationId,
    form,
    setForm: store.setForm,
  };
}
