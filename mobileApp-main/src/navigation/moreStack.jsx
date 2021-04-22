import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import More from 'screens/More';
import CryptoHomepage from 'screens/CryptoHomepage';
import WithdrawalSavedPhoneNumbers from 'screens/WithdrawalSavedPhoneNumbers';

import MainHeader from 'components/MainHeader';

const MoreStack = createStackNavigator();

function MoreScreens() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="More"
        component={More}
        options={{ header: () => null }}
      />
      <MoreStack.Screen
        name="WithdrawalSavedPhoneNumbers"
        component={WithdrawalSavedPhoneNumbers}
        options={{
          title: 'Withdrawal',
          subTitle: 'Choose mobile number you will withdraw to',
          header: (props) => <MainHeader {...props} />,
        }}
      />
      <MoreStack.Screen
        name="CryptoHomepage"
        component={CryptoHomepage}
        options={{ header: () => null }}
      />
    </MoreStack.Navigator>
  );
}

export default MoreScreens;
