import React from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { actionCreators } from '../redux/locationsRedux'

const mapStateToProps = (state) => ({
  tempUnit: state.tempUnit,
})

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Settings',
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      celsiusChecked: props.tempUnit === 'C',
      fahrenheitChecked: props.tempUnit === 'F'
    }
  }

  onChangeTemperature = (unit) => {
    const {dispatch, navigation} = this.props

    dispatch(actionCreators.changeTemperatureUnit(unit))
    //navigation.goBack()
  }
  render() {
    const {tempUnit} = this.props
      const temperatureButton = tempUnit === 'F' ? (
        <Button
          title="Change to Celsius"
          onPress={() => this.onChangeTemperature('C')}
        />
      ) : (
        <Button
          title="Change to Fahrenheit"
          onPress={() => this.onChangeTemperature('F')}
        />
      )
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 20, marginBottom: 14}}>Current unit: {tempUnit === 'F' ? 'Fahrenheit' : 'Celsius'}</Text>
        {temperatureButton}
      </View>

    );
  }
}

export default connect(mapStateToProps)(SettingsScreen)
