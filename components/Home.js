import React from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import { DrawerNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import WeatherContainer from './WeatherContainer';

const mapStateToProps = (state) => ({
  tempUnit: state.tempUnit,
  selectedLocation: state.selectedLocation,
  locations: state.locations,
})

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Grumpy Weather',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerToggle')}
        >
        <Ionicons
          name='md-menu'
          style={styles.menuIcon}
          size={25}
          color="#333333"
        />
      </TouchableOpacity>
      ),
    }
  };

  render() {
    const {tempUnit, selectedLocation, locations} = this.props
    return (
      <ScrollView style={styles.container}>
        <WeatherContainer />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    width: 26,
    height: 26,
    marginLeft: 15,
  },
  container: {
    flex: 1
  },
});

export default connect(mapStateToProps)(HomeScreen)
