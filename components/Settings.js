import React from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { actionCreators } from '../redux/locationsRedux'

const mapStateToProps = (state) => ({
  tempUnit: state.tempUnit,
})

class SettingsScreen extends React.Component {

  onChangeTemperature = (unit) => {
    const {dispatch, navigation} = this.props

    dispatch(actionCreators.changeTemperature(unit))
    //navigation.goBack()
  }

  render() {
    const {tempUnit} = this.props
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
        <Text>Current unit: {tempUnit}</Text>
        <Button
          title="Change to F"
          onPress={() => this.onChangeTemperature('F')}
        />
        <Button
          title="Change to C"
          onPress={() => this.onChangeTemperature('C')}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(SettingsScreen)
