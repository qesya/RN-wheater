import { ThunkAction } from 'redux-thunk';
import { configureStore, Action, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import weatherSliceReducer from './slices/WeatherSlice';
import MMKVReduxStorage from './storage';

const persistConfig = {
  key: 'root',
  storage: MMKVReduxStorage,
  blacklist: ['weatherStore']
};

export const rootReducer = combineReducers({
  weatherStore: weatherSliceReducer,
});

const persistedRecuder = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRecuder,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
