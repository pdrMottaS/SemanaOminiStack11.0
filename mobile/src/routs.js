import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from'@react-navigation/stack';

const appRouter=createStackNavigator();

import Incidents from './pages/incidents/index';
import Details from './pages/details/index';

export default function Routes(){
    return(
        <NavigationContainer>
            <appRouter.Navigator screenOptions={{headerShown:false}}>
                <appRouter.Screen name="Incidents" component={Incidents}/>
                <appRouter.Screen name="Details" component={Details}/>
            </appRouter.Navigator>
        </NavigationContainer>
    );
}