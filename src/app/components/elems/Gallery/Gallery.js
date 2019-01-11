import React, {Component} from 'react'
import {Pagination} from 'antd';

import SalonCard from 'app/components/pages/Salon/about/SalonCard'

class Gallery extends Component {
  async paginate(current) {
    await this.props.fetchSalonsList(current)
    window.scrollTo({
      top: this.galleryTop.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth'
    })
  }

  render() {
    let salons = this.props.salons || []
    const pagination =       <Pagination
        current={this.props.current || 1}
        defaultCurrent={this.props.current || 1}
        pageSize={12}
        total={this.props.total}
        onChange={current => this.paginate(current)}
    />

    salons = salons.map((salon, index) => <div key={salon.sid} className='salon-card'>
        <SalonCard salon={salon} hideConnect={this.props.hideConnect || false}/>
      </div>)

    return <div className='gallery' ref={el => this.galleryTop = el}>
      {pagination}
      <div className={salons.length === 0 ? 'no-data' : undefined}>
        {salons.length ? salons : 'По данному запросу салонов не найдено'}
      </div>
      <div className='clear-both'/>
      {pagination}
    </div>
  }
}

export default Gallery
