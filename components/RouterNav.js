import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Weather from './Weather';
import SideMenu from './SideMenu';
import HomeScreen from './Home';
import LocationsScreen from './Locations';
import SettingsScreen from './Settings';

const HomeStack = StackNavigator({
  Weather: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
  Locations: { screen: LocationsScreen },
});

const RouterNav = DrawerNavigator({
  Home: {
    screen: HomeStack,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});

export default RouterNav
