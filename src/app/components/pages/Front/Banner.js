import React, {Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Affix, Button} from 'antd'

class Banner extends Component {
  render() {
    let textSubstitute

    if(this.props.request) {
      if(this.props.request === 'парикмахерских') {
        textSubstitute = 'услуги парикмахерских'
      }
      else if(this.props.request === 'салон') {
        textSubstitute = 'услуги салонов красоты'
      }
      else if(this.props.request === 'брови') {
        textSubstitute = 'оформление бровей'
      }
      else if(this.props.request === 'ногти') {
        textSubstitute = 'ногтевой сервис'
      }
      else {
        textSubstitute = this.props.request
      }
    }
    else {
      textSubstitute = 'услуги салонов красоты'
    }
    return <div className='col-12 banner'>
      <div className='text-wrapper'>
        <div className='text'>
          <p>Платите меньше<br/>за {textSubstitute} и не только!</p>
          <p>Не платите совсем!</p>
          <p>За вас заплатят подружки!</p>
          {this.props.user.roles.includes('ANONYMOUS') &&
            <Affix offsetTop={20}>
              <Link to={this.props.urlParams ? '/sign/2' + this.props.urlParams : '/sign/2'}>
                <Button type="primary">Присоединяйтесь!{this.props.promocode && ` Ваш промокод ${this.props.promocode}`}</Button>
              </Link>
            </Affix>
          }
        </div>
      </div>
      <img src='/images/frontpage/banner.jpg' alt='Подружки.онлайн'/>
    </div>
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Banner)
