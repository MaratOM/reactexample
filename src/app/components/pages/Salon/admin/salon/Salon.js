import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SubmissionError} from 'redux-form'
import {message} from 'antd'
import R from 'ramda'

import {addSalon, updateSalon} from 'app/actions/remote'
import MoscowMetroData from 'app/components/forms/data/MoscowMetro.json'
import SalonForm from 'app/components/forms/SalonForm'

class Salon extends Component {
  constructor() {
    super()
    this.state = {
      submitButtonLoading: false,
    }
  }

  submit = values => {
    if(!values || !this.props.user || this.props.user.type !== 'salon') {
      this.props.history.push('/')
    }

    this.setState({submitButtonLoading: true})
    const salonData = {...values}
    let handleSalon

    salonData.phone = salonData.phone.replace( /[ ()]/g, '')
    delete salonData.avatar

    const moscowMetroStations = R.uniq(MoscowMetroData.map(item => item.Name))
    salonData.metro = salonData.metro.reduce((stations, station) => {
      if(moscowMetroStations.includes(station)) {
        stations.push(station)
      }
      return stations
    }, [])

    const operation = typeof this.props.salon === 'undefined' || !Object.keys(this.props.salon).length
      ? 'adding'
      : 'updating'

    if(operation === 'adding') {
      salonData.user_id = this.props.user._id
      salonData.adminMid = this.props.user.mateId
      handleSalon = this.props.addSalon
    }
    else if(operation === 'updating') {
      salonData._id = this.props.salon._id
      handleSalon = this.props.updateSalon
    }

    return handleSalon(salonData)
      .then((result) => {
        this.setState({submitButtonLoading: false})

        if(result.status !== 200) {
          throw new SubmissionError(result.data)
        }
        else {
          if(operation === 'adding') {
            message.success('Салон добавлен! Спасибо!')
            this.props.history.push('/howto')
          }
          else if(operation === 'updating') {
            message.success('Данные салона обновлены!')
          }
        }
      })
      .catch(e => {
        throw new SubmissionError(e.errors)
      })
  }

  render() {
    return <SalonForm
      salon={this.props.salon}
      onSubmit={this.submit}
      submitButtonLoading={this.state.submitButtonLoading}
    />
  }
}

const mapStateToProps = state => ({
  user: state.user,
  salon: state.salon,
})

const mapDispatchToProps = {
  addSalon,
  updateSalon,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Salon))
