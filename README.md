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
import React from 'react';
import { View } from 'react-native';
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

## Usage with custom/abstracted inputs

```js
// Form.js
import React from 'react';
import { View } from 'react-native';
import { Form } from 'react-native-form-auto-next';
import CustomInput from './CustomInput';

export default () => {
  const submit = () => {
    // Submit the form
  };

  return (
    <Form>
      <CustomInput />
      <View>
        // Nesting works
        <CustomInput />
      </View>
      // Override behaviour with onSubmitEditing prop
      <CustomInput onSubmitEditing={submit} />
    </Form>
  );
};

// CustomInput.js
import React, { Component } from 'react';
import { TextInput } from 'react-native';

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.input = null;
  }

  componentDidMount() {
    const { onRef } = this.props;

    if (!onRef) {
      return;
    }

    onRef(this);
  }

  focus = () => {
    if (!this.input) {
      return;
    }

    this.input.focus();
  };

  render() {
    return <TextInput ref={(input) => (this.input = input)} />;
  }
}
```
