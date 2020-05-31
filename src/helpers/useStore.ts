import { useContext } from 'react';
import { StoreContext, Store } from './storeProvider';

export const useStore = (): Store => useContext(StoreContext);
