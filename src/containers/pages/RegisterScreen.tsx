import * as React from 'react'
import { StyleSheet, View, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button } from '../../components/'
import { connect, DispatchProp } from 'react-redux'
import { ModalWrapper } from '../layout/Modal'

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-around',
  },
  textInput: {
    marginVertical: 20,
    width: 250,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  img: {
    width: 100,
    height: 100,
    marginVertical: 30,
  }
})

const buttonStyle = {
  marginVertical: 30,
  width: 250,
}

export type RegisterProps<S> = DispatchProp<S> & {
}

const avatar = require('../../assets/profile.png')

class RegisterScreen extends React.Component<RegisterProps<object>> {
  state = {
    username: '',
    password: '',
  }

  render() {
    const { referer } = this.props.navigation.state.params || {}
    const { username, password } = this.state

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={avatar} style={styles.img} />
          <TextInput
            style={styles.textInput}
            value={username}
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="用户名"
            onChangeText={text => {this.setState({ username: text })}}
          />
          <TextInput
            style={styles.textInput}
            value={password}
            keyboardType="default"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => {this.setState({ password: text })}}
            placeholder="密码"
          />
          <TextInput
            style={styles.textInput}
            value={password}
            keyboardType="default"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => {this.setState({ password: text })}}
            placeholder="确认密码"
          />
          <Button
            title="Register"
            buttonStyle={buttonStyle}
            onPress={() => {
              this.props.navigation.navigate('register')
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ModalWrapper(connect()(RegisterScreen), {
  backTo: 'loginStack',
  title: '注册'
})