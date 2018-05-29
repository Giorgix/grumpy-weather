import React from 'react';
import _ from 'lodash'
import { ActivityIndicator, Text, View, Button, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { actionCreators } from '../redux/locationsRedux'
import { connect } from 'react-redux'
import Input from './Input'

// TODO separate component Presentational Vs Container
const mapStateToProps = (state) => ({
  locations: state.locations,
})

class LocationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My locations',
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      searchResults: [],
    }
  }
  getWeatherYahoo = async (location) => {
    try {
      const response = await fetch('https://query.yahooapis.com/v1/public/yql?q= select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(' + location.lat + ',' + location.lon + ')")&format=json')
      const weather = await response.json();
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
  onSearchLocation = async (query) => {
    //this.setState({loading: true})
    try {
      const response = await fetch('https://www.meteoblue.com/en/server/search/query3?query=' + query)
      const search = await response.json();
      this.setState({loading: false, searchResults: search.results})
    } catch(e) {
      this.setState({loading: false, error: true})
    }
  }
  onSearchDelayed = _.debounce(this.onSearchLocation, 250)
  onAddLocation = (location) => {
    const {dispatch} = this.props
    this.getWeatherYahoo(location).then(function(response) {
    // The first runs when the promise resolves, with the request.response
    // specified within the resolve() method.
      location.weather = response;
      location.updatedAt = new Date();
      dispatch(actionCreators.addLocation(location))
      //TODO find a more elegant way of setting the current location
      // to the index of the current item being added
      dispatch(actionCreators.changeLocation(0))
      // The second runs when the promise
      // is rejected, and logs the Error specified with the reject() method.
    }, function(Error) {
      console.log(Error);
    });
    this.props.navigation.goBack()
  }
  onSelectLocation = (index) => {
    const {dispatch} = this.props
    dispatch(actionCreators.changeLocation(index))
    this.props.navigation.goBack()
  }

  //TODO Make own presentational component? Too small?
  renderSearchItem = (location, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.button}
        onPress={() => this.onAddLocation(location.item)}
      >
        <Text style={styles.item}>{location.item.name}</Text>
        <Text style={styles.itemSmall}>{location.item.country} ({location.item.admin1})</Text>
      </TouchableOpacity>
    )
  }
  //TODO Make own presentational component? Too small?
  renderLocationItem = (location, i) => {
    return (
      <View key={i}>
        <TouchableOpacity

          style={styles.button}
          onPress={() => this.onSelectLocation(i)}
        >
          <Text style={styles.item}>{location.name} / {location.country} ({location.admin1})</Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { loading, error, searchResults } = this.state
    const { navigation, locations } = this.props;
    //TODO Make search results own presentational component
    const list = searchResults.length > 0 ? (
      <FlatList
        data={searchResults}
        renderItem={this.renderSearchItem}
        keyExtractor={(item, index) => index.toString()}
      />
    ) : (
      locations.map(this.renderLocationItem)
    );
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true}/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Input
          placeholder={'Type a location, then hit enter!'}
          onSearch={this.onSearchDelayed}
        />
        {list}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  button: {
    padding: 10,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
  },
  item: {
    fontSize: 21,
  },
  itemSmall: {
    fontSize: 16,
    color: '#777777'
  },
})

export default connect(mapStateToProps)(LocationsScreen)
