import React, {Component} from 'react'
import {Icon} from 'antd'

class Beginning extends Component {
  render() {
    return <div className='col-12 beginning'>
      <h2>Это начало!</h2>
      <div className='col-12 description'>
        Подружки.онлайн - очень молодой проект, призванный сделать услуги салонов красоты намного более доступными.<br/>
        Мы в самом начале пути. У этого есть как плюсы, так и минусы.<br/>
        Но плюсов больше:)<br/>
      </div>
      <div className='col-6 minuses'>
        <h3><Icon type='minus-circle' theme='outlined' /></h3>
        <ul>
          <li><Icon type='minus' theme='outlined' /> У нас еще мало партнёрских салонов</li>
        </ul>
      </div>
      <div className='col-6 pluses'>
        <h3><Icon type='plus-circle' theme='outlined' /></h3>
        <ul>
          <li><Icon type='plus' theme='outlined' /> У вас больше шансов построить большую структуру</li>
          <li><Icon type='plus' theme='outlined' /> Вы можете получать бонусы за подключение салонов (500 понов за каждый)</li>
          <li><Icon type='plus' theme='outlined' /> У первых всегда особенные привилегии!</li>
        </ul>
      </div>
      <div className='clear-both'/>
    </div>
  }
}

export default Beginning
