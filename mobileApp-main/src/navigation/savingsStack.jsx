import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MySavings from 'screens/MySavings';
import CreateSavingsPool from 'screens/CreateSavingsPool';
import SavingsPool from 'screens/SavingsPool';
import ManageSavingsPool from 'screens/ManageSavingsPool';
import Profile from 'screens/Profile';

import MainHeader from 'components/MainHeader';

const SavingsStack = createStackNavigator();

function SavingsScreens() {
  return (
    <SavingsStack.Navigator
      screenOptions={{
        header: (props) => <MainHeader {...props} />,
      }}
    >
      <SavingsStack.Screen
        name="MySavings"
        component={MySavings}
        options={{ header: () => null }}
      />
      <SavingsStack.Screen
        name="CreateSavingsPool"
        component={CreateSavingsPool}
        options={{
          title: "Create New Pool",
        }}
      />
      <SavingsStack.Screen
        name="SavingsPool"
        component={SavingsPool}
        options={{ header: () => null }}
      />
      <SavingsStack.Screen
        name="ManageSavingsPool"
        component={ManageSavingsPool}
        options={{
          title: "Pool Details",
        }}
      />
      <SavingsStack.Screen
        name="Profile"
        component={Profile}
        options={{ header: () => null }}
      />
    </SavingsStack.Navigator>
  );
}

export default SavingsScreens;
