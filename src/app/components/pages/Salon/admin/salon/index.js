import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Tabs, Icon, Steps} from 'antd'

import {deleteSalonPicture} from 'app/actions/remote'
import {placeSalonData} from 'app/actions/local'
import access from 'app/access'

import AccessDenied from 'app/components/pages/AccessDenied'
import NotFound from 'app/components/pages/NotFound'
import Loading from 'app/components/elems/Loading'
import Salon from './Salon'
import Pictures from './Pictures'
import Page from 'app/components/layouts/Page'

const Step = Steps.Step
const Tab = Tabs.TabPane

class SalonAdminSalon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
    }
  }

  componentWillMount() {
    this.setState({activeTab: this.props.match.params.tabId})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({activeTab: nextProps.match.params.tabId})
  }

  componentDidMount() {
    this.setState({activeTab: this.props.match.params.tabId})
  }

  clickTab(tabKey) {
    this.setState({activeTab: tabKey})
  }

  setPicturesTab() {
    this.setState({activeTab: '2'})
  }

  render() {
    if(!access.isGranted(this.props.user.roles, 'SalonAdminSalon')) {
      return <AccessDenied/>
    }


    if(+this.props.match.params.tabId > 2) {
      return <NotFound/>
    }

    if(!this.props.user){
      return <Loading/>
    }

    const steps = !Object.keys(this.props.salon).length &&
      <Fragment>
        <Steps>
          <Step status='finish' title='Регистрация администратора' icon={<Icon type='user' />} />
          <Step status='finish' title='Добавление данных салона' icon={<Icon type='solution' />} />
          <Step status='wait' title='Готово' icon={<Icon type='smile-o' />} />
        </Steps>
        <hr/>
      </Fragment>

    return <Page>
      <div className='container'>
        <div className='row content' id='content'>
          <div className='col-12'>
            <h2><Icon type='idcard' /> Салон</h2>
            {steps}
            <Tabs activeKey={this.state.activeTab || '1'} onTabClick={(e) => this.clickTab(e)}>
              <Tab key='1'  tab={<span><Icon type='info-circle-o' /><span>Инфо</span></span>}>
                <div className='col-12 sample-wrapper'>
                  <Salon/>
                </div>
              </Tab>
              <Tab key='2'  tab={<span><Icon type='picture' /><span>Фото</span></span>}>
                <div className='col-12 sample-wrapper'>
                  <Pictures
                      setPicturesTab={this.setPicturesTab.bind(this)}
                      pictures={this.props.salon.pictures}
                      token={this.props.user.token}
                      sid={this.props.salon.sid}
                      placeSalonData={this.props.placeSalonData}
                      deleteSalonPicture={this.props.deleteSalonPicture}
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Page>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  salon: state.salon,
})

const mapDispatchToProps = {
  placeSalonData,
  deleteSalonPicture,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalonAdminSalon)
