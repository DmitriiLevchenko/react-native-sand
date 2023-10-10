import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {useCommonState} from './hooks/useCommonState.second';

//import {useCommonState} from './hooks/useCommonState.first';

const FirstTypeComponentA: React.FC = () => {
  const [count, setCount] = useCommonState<number>('count', 0);
  return (
    <Button
      onPress={() => setCount(count + 1)}
      title={`Increment Count (Component A): ${count}`}
    />
  );
};

const FirstTypeComponentB: React.FC = () => {
  const [count, setCount] = useCommonState<number>('count', 0);
  return (
    <Button
      onPress={() => setCount(count - 1)}
      title={`Decrement Count (Component B): ${count}`}
    />
  );
};

interface IMockObject {
  name: string;
  email: string;
  age: number;
}

const mockObj: IMockObject = {
  age: 14,
  email: 'alex@gmail.com',
  name: 'Tim',
};
const SecondTypeComponentA: React.FC = () => {
  const [value, setValue] = useCommonState<IMockObject>('object', mockObj);
  return (
    <View>
      <Button
        onPress={() => setValue({...value, age: value.age + 1, name: 'Tobias'})}
        title={`Set second type state: `}
      />
      <Text>{JSON.stringify(value)}</Text>
    </View>
  );
};

const SecondTypeComponentB: React.FC = () => {
  const [value, setValue] = useCommonState<IMockObject>('object', mockObj);
  return (
    <View>
      <Button
        onPress={() => setValue({...value, age: value.age - 1, name: 'Tim'})}
        title={`Set second type state: `}
      />
      <Text>{JSON.stringify(value)}</Text>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.rootWrapper}>
      <View>
        <View style={styles.buttonWrapper}>
          <FirstTypeComponentA />
        </View>
        <View style={styles.buttonWrapper}>
          <FirstTypeComponentB />
        </View>
      </View>
      <View>
        <View style={styles.buttonWrapper}>
          <SecondTypeComponentA />
        </View>
        <View style={styles.buttonWrapper}>
          <SecondTypeComponentB />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 20,
  },
  rootWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default App;
