import React from 'react'
import { Button, ButtonProperties } from 'react-native-elements'

const buttonStyle = {
  backgroundColor: 'gold',
  borderRadius: 5,
}

const textStyle = {
  color: '#333',
}

const ThemedButton = (props: ButtonProperties) => (
  <Button {...props} buttonStyle={buttonStyle} textStyle={textStyle} />
)

export default ThemedButton
