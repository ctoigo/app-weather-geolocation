/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState, useContext } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { View } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import {
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { isIOS, triggerAlert } from '../../utils/Native';
import { styles } from './styles';
import GeolocationContext from '../../context/geolocation/context';

export const AddressMapScreen = () => {
  const { setState, state } = useContext(GeolocationContext);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [markerPosition, setMarkerPosition] = useState<Region>();

  const getPermission = useCallback(async (osPermission: Permission) => {
    request(osPermission).then((result) => {
      switch (result) {
        case RESULTS.GRANTED:
          Geolocation.getCurrentPosition(
            async (pos) => {
              const position = {
                latitude: pos.coords.latitude || -23.533773,
                longitude: pos.coords.longitude || -46.62529,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              };
              setMarkerPosition(position);
              setInitialRegion(position);
              setState(position);
            },
            () => {
              triggerAlert('Error', 'ERRO');
            },
            {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 0,
            }
          );
          break;
      }
    });
  }, []);

  useEffect(() => {
    isIOS()
      ? getPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      : getPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }, [getPermission]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={initialRegion}
        showsUserLocation
      ></MapView>
    </View>
  );
};
