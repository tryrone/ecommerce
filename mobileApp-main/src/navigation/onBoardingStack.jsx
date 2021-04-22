import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import OnBoardingStepOne from 'screens/OnBoardingStepOne';
import OnBoardingStepTwo from 'screens/OnBoardingStepTwo';
import OnBoardingStepThree from 'screens/OnBoardingStepThree';
import OnBoardingStepFour from 'screens/OnBoardingStepFour';

import styles from './navigation.styles';

const OnBoardingStack = createStackNavigator();

function OnBoardingScreens() {
  return (
    <SafeAreaView style={styles.authScreen}>
      <OnBoardingStack.Navigator
        headerMode="none"
        screenOptions={{
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        animation="fade"
      >
        <OnBoardingStack.Screen
          name="OnBoardingStepOne"
          component={OnBoardingStepOne}
        />
        <OnBoardingStack.Screen
          name="OnBoardingStepTwo"
          component={OnBoardingStepTwo}
        />
        <OnBoardingStack.Screen
          name="OnBoardingStepThree"
          component={OnBoardingStepThree}
        />
        <OnBoardingStack.Screen
          name="OnBoardingStepFour"
          component={OnBoardingStepFour}
        />
      </OnBoardingStack.Navigator>
    </SafeAreaView>
  );
}

export default OnBoardingScreens;
