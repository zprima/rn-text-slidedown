# rn-text-slidedown
Component snippet that slidesdown the previous value and the new value slidesin

## usage example

```
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SlideDownText from './SlideDownText';

const Home = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    var interval = setInterval(() => {
      setCounter(counter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <View style={styles.container}>
      <Text>{counter}</Text>
      <SlideDownText newValue={counter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
```

