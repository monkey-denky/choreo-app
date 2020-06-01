import { useContext } from 'react';
import { StoreContext, RootStore } from './storeProvider';

export const useStore = (): RootStore => useContext(StoreContext);
