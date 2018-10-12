import React from 'react';
import {BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom';
import Main from './pages/Main/Main';
import CustomerList from './pages/CustomerManagement/CustomerList/CustomerList'
import CustomerDetail from './pages/CustomerManagement/CustomerList/CustomerDetail/CustomerDetail';
import TelemarketingManagement from './pages/CustomerManagement/TelemarketingManagement/TelemarketingManagement';
import ExclusiveCustomerServiceManagement from './pages/CustomerManagement/ExclusiveCustomerServiceManagement/ExclusiveCustomerServiceManagement';
import TelemarketingPerformanceManagement from './pages/CustomerManagement/TelemarketingPerformanceManagement/TelemarketingPerformanceManagement';
import CustomerManagement from './pages/CustomerManagement/CustomerManagement/CustomerManagement';
import EcAccountRelation from './pages/CustomerManagement/EcAccountRelation/EcAccountRelation';
import BirthdayQueryManagement from './pages/CustomerManagement/BirthdayQueryManagement/BirthdayQueryManagement';
import ReturnMoney from './pages/CustomerManagement/ClientClass/ReturnMoney';
import WithdrawMoney from './pages/CustomerManagement/ClientClass/WithdrawMoney';
import DiscountCoupon from './pages/CustomerManagement/ClientClass/DiscountCoupon';
import GuardMoney from './pages/CustomerManagement/ClientClass/GuardMoney';
import DueIn from './pages/CustomerManagement/ClientClass/DueIn';
import Wash from './pages/CustomerManagement/ClientClass/Wash';

export default class RootRouter extends React.Component {
    render() {
        return <Router>
            <Switch>
                <Route path="/view/customerManagement" render={(props) =>
                    <Main {...props}>
                    {/* <Redirect from="/view" to="/view/customerManagement/customerList"/> */}
                        <Route path="/view/customerManagement/customerList" render={props => <CustomerList {...props}/>} />
                        <Route path="/view/customerManagement/customerDetail/:id" render={props => <CustomerDetail {...props}/>} />
                        <Route path="/view/customerManagement/telemarketingManagement" render={props => <TelemarketingManagement {...props}/>} />
                        <Route path="/view/customerManagement/exclusiveCustomerServiceManagement" render={props => <ExclusiveCustomerServiceManagement {...props}/>} />
                        <Route path="/view/customerManagement/telemarketingPerformanceManagement" render={props => <TelemarketingPerformanceManagement {...props}/>} />
                        <Route path="/view/customerManagement/customerManagement" render={props => <CustomerManagement {...props}/>} />
                        <Route path="/view/customerManagement/ecAccountRelation" render={props => <EcAccountRelation {...props}/>} />
                        <Route path="/view/customerManagement/birthdayQueryManagement" render={props => <BirthdayQueryManagement {...props}/>} />
                        <Route path="/view/customerManagement/clientclass/returnmoney" render={props => <ReturnMoney {...props}/>} />
                        <Route path="/view/customerManagement/clientclass/withdrawmoney" render={props => <WithdrawMoney {...props}/>} />
                        <Route path="/view/customerManagement/clientclass/discountcoupon" render={props => <DiscountCoupon {...props}/>} />
                        <Route path="/view/customerManagement/clientclass/guardmoney" render={props => <GuardMoney {...props}/>} />
                        <Route path="/view/customerManagement/clientclass/duein" render={props => <DueIn {...props}/>} />
                        <Route path="/view/customerManagement/clientclass/wash" render={props => <Wash {...props}/>} />
                        

                    </Main>}
                />
                <Redirect exact to="/view/customerManagement/customerList"/>
            </Switch>
        </Router>

    }
}
