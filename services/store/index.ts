import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { animeApi } from '@services/api';
import myAnimesListReducer from './myAnimesListSlice';

export const makeStore = () => configureStore({
  reducer: {
    [animeApi.reducerPath]: animeApi.reducer,
    myAnimesList: myAnimesListReducer,

  },
  middleware: (gDM) => gDM().concat(animeApi.middleware),
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
