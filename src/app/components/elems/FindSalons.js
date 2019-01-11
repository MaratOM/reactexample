import React, {Component} from 'react'
import {Tabs, Icon} from 'antd'

import Gallery from './Gallery'

const Tab = Tabs.TabPane

class FindSalons extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: '1',
    }
  }

  clickTab(tabKey) {
    this.setState({activeTab: tabKey})
  }

  render() {
    return <Tabs className='find-salons' activeKey={this.state.activeTab || '1'} onTabClick={(e) => this.clickTab(e)}>
      <Tab className='find' key='1' tab={<span><Icon type='car' /><span>Рядом</span></span>}>
        <Gallery type='byMetro'/>
        <div className='clear-both'/>
      </Tab>
      <Tab className='find' key='2' tab={<span><Icon type='font-colors' theme='outlined' /><span>По названию</span></span>}>
        <Gallery type='byName'/>
      </Tab>
    </Tabs>
  }
}

export default FindSalons
