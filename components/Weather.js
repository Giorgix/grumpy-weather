import React, { Component } from 'react';
import moment from 'moment';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actionCreators } from '../redux/locationsRedux';

export default class Weather extends Component {
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
      this.setState({loading: false, weather: weather.query.results.channel})
    } catch(e) {
      this.setState({loading: false, error: true})
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
  //TODO implement update button
  onUpdateWeather = (location) => {
    const {dispatch} = this.props
    this.getWeatherYahoo(location).then(function(response) {
    // The first runs when the promise resolves, with the request.response
    // specified within the resolve() method.
      location.weather = response;
      dispatch(actionCreators.changeLocation(location))
      // The second runs when the promise
      // is rejected, and logs the Error specified with the reject() method.
    }, function(Error) {
      console.log(Error);
    });
  }
  render() {
    const {loading, error} = this.state
    const {tempUnit, location} = this.props
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
      //TODO show weather from location props
      <View style={styles.weatherBox}>
        <View style={styles.weatherHeader}>
          <View style={styles.box}>
            <Text style={styles.weatherTitle}>
              {location.name}
            </Text>
            <Text style={styles.weatherTemp}>
              {Math.round(
                // If the unit is F (default) otherwise convert to C
                tempUnit === 'F' ? location.weather.condition.temp :
                (location.weather.condition.temp - 23) * 5/9
              )}
              °{tempUnit}
            </Text>
          </View>
          <View style={styles.box}>
            <Ionicons
              name='md-rainy'
              style={styles.bigIcon}
              size={45}
              color="skyblue"
            />
            <Text style={styles.weatherDescription}>
              {location.weather.condition.text}
            </Text>
          </View>
        </View>
        <View>
          <Text>
            Updated at: {moment(location.updatedAt).fromNow()}
          </Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    flexDirection: 'row',
  },
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
  },
  postBody: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightgray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
  weatherBox: {
    flex: 1,
    height: 200,
    marginBottom: 10,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherTitle: {
    fontSize: 20,
    color: 'white',
  },
  weatherTemp: {
    fontSize: 40,
    color: 'white',
  },
  weatherDescription: {
    fontSize: 20,
    color: 'skyblue',
  },
  weatherHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    padding: 25,
    margin: 5,
    alignItems: 'center',
  },
})
