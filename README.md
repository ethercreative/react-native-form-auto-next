# react-native-form-auto-next

A simple form component that automatically focuses the next TextInput - with recursive nesting checks

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
