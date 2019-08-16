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

    next.focus();
  };

  const childrenWithProps = (children) => {
    const map = Children.map(children, (child) => {
      if (!child) {
        return;
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

      if (displayName !== 'TextInput') {
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
