import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantsNavigator } from './RestaurantsNavigator';
import { SettingsNavigator } from './SettingsNavigator';
import { CheckoutScreen } from '../../features/checkout/screens/CheckoutScreen';
import { MapScreen } from '../../features/map/screens/MapScreen';
import { colors } from '../../infrastructure/theme/colors';

import { FavouritesContextProvider } from '../../services/favourites/FavouritesContext';
import { LocationContextProvider } from '../../services/location/LocationContext';
import { RestaurantsContextProvider } from '../../services/restaurants/RestaurantsContext';

const TAB_ICON = {
  Restaurants: 'restaurant',
  Checkout: 'cart',
  Map: 'map',
  Settings: 'settings',
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <Tab.Navigator
          screenOptions={createScreenOptions}
          tabBarOptions={{
            activeTintColor: colors.brand.primary,
            inactiveTintColor: colors.brand.muted,
          }}
        >
          <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
          <Tab.Screen name="Checkout" component={CheckoutScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
