import { useSyncExternalStore } from 'react';
import { ISectionStore } from '../../../section-types';
import { TableAdapter } from '../../../adapters/TableAdapter';

export function createStore<Shape extends ISectionStore>(initialState: Shape) {
  let currentState = initialState;
  const listeners = new Set<(state: Shape) => void>();
  let serverState: Shape | null = null;
  const subscribe = (listener: (state: Shape) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const getState = () => currentState;
  const setState = (newState: Shape) => {
    currentState = newState;
    listeners.forEach((listener) => listener(newState));
  };

  const createGroup = (name: string) => {
    const state = getState();
    setState({ ...state, groups: { ...state.groups, [name]: new TableAdapter() } });
  };
  const selectGroup = (name: string) => (state: Shape) => {
    return state.groups[name];
  };

  const getApplicationId = (state: Shape) => {
    return state.applicationId;
  };

  const setApplicationId = (id: unknown) => {
    const state = getState();
    setState({ ...state, applicationId: id });
  };

  const getSelectedSectionId = (state: Shape) => {
    return state.selectedSectionId;
  };

  const setSelectedSectionId = (id: unknown) => {
    const state = getState();
    setState({ ...state, selectedSectionId: id });
  };

  const getForm = (state: Shape) => {
    return state.form;
  };

  const setForm = (formName: string) => {
    const state = getState();
    setState({ ...state, form: formName });
  };

  return {
    createGroup,
    selectGroup,
    getApplicationId,
    setApplicationId,
    getSelectedSectionId,
    setSelectedSectionId,
    getForm,
    setForm,
    getState,
    setState,
    subscribe,
    serverInitialize: (initialServerState: Shape) => {
      if (!serverState) {
        currentState = initialServerState;
        serverState = initialServerState;
      }
    },
    getServerState: () => serverState ?? initialState,
    useStore: <SelectorOutput>(selector: (state: Shape) => SelectorOutput): SelectorOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(serverState ?? initialState)
      ),
  };
}

const store = createStore<ISectionStore>({
  groups: {},
  selectedSectionId: '',
  applicationId: '',
  form: '',
});

export type ValuesStore = ReturnType<typeof store.getState>;

export default store;
