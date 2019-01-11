import React, {Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {Steps, Icon} from 'antd'

const Step = Steps.Step

const StepTitle = props => props.text

class FrontSteps extends Component {
  constructor() {
    super()

    this.state = {
      direction: 'horizontal'
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setDirection.bind(this))
    this.setDirection()
  }

  setDirection() {
    if(window.innerWidth < 1000) {
      this.setState({direction: 'vertical'})
    }
    else {
      this.setState({direction: 'horizontal'})
    }
  }

  render() {
    return <div className='col-12 steps'>
      <h2>Меньше платить просто!</h2>
      <Steps direction={this.state.direction}>
        <Step
          status='finish'
          title='Регистрируетесь'
          description={<StepTitle text={<span><Link to='/sign/2'>Зарегистрируйтесь</Link> с промокодом и получите <span className='pink'>50</span> понов на счёт (1 пон = 1 рубль)</span>}/>}
          icon={<Icon type='user' />}
        />
        <Step
            status='finish'
            title='Приглашаете подружек'
            description={<StepTitle text={<span>Ваши подруги укажут при регистрации ваш ID и вы будете получать <span className='pink'>проценты</span> со всех их покупок.
              А также с покупок их подруг и с подруг их подруг.
              И так на <span className='pink'>5 уровней</span>.</span>}/>}
            icon={<Icon type='team' />}
        />
        <Step
            status='finish'
            title='Расплачиваетесь понами'
            description={<StepTitle text={<span>Любые услуги в наших салонах-партнёрах вы сможете <span className='pink'>оплачивать накопленными понами</span>.
              Любую их часть, вплоть до полной суммы. Поны - это наша внутренняя валюта, 1 пон = 1 рубль.</span>}/>}
            icon={<Icon type='wallet' />}
        />
      </Steps>
    </div>
  }
}

export default FrontSteps
