import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import {Upload, Icon, message} from 'antd'

import {addAvatar} from 'app/actions/local'
import {urlResolve} from 'app/helpers'

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('Можно загружать только JPG файлы!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Файл не может быть больше 2MB!')
  }
  return isJPG && isLt2M
}

class AvatarUpload extends Component {
  state = {
    imageUrl: urlResolve(this.props.user.avatar),
    loading: false,
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      const imageUrl = urlResolve(info.file.response.avatar)
      this.setState({
        imageUrl,
        loading: false,
      })
      this.props.addAvatar(info.file.response)
    }
  }

  render() {
    const uploadButton = (
      <Fragment>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Загрузить</div>
      </Fragment>
    )

    return (
        <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            headers={{'Authorization': this.props.user.token}}
            action={urlResolve('users/avatar/' + this.props.user.mateId)}
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
        >
          {this.state.imageUrl
            ? <img src={this.state.imageUrl} width='100px' height='100px' alt='' />
            : uploadButton}
        </Upload>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {
  addAvatar,
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUpload)