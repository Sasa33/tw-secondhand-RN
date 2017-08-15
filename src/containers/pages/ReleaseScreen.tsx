import * as React from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import * as D from '../../definitions'
import { StyleSheet } from 'react-native'
import { width } from 'react-native-dimension'
import { LoginChecker } from '../layout/CheckLogin'
import { ModalWrapper } from '../layout/Modal'
import { LoaderWrapper } from '../layout/Loader'

 const  styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    fontSize: 16,
    width: width(80),
    marginBottom: 20
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10
  },
  uploadContainer: {
    flex: 1
  },
  uploadContent: {
    backgroundColor: '#FAF7F7',
    flex: 1,
    width: width(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadImage: {
    width: 50,
    height: 50
  },
  productDetail: {
    flex: 2,
    alignItems: 'center'
  },
  productDesc: {
    borderWidth: 1,
    height: 150
  },
  releaseBtnContainer: {
    flex: 1
  },
  releaseBtn: {
    marginTop:35,
    width: 200
  }
})

type ReleaseScreenProps<S> = DispatchProp<S> & {
  user: D.UserState
  imageUrl: string
}

interface State {
  name: string
  price: string
  description: string
}

class ReleaseScreen extends React.Component<ReleaseScreenProps<object>, State> {
  constructor(props: ReleaseScreenProps<object>) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: ''
    }
  }

  changeTextState = name => e => {
    this.setState({ [name]: e.target.value })
  }

  render() {
    return (
      <View style={styles.container}>
        {<View style={styles.uploadContainer}>
              <View style={styles.uploadContent}>
                <Text>点击上传图片</Text>
                <Image style={styles.uploadImage} source={require('../../assets/arrow_up_upload.png')} />
              </View>
            </View>}
        <View style={styles.productDetail}>
          <TextInput style={styles.input} placeholder="商品名称" onChange={this.changeTextState('name')} />
          <TextInput style={styles.input} placeholder="售价￥" onChange={this.changeTextState('price')} />
          <TextInput
            style={[styles.input, styles.productDesc]}
            placeholder="添加描述..."
            multiline={true}
            onChange={this.changeTextState('description')}
          />
        </View>
        <View style={styles.releaseBtnContainer}>
          <Button
            backgroundColor="#FAE05E"
            color="black"
            fontWeight="bold"
            fontSize={14}
            buttonStyle={styles.releaseBtn}
            title="开始出售"
            onPress={() => {
              
            }}
          />
        </View>
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