import React, { Component } from 'react';
import moment from 'moment';
import { View, Button, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actionCreators } from '../redux/locationsRedux'
import PropTypes from 'prop-types'
const Weather = ({location, onUpdate, tempUnit}) => {
  if (location.weather) {
    return (
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
          <Text style={styles.textWhite}>
            Updated: {moment(location.updatedAt).fromNow()}
          </Text>
          <Button
            title="Update"
            onPress={() => onUpdate(location)}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.center}>
        <Text>
          Error getting the weather!
        </Text>
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
  textWhite: {
    color: '#FEFEFE',
    marginBottom: 8,
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

Weather.propTypes = {
  location: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  tempUnit: PropTypes.string.isRequired,
}

export default Weather
