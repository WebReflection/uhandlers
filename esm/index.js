import {isArray} from 'uarray';

export const aria = node => value => {
  for (const key in value)
    node.setAttribute(key === 'role' ? key : `aria-${key}`, value[key]);
};

export const attribute = (node, name) => {
  let oldValue, ownerLess = true;
  const attribute = node.ownerDocument.createAttribute(name);
  return newValue => {
    if (oldValue !== newValue) {
      oldValue = newValue;
      if (oldValue == null) {
        if (!ownerLess) {
          node.removeAttributeNode(attribute);
          ownerLess = true;
        }
      }
      else {
        attribute.value = newValue;
        if (ownerLess) {
          node.setAttributeNode(attribute);
          ownerLess = false;
        }
      }
    }
  };
};

export const data = ({dataset}) => value => {
  for (const key in value)
    dataset[key] = value[key];
};

export const event = (node, name) => {
  let oldValue, type = name.slice(2);
  if (!(name in node) && name.toLowerCase() in node)
    type = type.toLowerCase();
  return newValue => {
    const info = isArray(newValue) ? newValue : [newValue, false];
    if (oldValue !== info[0]) {
      if (oldValue)
        node.removeEventListener(type, oldValue, info[1]);
      if (oldValue = info[0])
        node.addEventListener(type, oldValue, info[1]);
    }
  };
};

export const ref = node => value => {
  if (typeof value === 'function')
    value(node);
  else
    value.current = node;
};

export const setter = (node, key) => value => {
  node[key] = value;
};
