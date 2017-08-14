import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'
import * as D from '../../definitions'

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  button: {
    position: 'absolute',
    left: 10,
    top: 0,
    width: 20,
    height: 40,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  }
})

export type ModalProps<S> = DispatchProp<S> & {

}

class MyModal extends React.Component<ModalProps<object>> {
  onClose(target: string) {
    this.props.navigation.goBack(null)
    if (target && target.startsWith('home')) {
      this.props.navigation.navigate(target)
    }
  }

  render() {
    const { children, backTo, title } = this.props

    return (
        <View style={styles.container}>
          <Button
              title="X"
              style={styles.button}
              onPress={() => this.onClose(backTo)}
          />
          <Text style={styles.title}>{title}</Text>
          {children}
        </View>
    )
  }
}

const ConnectedModal = connect(
    (state: D.RootState) => ({
      user: state.user,
      nav: state.nav,
    })
)(MyModal)

export const ModalWrapper = (InnerContent, config = null) => props => {
  return (
      <ConnectedModal {...config} {...props}>
        <InnerContent {...props}/>
      </ConnectedModal>
  )
}

export default ConnectedModal