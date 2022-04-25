/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { Region } from 'react-native-maps';

interface PropsGeolocationContext {
  state: Region;
  setState: Dispatch<SetStateAction<Region>>;
}

const DEFAULT_VALUE = {
  state: {
    latitude: -23.533773,
    longitude: -46.62529,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  setState: () => {},
};

const GeolocationContext =
  createContext<PropsGeolocationContext>(DEFAULT_VALUE);

function GeolocationContextProvider({ children }) {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <GeolocationContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}
export { GeolocationContextProvider };
export default GeolocationContext;
