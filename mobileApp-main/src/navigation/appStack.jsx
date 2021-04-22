import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as constants from 'helpers/constants';
import * as userSelectors from 'resources/user/user.selectors';
import * as userActions from 'resources/user/user.actions';
import firebaseMessaging from 'helpers/firebase.helper';

import QRCodeGenerate from 'screens/QRCodeGenerate';
import ConfirmMobileDeposit from 'screens/ConfirmMobileDeposit';
import ConfirmCardDeposit from 'screens/ConfirmCardDeposit';
import ConfirmSavingsDeposit from 'screens/ConfirmSavingsDeposit';
import InviteContacts from 'screens/InviteContacts';
import Error from 'screens/Error';
import CryptoQRCodeScan from 'screens/CryptoQRCodeScan';
import SendCryptoMoney from 'screens/SendCryptoMoney';
import SendDuniaMoney from 'screens/SendDuniaMoney';
import QRCodeScan from 'screens/QRCodeScan';
import PinCodeReset from 'screens/PinCodeReset';
import CreateNewPassword from 'screens/CreateNewPassword';
import ChooseProvider from 'screens/ChooseProvider';
import ChooseContact from 'screens/ChooseContact';
import SendMobileMoney from 'screens/SendMobileMoney';
import PersonalInformation from 'screens/PersonalInformation';
import CryptoQRCodeGenerate from 'screens/CryptoQRCodeGenerate';

import Congratulations from 'components/Congratulations';
import TabBarIcon from 'components/TabBarIcon';
import TabBarLabel from 'components/TabBarLabel';
import VerifyIdentity from 'screens/VerifyIdentity';
import VerifyDetails from 'screens/VerifyDetails';
import ConfirmMobileMoneyCode from 'screens/ConfirmMobileMoneyCode';
import CryptoOperations from 'screens/CryptoOperations';
import CryptoPerformance from 'screens/CryptoPerformance';
import BuyAirtime from 'screens/BuyAirtime';
import WithdrawalMobileMoney from 'screens/WithdrawalMobileMoney';

import WalletIcon from 'assets/icons/tabBar/wallet.svg';
import SavingsIcon from 'assets/icons/tabBar/savings.svg';
import AirtimeIcon from 'assets/icons/tabBar/airtime.svg';
import ContactsIcon from 'assets/icons/tabBar/contacts.svg';
import MoreIcon from 'assets/icons/tabBar/more.svg';

import MoreScreens from './moreStack';
import DepositMoneyScreens from './depositMoneyStack';
import SavingsScreens from './savingsStack';

