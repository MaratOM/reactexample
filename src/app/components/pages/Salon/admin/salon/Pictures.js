import React, {Component} from 'react'
import { Upload, Icon, Modal, message } from 'antd'

import {urlResolve} from 'app/helpers'

class Pictures extends Component {
  constructor(props) {
    super(props)

    const fileList = this.props.pictures.map((url, i) => ({
      uid: -i,
      name: url.substr(url.lastIndexOf('/') + 1),
      status: 'done',
      url: urlResolve(url),
    }))

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: fileList,
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = function({file, fileList}) {
    if(file.response && file.response.message && file.response.message === 'file exists') {
      message.error('Файл с таким названием уже добавлен!')
      fileList.pop()
      this.setState({ previewVisible: false })
    }
    else {
      if (file.response) {
        this.props.placeSalonData(file.response)
      }

      this.props.setPicturesTab()
      this.setState({fileList})
    }
  }

  async handleRemove(file) {
    await this.props.deleteSalonPicture({
      sid: this.props.sid,
      url: file.url,
    })

    this.props.setPicturesTab()
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state

    const uploadButton = (
        <div>
          <Icon type='plus' />
          <div className='ant-upload-text'>Загрузить</div>
        </div>
    )
    return (
        <div className='clearfix'>
          <Upload
              headers={{'Authorization': this.props.token}}
              action={urlResolve('/salons/file/' + this.props.sid)}
              listType='picture-card'
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange.bind(this)}
              onRemove={this.handleRemove.bind(this)}
          >
            {fileList.length >= 30 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
    )
  }
}

export default Pictures