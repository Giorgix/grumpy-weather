import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Weather from './Weather';
import SideMenu from './SideMenu';
import LocationsScreen from './Locations';
import SettingsScreen from './Settings';
import WeatherContainer from './WeatherContainer';

const AppStack = StackNavigator({
  Weather: { screen: WeatherContainer },
  Settings: { screen: SettingsScreen },
  Locations: { screen: LocationsScreen },
});

const RouterNav = DrawerNavigator({
  Home: {
    screen: AppStack,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: 300,
  initialRouteName: 'Home',
});

export default RouterNav
