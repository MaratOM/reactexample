import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ConnectRedux from './ConnectRedux'

import Sign from 'app/components/pages/Sign'
import SignSalon from 'app/components/pages/SignSalon'
import Balance from 'app/components/pages/Balance'
import Front from 'app/components/pages/Front'
import FrontPageSalons from 'app/components/pages/Front/Salons/'
import Mates from 'app/components/pages/Mates'
import Profile from 'app/components/pages/Profile'
import Salons from 'app/components/pages/Salons'
import SalonAdminSalon from 'app/components/pages/Salon/admin/salon'
import HowTo from 'app/components/pages/Howto'
import SalonAdminClients from 'app/components/pages/Salon/admin/clients'
import SalonAdminReceipts from 'app/components/pages/Salon/admin/receipts'
import SalonAdminBills from 'app/components/pages/Salon/admin/bills'
import SalonAbout from 'app/components/pages/Salon/about'
import Admin from 'app/components/pages/Admin'
import NotFound from 'app/components/pages/NotFound'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'app/assets/css/burger-menu.css'
import 'app/assets/less/media.less'
import 'app/assets/less/styles.less'
import 'app/assets/less/bright.less'
import 'app/assets/less/frontpage.less'

ReactDOM.render(
    <ConnectRedux>
      <Router>
        <Switch>
          <Route exact path='/' component={Front}/>
          <Route exact path='/front' component={Front}/>
          <Route exact path='/front/salons' component={FrontPageSalons}/>
          <Route exact path='/sign' component={Sign}/>
          <Route path='/sign/verify/:type/:code' component={Sign}/>
          <Route path='/sign/:tabId' component={Sign}/>
          <Route path='/signout' component={Sign}/>
          <Route path='/sign-salon' component={SignSalon}/>
          <Route exact path='/balance' component={Balance}/>
          <Route path='/balance/:tabId' component={Balance}/>
          <Route path='/mates' component={Mates}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/salons' component={Salons}/>
          <Route exact path='/salon/admin/salon' component={SalonAdminSalon}/>
          <Route path='/salon/admin/salon/:tabId' component={SalonAdminSalon}/>
          <Route path='/howto' component={HowTo}/>
          <Route exact path='/salon/admin/receipts' component={SalonAdminReceipts}/>
          <Route path='/salon/admin/receipts/:tabId' component={SalonAdminReceipts}/>
          <Route exact path='/salon/admin/bills' component={SalonAdminBills}/>
          <Route path='/salon/admin/bills/:tabId' component={SalonAdminBills}/>
          <Route path='/salon/admin/clients' component={SalonAdminClients}/>
          <Route path='/salon/:id' component={SalonAbout}/>
          <Route exact path='/admin' component={Admin}/>
          <Route path='/admin/:tabId' component={Admin}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </ConnectRedux>,
    document.getElementById('root')
)
