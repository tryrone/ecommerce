import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AirtimeSavedPhoneNumbers from 'screens/AirtimeSavedPhoneNumbers';
import MainHeader from 'components/MainHeader';

const AirtimeStack = createStackNavigator();

function AirtimeScreens() {
  return (
    <AirtimeStack.Navigator
      screenOptions={{
        header: (props) => <MainHeader {...props} />,
      }}
    >
      <AirtimeStack.Screen
        name="AirtimeSavedPhoneNumbers"
        component={AirtimeSavedPhoneNumbers}
        options={{
          title: 'AirTime',
          subTitle: 'Choose mobile number you will buy AirTime from',
        }}
      />
    </AirtimeStack.Navigator>
  );
}

export default AirtimeScreens;
