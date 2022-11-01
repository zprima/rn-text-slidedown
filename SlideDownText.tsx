import {View, Text, Animated, StyleSheet} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

// https://usehooks.com/usePrevious/
const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  if (typeof ref.current === undefined) {
    return 0;
  }

  return ref.current;
};

const SlideDownText = ({newValue}) => {
  const previousValue = usePrevious(newValue);
  const [lheight, setLHeight] = useState(0);

  const textLayout = e => {
    console.log(e.nativeEvent.layout.height);
    setLHeight(e.nativeEvent.layout.height);
  };

  const animation1 = new Animated.Value(-1 * lheight);
  const animation2 = new Animated.Value(-1 * lheight);
  const animations = [animation1, animation2];

  useEffect(() => {
    animations.map((animation, index) => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [newValue, lheight]);

  const getTranslateY = index => {
    return animations[index];
  };

  return (
    <View>
      {lheight !== 0 && (
        <View style={{height: lheight, overflow: 'hidden'}}>
          <Animated.View style={{transform: [{translateY: getTranslateY(0)}]}}>
            <Text style={styles.text}>{newValue}</Text>
          </Animated.View>
          <Animated.View style={{transform: [{translateY: getTranslateY(1)}]}}>
            <Text style={styles.text2}>{previousValue}</Text>
          </Animated.View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: 'blue',
    borderWidth: 1,
    width: '100%',
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
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

export default SlideDownText;
