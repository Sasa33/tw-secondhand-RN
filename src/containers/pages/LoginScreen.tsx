import * as React from 'react'
import { StyleSheet, View, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button } from '../../components/'
import { connect, DispatchProp } from 'react-redux'
import { ModalWrapper } from '../layout/Modal'
import { LoaderWrapper } from '../layout/Loader'
import { userLogin } from '../../modules/user/actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'space-between',
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
    marginVertical: 20,
  }
})

const buttonStyle = {
  marginVertical: 30,
  width: 250,
}

export type LoginProps<S> = DispatchProp<S> & {
}

const avatar = require('../../assets/profile.png')

class LoginScreen extends React.Component<LoginProps<object>> {
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
          <Button
            title="登录"
            buttonStyle={buttonStyle}
            onPress={() => this.props.dispatch(userLogin(
              {
                username, password,
              },
              {
                referer,
              }))
            }
          />
          <Button
            title="注册"
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

export default LoaderWrapper(
  ModalWrapper(connect()(LoginScreen), {
    backTo: 'homeStack',
    title: '登录'
  }))