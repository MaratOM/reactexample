import React, {Component} from 'react'

class Tree extends Component {
  render() {
    return <div className='col-12 tree' id='tree'>
      <h2>Подружки</h2>
      <div className='girls-tree'>
        <img src='/images/frontpage/girls_tree.png' alt='Дерево подружек'/>
      </div>
      <div className='description'>
        <div><span className='purple'>Таня</span> и <span className='purple'>Света</span> при регистрации ввели Ваш ID<img className='upline-id' src='./images/frontpage/upline_id.jpg' alt='ID подружки'/>Они - Ваша <span className='pink'>1я линия,</span> со всех их покупок Вы получаете <span className='pink'>5%</span></div>
        <div><span className='purple'>Наташа</span> и <span className='purple'>Ульяна</span> ввели ID Тани, а <span className='purple'>Марина</span> - Светы - это Ваша <span className='pink'>2я линия</span>, со всех покупок Наташи, Ульяны и Тани Вы получаете <span className='pink'>4%</span></div>
        <div><span className='purple'>Саша</span> ввела ID Наташи, а <span className='purple'>Мила</span> - Марины - конечно, это <span className='pink'>3я линия</span> и с неё Вы получаете <span className='pink'>3%</span></div>
        <div><span className='purple'>Надя, Лена, Юля</span> - <span className='pink'>4я линия</span> - и это <span className='pink'>2%</span></div>
        <div>Ну, и <span className='purple'>Марго</span> - <span className='pink'>5я</span> - <span className='pink'>1%</span></div>
        <div>На каждой линии у Вас может быть сколько угодно подружек.<br/><span className='pink'>Ограничений нет!</span></div>
      </div>
      <div className='clear-both'/>
    </div>
  }
}

export default Tree
