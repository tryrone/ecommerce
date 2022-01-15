import React, {useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const {height,width} = Dimensions.get('screen');


const App =  () => {
  const translation = useRef(new Animated.Value(1000)).current;

  useEffect(()=>{
    Animated.timing(translation, {
      toValue: 0,
      duration: 400,
      delay:500,
      useNativeDriver: true,
      // bounciness: 3,
      easing: Easing.inOut(Easing.ease)
    }).start();
  },[]);


  return (
    <View
      style={{
        height,
        width,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <Animated.View
       style={{
         height: height * 0.7,
         width: width,
         backgroundColor:'white',
         borderRadius: 10,
         alignSelf:'flex-end',
         transform:[{
           translateY: translation
         }]
       }}
      />
      {/* <Animated.View
        style={{
          height: 100,
          width: 100,
          backgroundColor: translation.interpolate({
            inputRange:[0,100],
            outputRange:['orange','blue']
          }),
          marginBottom: 10,
          opacity: translation.interpolate({
            inputRange: [25, 50, 100],
            outputRange: [0, 1, 0],
            extrapolate:'clamp'
          }),
          transform: [
            {translateX: translation},
            {
              rotate: translation.interpolate({
                inputRange: [0, 100],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      /> */}
    </View>
  );
};

export default App;
