import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AddCard from 'screens/AddCard';
import Homepage from 'screens/Homepage';
import DepositMoneyMethods from 'screens/DepositMoneyMethods';
import DepositSavedPhoneNumbers from 'screens/DepositSavedPhoneNumbers';
import SelectCards from 'screens/SelectCards';
import Profile from 'screens/Profile';
import SendMoneyMethod from 'screens/SendMoneyMethod';

import MainHeader from 'components/MainHeader';

const DepositStack = createStackNavigator();

function DepositMoneyScreens() {
  return (
    <DepositStack.Navigator
      screenOptions={{
        header: (props) => <MainHeader {...props} />,
      }}
    >
      <DepositStack.Screen
        name="Homepage"
        component={Homepage}
        options={{ header: () => null }}
      />
      <DepositStack.Screen
        name="DepositMoneyMethods"
        component={DepositMoneyMethods}
        options={{
          title: 'Deposit my Wallet',
          subTitle: 'Choose a deposit method',
        }}
      />
      <DepositStack.Screen
        name="Send"
        component={SendMoneyMethod}
        options={{
          title: 'Send Money',
          subTitle: 'How would you like to send money?',
        }}
      />
      <DepositStack.Screen
        name="SelectCards"
        component={SelectCards}
        options={{
          title: 'Debit Card Deposit',
          subTitle: 'Choose a debit card',
        }}
      />
      <DepositStack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          title: 'Add New Card',
          subTitle: 'Insert your card details',
        }}
      />
      <DepositStack.Screen
        name="DepositSavedPhoneNumbers"
        component={DepositSavedPhoneNumbers}
        options={{
          title: 'Mobile Money Deposit',
          subTitle: 'Choose your mobile number',
        }}
      />
      <DepositStack.Screen
        name="Profile"
        component={Profile}
        options={{ header: () => null }}
      />
    </DepositStack.Navigator>
  );
}

export default DepositMoneyScreens;
