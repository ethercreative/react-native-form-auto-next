import { Children, cloneElement } from 'react';

export default ({ children }) => {
  if (!children) {
    return null;
  }

  const inputs = [];
  let i = 0;

  const onSubmitEditing = (index) => {
    let next = inputs[index + 1];

    if (!next) {
      return;
    }

    const { current } = next;

    if (current) {
      next = current;
    }

    let { focus } = next;

    if (!focus) {
      const {
        props: { focus: focusProp },
      } = next;

      focus = focusProp;
    }

    const {
      props: { onPress },
    } = next;

    if (onPress) {
      focus = onPress;
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

      if (displayName !== 'TextInput') {
        return child;
      }

      const props = {
        onRef: (input) => inputs.push(input),
        indexRef: i,
        blurOnSubmit: false,
      };

      const {
        type: { State },
      } = child;

      if (State) {
        props.ref = (input) => inputs.push(input);
      }

      let clone = cloneElement(child, props);

      clone = cloneElement(clone, {
        onSubmitEditing: () => {
          const {
            props: { onSubmitEditing: onSubmitEditingProp },
          } = child;

          if (onSubmitEditingProp) {
            onSubmitEditingProp();
            return;
          }

          const { indexRef } = clone.props;
          onSubmitEditing(indexRef);
        },
      });

      i += 1;

      return clone;
    });

    return map;
  };

  return childrenWithProps(children);
};
