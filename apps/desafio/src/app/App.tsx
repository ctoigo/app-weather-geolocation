/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';

import { AddressMapScreen } from './components/AddressMapScreen.tsx';
import { Weather } from './components/Weather';
import { GeolocationContextProvider } from './context/geolocation/context';

import { styles } from './styles';

export const App = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);

  return (
    <GeolocationContextProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          ref={(ref) => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.section}>
            <Text style={[styles.textXL, styles.appTitleText]} testID="heading">
              Bem Vindo ao Desafio 👋
            </Text>
          </View>

          <View style={styles.section}>
            <Weather></Weather>
          </View>
          <View style={styles.section}>
            <View style={[styles.shadowBox]}>
              <AddressMapScreen></AddressMapScreen>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GeolocationContextProvider>
  );
};

export default App;
