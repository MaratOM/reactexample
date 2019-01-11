import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Modal, Avatar, message} from 'antd'

import {fetchSalon} from 'app/actions/remote'
import {urlResolve} from 'app/helpers'

import SalonCard from './SalonCard'

class Salon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      confirmLoading: false,
      salon: {},
    }
  }

  showModal = () => {
    this.props.fetchSalon(this.props.sid)
      .then(result => {
        if(result && result.status === 200) {
          this.setState({
            visible: true,
            salon: result.data,
          })
        }
        else {
          message.error('Что-то пошло не так! Попробуйте, пожалуйста, позже.')
        }
      })
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  render() {
    return <Fragment>
      <div>
        <Avatar
          style={{cursor: 'pointer'}}
          src={urlResolve(this.props.avatar)}
          onClick={this.showModal}
        /><br/>
        {this.props.name}
      </div>
      <Modal
        className='salon-card'
        title={null}
        visible={this.state.visible}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
        footer={null}
      >
        <SalonCard salon={this.state.salon}/>
      </Modal>
    </Fragment>
  }
}

const mapDispatchToProps = {
  fetchSalon,
}

export default connect(null, mapDispatchToProps)(Salon)
