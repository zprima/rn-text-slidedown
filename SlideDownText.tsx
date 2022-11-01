import {View, Text, Animated, StyleSheet} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

// https://usehooks.com/usePrevious/
const usePrevious = (value: number) => {
  const ref = useRef<number>(0);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

interface SlideDownProps {
  newValue: number;
}

const SlideDownText = ({newValue}: SlideDownProps) => {
  const previousValue = usePrevious(newValue);
  const [lheight, setLHeight] = useState(0);

  const textLayout = (e: any) => {
    setLHeight(e.nativeEvent.layout.height);
  };

  const animation1 = new Animated.Value(-1 * lheight);
  const animation2 = new Animated.Value(-1 * lheight);
  const animations = [animation1, animation2];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animation1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animation2, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [newValue, lheight]);

  const getTranslateY = (index: number) => {
    return animations[index];
  };

  return (
    <View>
      {lheight !== 0 && (
        <View style={[styles.container, {height: lheight}]}>
          {/* <Animated.View style={{transform: [{translateY: getTranslateY(0)}]}}>
            <Text style={styles.text}>{newValue}</Text>
          </Animated.View>
          <Animated.View style={{transform: [{translateY: getTranslateY(1)}]}}>
            <Text style={styles.text2}>{previousValue}</Text>
          </Animated.View> */}

          <Animated.Text
            style={[
              styles.text,
              {transform: [{translateY: getTranslateY(0)}]},
            ]}>
            {newValue}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.text2,
              {transform: [{translateY: getTranslateY(1)}]},
            ]}>
            {previousValue}
          </Animated.Text>
        </View>
      )}
      {lheight === 0 && (
        <Text style={styles.text3} onLayout={textLayout}>
          {0}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  text: {
    fontSize: 42,
    color: 'red',
  },
  text2: {
    fontSize: 42,
    color: 'blue',
  },
  text3: {
    fontSize: 42,
    color: 'black',
  },
});

export default SlideDownText;
