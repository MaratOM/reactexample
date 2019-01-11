import React, {Component} from 'react'
import $ from 'jquery'
import {Steps, InputNumber} from 'antd'

import {formatNumberThousands, parseNumberThousands, formatPlural} from 'app/helpers'

const Step = Steps.Step

const StepIcon = props => {
  return <div>{props.mates}</div>
}

class Calculator extends Component {
  constructor() {
    super()

    this.state = {
      mates: 2,
      sum: 2000,
      total: 0,
      levels: {
        one: {
          mates: 0,
          sum: 0,
          total: 0,
        },
        two: {
          mates: 0,
          sum: 0,
          total: 0,
        },
        three: {
          mates: 0,
          sum: 0,
          total: 0,
        },
        four: {
          mates: 0,
          sum: 0,
          total: 0,
        },
        five: {
          mates: 0,
          sum: 0,
          total: 0,
        },
      }
    }

    this.setMates = this.setMates.bind(this)
    this.setSum = this.setSum.bind(this)
    this.calculate = this.calculate.bind(this)
  }

  componentDidMount() {
    this.calculate()
  }
  
  async setMates(value) {
    if(value === 1) {
      $('.ant-steps-vertical > .ant-steps-item > .ant-steps-item-tail').css('margin-left', '-5px')
    }
    else {
      $('.ant-steps-vertical > .ant-steps-item > .ant-steps-item-tail').css('margin-left', '-2px')
    }
    await this.setState({mates: value && value > 0 ? value : 0})
    this.calculate()
  }

  async setSum(value) {
    await this.setState({sum: value && value > 0 ? value : 0})
    this.calculate()
  }

  calculate() {
    const matesCount =  this.state.mates
    const sum =  this.state.sum
    let total = 0
    const percents = [5, 4, 3, 2, 1]
    const mates = []
    const sums = []
    const totals = []

    for(let i = 0; i < 5; i++) {
      let mateTotal
      mates.push(Math.pow(matesCount, i+1))
      sums.push(sum / 100 * percents[i])
      mateTotal = sum / 100 * percents[i] * mates[i]
      totals.push(mateTotal)
      total += mateTotal
    }

    this.setState({
      total,
      levels: {
        one: {
          mates: mates[0],
          sum: sums[0],
          total: totals[0],
        },
        two: {
          mates: mates[1],
          sum: sums[1],
          total: totals[1],
        },
        three: {
          mates: mates[2],
          sum: sums[2],
          total: totals[2],
        },
        four: {
          mates: mates[3],
          sum: sums[3],
          total: totals[3],
        },
        five: {
          mates: mates[4],
          sum: sums[4],
          total: totals[4],
        },
      }
    })
  }

  formatMatesImenit(sum) {
    return formatPlural(sum, ['подружка', 'подружки', 'подружек'])
  }

  formatMatesVinit(sum) {
    return formatPlural(sum, ['подружке', 'подружки', 'подружек'])
  }

  formatRubles(sum) {
    return formatPlural(sum, ['рубль', 'рубля', 'рублей'])
  }

  render() {
    const steps = Object.keys(this.state.levels).map((key, index) => {
      const percents = [5, 4, 3, 2, 1]

      return <Step
        key={index}
        status='finish'
        icon={<StepIcon mates={formatNumberThousands(this.state.levels[key].mates)}/>}
        title={` ${this.formatMatesImenit(this.state.levels[key].mates)} по ${formatNumberThousands(this.state.levels[key].sum)} (${percents[index]}% от ${formatNumberThousands(this.state.sum)}) = ${formatNumberThousands(this.state.levels[key].total)}`}
        description={`${index + 1}я линия`}
      />
    })

    return <div className='col-12 calculator'>
      <h2>Калькулятор</h2>
      <Steps direction='vertical'  className='col-6'>
        {steps}
      </Steps>
      <div className='col-6 calculate'>
        <div>
          Вы и каждая из ваших подружек пригласили по<br/>
          <InputNumber
            defaultValue={this.state.mates}
            step={1}
            min={1}
            formatter={value => formatNumberThousands(value)}
            parser={value => parseNumberThousands(value)}
            onChange={this.setMates}
        /> {this.formatMatesVinit(this.state.mates)}
        </div>
        <div>
          Каждая из ваших подружек тратит на услуги салонов по<br/>
          <InputNumber
            defaultValue={this.state.sum}
            step={100}
            min={100}
            formatter={value => formatNumberThousands(value)}
            parser={value => parseNumberThousands(value)}
            onChange={this.setSum}
          /> {this.formatRubles(this.state.sum)} в месяц
        </div>
        <div>
          Вы получаете <span className='total'>{formatNumberThousands(this.state.total)}</span> понов в месяц (1 пон = 1 рубль) и можете в любое время тратить их на любые услуги наших партнёрских салонов, оплачивая ими до 100% стоимости
        </div>
      </div>
      <div className='clear-both'/>
    </div>
  }
}

export default Calculator
