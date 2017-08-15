import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { LoginChecker } from '../layout/CheckLogin'
import { ModalWrapper } from '../layout/Modal'
import { LoaderWrapper } from '../layout/Loader'

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
})

class ReleaseScreen extends React.Component<DispatchProp<{}>, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is others page</Text>
      </View>
    )
  }
}

export default LoaderWrapper(
  LoginChecker(
    ModalWrapper(connect()(ReleaseScreen), {
      backTo: 'homeStack',
      title: '发布宝贝'
    }),
    {
      referer: 'release'
    }
  )
)