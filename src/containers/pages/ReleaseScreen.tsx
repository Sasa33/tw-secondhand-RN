import * as React from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { Button } from '../../components/'
import * as D from '../../definitions'
import { StyleSheet } from 'react-native'
import { width } from 'react-native-dimension'
import { LoginChecker } from '../layout/CheckLogin'
import { ModalWrapper } from '../layout/Modal'
import { LoaderWrapper } from '../layout/Loader'
import { uploadProductImage, createProduct } from '../../modules/product/actions'
import { ImagePicker } from 'expo';

const  styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
    marginVertical: 20,
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10
  },
  uploadContainer: {
    flex: 1,
    marginBottom: 20,
  },
  previewImage: {
    width: width(80),
    height: 100,
  },
  uploadContent: {
    backgroundColor: '#FAF7F7',
    flex: 1,
    width: width(100),
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  uploadImage: {
    width: 50,
    height: 50
  },
  uplaodedImage: {
    marginTop:10,
    width: width(80)
  },
  productDetail: {
    flex: 2,
    alignItems: 'center',
  },
  productDesc: {
    borderWidth: 1,
    height: 100
  },
})

const buttonStyle = {
  marginVertical: 30,
  width: 250,
}

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
    this.setState({ [name]: e.nativeEvent.text })
  }

  handleUploadImage = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    }).then(response => {
      if (response.cancelled) {
        console.log("give up choose image");
      } else if (response.uri) {
        dispatch(uploadProductImage({
           uri: response.uri,
           type: 'multipart/form-data',
           name: response.uri
        }))
      }
    });
  }

  handleSubmit = (imageUrl) => (e) => {
    const { dispatch } = this.props
    const { name, price, description } = this.state
    dispatch(createProduct({
          name,
          price,
          description,
          img: imageUrl,
        }
    ))
  }

  render() {
    const { imageUrl } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleUploadImage} style={styles.uploadContainer}>
        {imageUrl.toString() !== ''
            ? <Image style={[styles.uploadContent, styles.uplaodedImage]}  source={{uri: imageUrl}} />
            : (<View style={styles.uploadContainer}>
              <View style={styles.uploadContent}>
                <Text>点击上传图片</Text>
                <Image style={styles.uploadImage} source={require('../../assets/arrow_up_upload.png')} />
              </View>
            </View>)}
          </TouchableOpacity>
        <View style={styles.productDetail}>
          <TextInput style={styles.input} placeholder="商品名称" onChange={this.changeTextState('name')} />
          <TextInput style={styles.input} placeholder="售价￥" onChange={this.changeTextState('price')} />
          <TextInput
            style={[styles.input, styles.productDesc]}
            placeholder="添加描述..."
            multiline={true}
            onChange={this.changeTextState('description')}
          />
          <Button
              title="开始出售"
              buttonStyle={buttonStyle}
              onPress={this.handleSubmit(imageUrl)}
          />
        </View>
      </View>
    )
  }
}


export default LoaderWrapper(
  LoginChecker(
    ModalWrapper(connect(
    (state: D.RootState) => ({
        imageUrl: state.products.imageUrl,
    }))(ReleaseScreen),
    {
      title: '发布宝贝'
    }),
    {
      referer: 'release'
    }
  )
)