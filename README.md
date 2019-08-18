# react-native-form-auto-next

A simple React Native form component that automatically focuses the next TextInput on return

## Installation

```
npm install react-native-form-auto-next
yarn add react-native-form-auto-next
expo install react-native-form-auto-next
```

## Usage

```js
import { Form } from 'react-native-form-auto-next';

export default () => {
  const submit = () => {
    // Submit the form
  };

  return (
    <Form>
      <TextInput />
      <View>
        // Nesting works
        <TextInput />
      </View>
      // Override behaviour with onSubmitEditing prop
      <TextInput onSubmitEditing={submit} />
    </Form>
  );
};
```
