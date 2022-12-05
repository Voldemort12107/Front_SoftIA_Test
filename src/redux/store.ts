import { combineReducers, createStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { userReducer } from "./userStore/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

const rootReducer = combineReducers({
  userReducer: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
