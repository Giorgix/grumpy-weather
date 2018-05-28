import React from 'react';
import { Text, View, Button,FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { actionCreators } from '../redux/locationsRedux'

const mapStateToProps = (state) => ({
  locations: state.locations,
  tempUnit: state.tempUnit,
})

class SideMenu extends React.Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  onSelectLocation = (index) => {
    const {dispatch} = this.props
    dispatch(actionCreators.changeLocation(index))
    this.props.navigation.navigate('DrawerToggle')
  }
  onRemoveLocation = (index) => {
    const {dispatch} = this.props
    dispatch(actionCreators.removeLocation(index))
    //this.props.navigation.navigate('DrawerToggle')
  }
  renderLocationItem = (location, i) => {
    const { tempUnit } = this.props
    if (location.weather) {
      return (
        <View key={i} style={styles.buttonsWrapper}>
            <TouchableOpacity
              style={styles.flexRowSpace}
              onPress={() => this.onSelectLocation(i)}
            >
              <View style={styles.flexRowCenter}>
                <Ionicons
                  name='md-rainy'
                  style={styles.bigIcon}
                  size={45}
                  color="skyblue"
                />
                <View>
                  <Text style={styles.item}>{location.name}</Text>
                  <Text style={styles.temp}>
                    {Math.round(
                      // If the unit is F (default) otherwise convert to C
                      tempUnit === 'F' ? location.weather.condition.temp :
                      (location.weather.condition.temp - 23) * 5/9
                    )}
                    °{tempUnit}
                  </Text>
                </View>
              </View>
              <Ionicons
                name='md-close'
                size={21}
                style={{padding: 5}}
                color="#333333"
                onPress={() => this.onRemoveLocation(i)}

              />
            </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View key={i} style={styles.center}>
          <Text>
            Error getting the weather!
          </Text>
        </View>
      )
    }
  }
  render () {
    const { locations } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.sideHeader}>
          <Text style={styles.headerText}>
            Grumpy Weather
          </Text>
        </View>
        <ScrollView>
          <View>
            {locations.map(this.renderLocationItem)}
          </View>
        </ScrollView>
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.navSectionStyle}
            onPress={this.navigateToScreen('Locations')}
          >
            <Ionicons name='md-add' size={25} color='#333333' />
            <Text style={styles.navItemStyle}>
              Add location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Settings')} >
            <View style={styles.navSectionStyle}>
              <Ionicons name='md-settings' size={25} color='#333333' />
              <Text style={styles.navItemStyle}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  container: {
    flex: 1
  },
  sideHeader: {
    backgroundColor: 'steelblue',
    //flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  navItemStyle: {
    paddingLeft: 20,
    fontSize: 18,
    color: '#333333',
  },
  navSectionStyle: {
    alignItems: 'center',
    padding: 30,
    flex: 1,
    flexDirection: 'row',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
  },
  flexRowSpace: {
    flex: 1,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowCenter: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
  },
  item: {
    fontSize: 16,
    marginLeft: 10,
  },
  temp: {
    fontSize: 21,
    color: '#777777',
    marginTop: 3,
    marginLeft: 10,
  },
  footerActions: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
});

export default connect(mapStateToProps)(SideMenu)
