import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default class Input extends Component {
  constructor(props) {
    super(props)
    // We add a debounce to be sure the user finish typing
    // before sending the request
    //this.onSearchDelayed = _.debounce(this.props.onSearch, 250)
    this.state = {
      text: ''
    }
  }

  onChangeText = (text) => {
    this.setState({text})
    const {onSearch} = this.props
    if (!text) return
    onSearch(text)
  }
  onSubmitEditing = () => {
    const {onSearch} = this.props
    const {text} = this.state

    if (!text) return // Don't submit if empty

    onSearch(text)
    this.setState({text: ''})
  }

  render() {
    const {placeholder} = this.props
    const {text} = this.state

    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    height: 50,
  },
})
