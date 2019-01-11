import React, {Component} from 'react'
import {Tag, Switch, Icon, Tooltip} from 'antd'

class SwitchIcon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.checked
    }
  }

  onChange(value) {
    this.props.activate({_id: this.props._id, active: value})
      .then(result => {
        if(result.status === 200) {
          this.setState({active: value})
        }
      })
  }

  render() {
    return <Tag color='magenta'>
        <Icon type='link'/>
        <Tooltip title='Это самая главная кнопка, которая подключает Вас к сервису. Когда она выключена, салон появляется в списке с пометкой "не активен" и к вам не приходят клиенты. Вы можете в любой момент включать и выключать её.'>
          <Icon type='question-circle-o' />
        </Tooltip>
        <Switch
          className='number'
          checkedChildren='ПОДКЛЮЧЕНО'
          unCheckedChildren='ОТКЛЮЧЕНО'
          checked={this.state.active}
          onChange={this.onChange.bind(this)}
        />
      </Tag>
  }
}

export default SwitchIcon
