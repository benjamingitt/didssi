import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {AddVCPage, AvailableServices, HomeVCDetailsPage, ServiceDetails, VCDetailsPage} from '../../pages/main';
import {AsideWrapper, Footer} from '../../components';


export const MainRouter = () => {


    return (
        <div>
            <Switch>
                <Route exact path="/service/:id" component={ServiceDetails}/>
                <Route exact path="/vc/:id/add" component={AddVCPage}/>
                <Route exact path="/vc/:id" component={VCDetailsPage}/>

                <AsideWrapper>
                    <Switch>
                        <Route exact path="/home" component={AvailableServices}/>
                        <Route exact path="/home/vc/:id" component={HomeVCDetailsPage}/>
                        <Redirect to={'/home'}/>
                    </Switch>
                </AsideWrapper>
            </Switch>

            <Footer/>
        </div>
    );
};
