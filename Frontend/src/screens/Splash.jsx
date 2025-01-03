import React, { useEffect } from "react";
import { 
  Text,
  SafeAreaView,
  StatusBar,
  View,
  Animated,
  ImageBackground,
  StyleSheet
} from "react-native";
import Title from '../common/Title';
import img1 from "../assets/img1.jpeg";

function SplashScreen() {
  const translateY = new Animated.Value(0);
  const duration = 5000;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([   
        Animated.timing(translateY, {
          toValue: 100,
          duration: duration,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true
        })
      ])
    ).start();  
  }, []);

  return (
    <ImageBackground
      source={img1}  
      style={styles.backgroundImage}
      resizeMode="cover"  
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Animated.View style={[styles.animatedView, { transform: [{ translateY }] }]}>
          <Title text='ZYNC' color='white' />
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  container: {
    flex: 1,
    paddingBottom: 700,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  animatedView: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SplashScreen;
