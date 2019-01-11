import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {AutoComplete} from 'antd'

import {findSalon, fetchSalonsByName, fetchSalonsList} from 'app/actions/remote'

import ChooseSalonForm from 'app/components/forms/ChooseSalonForm'
import Gallery from './Gallery'

class Salons extends Component {
  constructor(props) {
    super(props)

    /* state is for byNmae type, byMetro gets data from props (redux state) */
    this.state = {
      dataSource: [],
      salons: [],
      current: 1,
      total: null,
    }

    switch(this.props.type) {
      case 'byMetro':
        this.fetchSalonsList = this.props.fetchSalonsList
        this.fetchSalonsList()
        break
      case 'byName':
        this.fetchSalonsList = this.props.fetchSalonsByName
        break
      default:
        break
    }
  }

  onSearch = async (value) => {
    if(value.length > 2) {
      const result = await this.props.findSalon(value)
      if (result.status === 200) {
        this.setState({
          dataSource: result.data || [],
        })
      }
    }
    else {
      this.setState({
        dataSource: [],
        salons: [],
      })
    }
  }

  onSelect = async value => {
    const result = await this.props.fetchSalonsByName(value)
    if(result.status === 200) {
      const {current, total, salons} = result.data
      this.setState({current, total, salons})
    }
  }

  onChange = value => {
    if(!value) {
      this.setState({
        dataSource: [],
        salons: [],
      })
    }
  }

  render() {
    let form
    let current
    let total
    let salons

    switch(this.props.type) {
      case 'byMetro':
        form = <ChooseSalonForm
          filterSalons={this.fetchSalonsList}
          filters={this.props.salons.filters}
        />
        current = this.props.salons.current
        total = this.props.salons.total
        salons=this.props.salons.salons
        break
      case 'byName':
        form = <div className='find-salon-wrapper'>
          <AutoComplete
            allowClear={true}
            dataSource={this.state.dataSource}
            onChange={this.onChange}
            onSelect={this.onSelect}
            onSearch={this.onSearch}
            placeholder='Название салона'
          />
        </div>
        current = this.state.current
        total = this.state.total
        salons=this.state.salons
        break
      default:
        break
    }

    return <Fragment>
      {form}
      <Gallery
        current={current}
        total={total}
        salons={salons}
        fetchSalonsList={this.fetchSalonsList}
      />
      <div className='clear-both'/>
    </Fragment>
  }
}

const mapStateToProps = state => ({
  salons: state.salons,
})

const mapDispatchToProps = {
  findSalon,
  fetchSalonsByName,
  fetchSalonsList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Salons)