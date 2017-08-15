import React from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, StyleSheet,  View } from 'react-native'

interface LoaderProps {
  loading?: boolean
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    position: 'absolute',
    marginTop: 220,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
})

const Loader = (props: LoaderProps) => {
  const { loading, children } = props

  return (
      <View style={styles.container}>
        {
          loading ? (
              <View style={styles.loader} >
                <ActivityIndicator size="large" color="gold"/>
              </View>
          ) : null
        }
        {children}
      </View>
  )
}

const ConnectedLoader = connect(state => ({
  loading: state.loading,
}))(Loader)

export const LoaderWrapper = InnerContent => props => (
    <ConnectedLoader {...props} >
      <InnerContent {...props} />
    </ConnectedLoader>
)

export default ConnectedLoader
