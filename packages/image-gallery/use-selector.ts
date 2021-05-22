import { RootReducerState } from 'image-store';
import { useSelector as useSelectorReactRedux, TypedUseSelectorHook } from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootReducerState> = useSelectorReactRedux;
