import React, {Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'
import {Card, Icon, Button} from 'antd'

import {userConnectSalon} from 'app/actions/remote'

import {urlResolve, PhoneButton} from 'app/helpers/index'
import Loading from 'app/components/elems/Loading'
import Connect from './Connect'

const {Meta} = Card

class SalonCard extends Component {
  constructor(props) {
    super(props)

    this.starIcon = null
    this.showConnect = !this.props.hideConnect && (this.props.user.roles.includes('ANONYMOUS') || this.props.user.roles.includes('MATE'))
    this.state = {
      key: 'tab1',
      cover: '',
    }
  }

  componentDidMount() {
    if(this.props.salon.avatar.indexOf('default') === -1) {
      const cardWidth = this.card.getBoundingClientRect().width
      let imageThumbDir

      if (cardWidth > 420) {
        imageThumbDir = 670
      }
      else {
        imageThumbDir = 420
      }

      this.cover = <img alt={this.props.salon.name}
                        src={urlResolve(`/images/avatars/thumbnails/${imageThumbDir}/${this.props.salon.adminMid}.jpg`)}/>
    }
    else {
      this.cover = <img alt={this.props.salon.name}
                        src={urlResolve(this.props.salon.avatar)}/>
    }

    this.setState({cover: this.cover})
  }

  clickStarIcon = () => {
    $(this.starIcon)
      .parents('.ant-card-body')
      .siblings('.ant-card-head')
      .find('.ant-tabs-nav')
      .find('.ant-tabs-tab')
      .eq(3)
      .trigger('click')
  }

  onTabChange = key => {
    if(key === 'tab1') {
      this.setState({cover: this.cover})
    }
    else {
      this.setState({cover: ''})
    }
    this.setState({key})
  }

  render() {
    if(typeof this.props.salon === 'undefined') return <Loading/>

    const {name, phone, description, address, metro, site, businesses, schedule, active} = this.props.salon
    const businessItems = businesses.map((item, index) => <li key={index}><Icon type='check' /> {item}</li>)
    const businessList = <ul className='business-list'>{businessItems}</ul>
    const addressStr = address.replace('г Москва, ', '')
    const metroStr = metro.length ? metro.join(', ') : ''

    this.showConnect = this.showConnect && active ? false : this.showConnect

    let siteStr = ''
    if(site && site.indexOf('salonymoskvy') === -1) {
      const siteUrl = site.indexOf('http://') !== -1 && site.indexOf('https://') !== -1 ? 'http://' + site : site
      siteStr = <div><Icon type='global' /><a href={siteUrl} target='_blank'>{name}</a></div>
    }

    const tabList = [{
        key: 'tab1',
        tab: <Icon type='home' />,
      }, {
        key: 'tab2',
        tab: <Icon type='info-circle-o' />,
      }, {
        key: 'tab3',
        tab: <Icon type='bars' />,
      }]
    const contentList = {
      tab1: <div>
          <Icon type='pushpin-o' />{addressStr || 'информации отсутствует'}<br/>
          <Icon type='car' />{metroStr || 'информации отсутствует'}<br/>
          {siteStr}
          <Icon type='schedule' />{schedule || 'информации отсутствует'}<br/>
          {!active && <div>
            <Icon type='close-circle-o' className='red'/><span className='red'>не подключен к сервису</span>
          </div>}
          {this.showConnect &&
            <img
              className='star-icon' src='/images/star.png'
              ref={el => this.starIcon = el}
              onClick={this.clickStarIcon}
              alt='Получи 500 понов на счёт!'
            />
          }
        </div>,
      tab2: <div>{description || 'Описание отсутствует'}</div>,
      tab3: <div>{businessItems.length ? businessList : 'Информация отсутствует'}</div>,
    }

    if(this.showConnect) {
      tabList.push({
        key: 'tab4',
        tab: <Icon type='link' />,
      })

      contentList['tab4'] = <div>
          <Connect
            user={this.props.user}
            sid={this.props.salon.sid}
            userConnectSalon={this.props.userConnectSalon}
          />
        </div>
    }

    return  <div ref={el => this.card = el}>
              <Card
                hoverable={true}
                tabList={tabList}
                defaultActiveTabKey='tab1'
                onTabChange={key => this.onTabChange(key)}
                cover={this.state.cover}
                actions={[<Button type='primary'><PhoneButton phone={phone}/></Button>]}
              >
                <Meta
                  title={name}
                />
                {contentList[this.state.key]}
              </Card>
            </div>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {
  userConnectSalon,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalonCard)
