import React, {Component} from 'react'
import {Button} from 'antd'

class Banner extends Component {
  render() {
    return <div className='col-12 banner'>
      <div className='text-wrapper'>
        <div className='text'>
          <p>Увеличьте поток клиентов!</p>
          <p>Удвойте доход!</p>
          <p>За ваших клиенток заплатят подружки!</p>
          <a href='#join'>
            <Button type='primary'>Добавить салон</Button>
          </a>
        </div>
      </div>
      <img src='/images/frontpage/banner-salons.jpg' alt='Подружки.онлайн'/>
    </div>
  }
}

export default Banner
