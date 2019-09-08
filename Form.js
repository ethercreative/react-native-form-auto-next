import { Children, cloneElement } from 'react';

export default ({ children }) => {
  if (!children) {
    return null;
  }

  let inputs = [];

  const onSubmitEditing = (index) => {
    const next = inputs[index];

    if (!next) {
      return;
    }

    let { focus } = next;

    if (!focus) {
      const {
        props: { focus: focusProp },
      } = next;

      focus = focusProp;
    }

    if (!focus) {
      return;
    }

    focus();
  };

  const childrenWithProps = (children) => {
    const map = Children.map(children, (child) => {
      if (!child) {
        return;
      }

      if (typeof child === 'string') {
        return child;
      }

      const {
        type: { displayName },
      } = child;

      if (displayName === 'Text') {
        return child;
      }

      const {
        props: { children },
      } = child;

      if (children) {
        return cloneElement(child, {
          children: childrenWithProps(children),
        });
      }

      const {
        props: { setFieldValue },
      } = child;

      if (displayName !== 'TextInput' && !setFieldValue) {
        return child;
      }

      const clone = cloneElement(child, {
        ref: (input) => inputs.push(input),
      });

      const ref = clone.ref();

      return cloneElement(clone, {
        onSubmitEditing: () => {
          const {
            props: { onSubmitEditing: onSubmitEditingProp },
          } = clone;

          if (onSubmitEditingProp) {
            onSubmitEditingProp();
            return;
          }

          onSubmitEditing(ref);
        },
        blurOnSubmit: false,
      });
    });

    inputs = inputs.filter((input) => input !== undefined);
    return map;
  };

  return childrenWithProps(children);
};
