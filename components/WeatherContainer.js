import React, { Component } from 'react';
import moment from 'moment';
import { View, Alert, Button, Text, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actionCreators } from '../redux/locationsRedux'
import { connect } from 'react-redux'
import Weather from './Weather';


const mapStateToProps = (state) => ({
  selectedLocation: state.selectedLocation,
  tempUnit: state.tempUnit,
  locations: state.locations,
})

class WeatherContainer extends Component {
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
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    }
  }
  getWeatherYahoo = async (location) => {
    try {
      const response = await fetch('https://query.yahooapis.com/v1/public/yql?q= select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(' + location.lat + ',' + location.lon + ')")&format=json')
      const weather = await response.json();
      this.setState({loading: false})
      return weather.query.results.channel.item
    } catch(e) {
      console.log('error gettign weather: ', e);
      //this.setState({loading: false, error: true})
    }
  }
  getWeatherOpen = async (location) => {
    try {
      const response = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + location.lat + '&lon=' + location.lon + '&units=imperial&APPID=8e69078d04cbc142a30de0c0456fe417')
      const weather = await response.json();

      this.setState({loading: false, weather})
    } catch(e) {
      this.setState({loading: false, error: true})
    }
  }
  //TODO Update weather when component mounts (user opens app)
  // after a certain period of time
  /*componentDidMount = () => {
    const { location } = this.props
    this.getWeatherYahoo(location)
  }
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps !== this.props) {
      const { location } = this.props
      this.getWeatherYahoo(location)
    }
  }*/
  onUpdateWeather = (location) => {
    const {dispatch, selectedLocation} = this.props
    const updatedAt = new Date(location.updatedAt)
    // Set a threshold of 3 min so we don't send too many request
    // to update the weather
    const updateThreshold = new Date(updatedAt.getTime() + 3*60000)
    const now = new Date()

    if (now >= updateThreshold) {
      this.setState({loading: true})
      this.getWeatherYahoo(location).then(function(response) {

      // The first runs when the promise resolves, with the request.response
      // specified within the resolve() method.
      const payload = {itemId: selectedLocation, weather: response}
      dispatch(actionCreators.updateWeather(payload))

      // The second runs when the promise
      // is rejected, and logs the Error specified with the reject() method.
      }, function(Error) {
        console.log(Error);
      });
    } else {
      return Alert.alert(
        "Hey!",
        "You need to relax... the weather doesn't change so frequently.",
        [
          {text: "Ok I'll wait at least 3 min."}
        ]
      )
    }

  }
  render() {
    const {loading, error} = this.state
    const {tempUnit, locations, selectedLocation} = this.props
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true}/>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text>
            Error getting the weather!
          </Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <Weather
          location={locations[selectedLocation]}
          onUpdate={this.onUpdateWeather}
          tempUnit={tempUnit}
        />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 26,
    height: 26,
    marginLeft: 15,
  },
  container: {
    flex: 1
  },
})

export default connect(mapStateToProps)(WeatherContainer)
