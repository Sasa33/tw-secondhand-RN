import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as D from '../../definitions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  close: {
    marginRight: -12,
    zIndex: 1,
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})

export type ModalProps<S> = DispatchProp<S> & {
  nav: object
}

class Modal extends React.Component<ModalProps<object>> {
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
          <View style={styles.header}>
            <Icon name="md-close" size={24} style={styles.close} onPress={() => this.onClose(backTo)} />
            <Text style={styles.title}>{title}</Text>
          </View>
          {children}
        </View>
    )
  }
}

const ConnectedModal = connect(
    (state: D.RootState) => ({
      nav: state.nav,
    })
)(Modal)

export const ModalWrapper = (InnerContent, config = null) => props => {
  return (
      <ConnectedModal {...config} {...props}>
        <InnerContent {...props}/>
      </ConnectedModal>
  )
}

export default ConnectedModal