import styles from './navigation.styles';
import AirtimeScreens from './airtimeStack';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Dashboard() {
  const dispatch = useDispatch();
  const userData = useSelector(userSelectors.getUserData);

  useEffect(() => {
    (async () => {
      const notificationsEnabled = await firebaseMessaging.checkPermissions();

      if (notificationsEnabled) {
        const firebaseToken = await firebaseMessaging.getToken();
        const tokenIsRegistered = userData.pushNotifications.tokens.find(
          (token) => token === firebaseToken,
        );
        if (!tokenIsRegistered) {
          await dispatch(userActions.setPushNotificationsToken(firebaseToken));
        }
      }
    })();

    const unsubscribeFromFirebase = firebaseMessaging.subscribeToMessaging();

    return unsubscribeFromFirebase;
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={constants.NAVBAR_ICONS.WALLET}
      tabBarOptions={{
        tabStyle: styles.tabNavigation,
        style: styles.bottomNavigation,
      }}
    >
      <Tab.Screen
        name={constants.NAVBAR_ICONS.WALLET}
        component={DepositMoneyScreens}
        options={{
          tabBarLabel: (label) => (
            <TabBarLabel
              focused={label.focused}
              text={constants.NAVBAR_ICONS.WALLET}
            />
          ),
          tabBarIcon: (icon) => (
            <TabBarIcon focused={icon.focused} icon={WalletIcon} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={constants.NAVBAR_ICONS.SAVINGS}
        component={SavingsScreens}
        options={{
          tabBarLabel: (label) => (
            <TabBarLabel
              focused={label.focused}
              text={constants.NAVBAR_ICONS.SAVINGS}
            />
          ),
          tabBarIcon: (icon) => (
            <TabBarIcon focused={icon.focused} icon={SavingsIcon} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={constants.NAVBAR_ICONS.AIRTIME}
        component={AirtimeScreens}
        options={{
          tabBarLabel: (label) => (
            <TabBarLabel
              focused={label.focused}
              text={constants.NAVBAR_ICONS.AIRTIME}
            />
          ),
          tabBarIcon: (icon) => (
            <TabBarIcon focused={icon.focused} icon={AirtimeIcon} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={constants.NAVBAR_ICONS.CONTACTS}
        component={ChooseContact}
        initialParams={{ sendFlow: constants.SEND_FLOW.CONTACT_LIST }}
        options={{
          tabBarLabel: (label) => (
            <TabBarLabel
              focused={label.focused}
              text={constants.NAVBAR_ICONS.CONTACTS}
            />
          ),
          tabBarIcon: (icon) => (
            <TabBarIcon focused={icon.focused} icon={ContactsIcon} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={constants.NAVBAR_ICONS.MORE}
        component={MoreScreens}
        options={{
          tabBarLabel: (label) => (
            <TabBarLabel
              focused={label.focused}
              text={constants.NAVBAR_ICONS.MORE}
            />
          ),
          tabBarIcon: (icon) => (
            <TabBarIcon focused={icon.focused} icon={MoreIcon} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

function AppScreens() {
  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Dashboard" component={Dashboard} />
        <AppStack.Screen
          name="ConfirmMobileDeposit"
          component={ConfirmMobileDeposit}
        />
        <AppStack.Screen
          name="ConfirmCardDeposit"
          component={ConfirmCardDeposit}
        />
        <AppStack.Screen
          name="ConfirmSavingsDeposit"
          component={ConfirmSavingsDeposit}
        />
        <AppStack.Screen name="SendDuniaMoney" component={SendDuniaMoney} />
        <AppStack.Screen name="ChooseProvider" component={ChooseProvider} />
        <AppStack.Screen name="ChooseContact" component={ChooseContact} />
        <AppStack.Screen name="QRCodeGenerate" component={QRCodeGenerate} />
        <AppStack.Screen
          name="CryptoQRCodeGenerate"
          component={CryptoQRCodeGenerate}
        />
        <AppStack.Screen name="Congratulations" component={Congratulations} />
        <AppStack.Screen name="SendMobileMoney" component={SendMobileMoney} />
        <AppStack.Screen name="BuyAirtime" component={BuyAirtime} />
        <AppStack.Screen
          name="WithdrawalMobileMoney"
          component={WithdrawalMobileMoney}
        />
        <AppStack.Screen
          name="CreateNewPassword"
          component={CreateNewPassword}
        />
        <AppStack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
        />
        <AppStack.Screen name="QRCodeScan" component={QRCodeScan} />
        <AppStack.Screen
          options={{ header: () => null }}
          name="VerifyIdentity"
          component={VerifyIdentity}
        />
        <AppStack.Screen name="VerifyDetails" component={VerifyDetails} />
        <AppStack.Screen name="PinCodeReset" component={PinCodeReset} />
        <AppStack.Screen
          name="ConfirmMobileMoneyCode"
          component={ConfirmMobileMoneyCode}
        />
        <AppStack.Screen name="CryptoOperations" component={CryptoOperations} />
        <AppStack.Screen
          name="CryptoPerformance"
          component={CryptoPerformance}
        />
        <AppStack.Screen name="InviteContacts" component={InviteContacts} />
        <AppStack.Screen name="Error" component={Error} />
        <AppStack.Screen name="CryptoQRCodeScan" component={CryptoQRCodeScan} />
        <AppStack.Screen name="SendCryptoMoney" component={SendCryptoMoney} />
      </AppStack.Navigator>
    </>
  );
}

export default AppScreens;
