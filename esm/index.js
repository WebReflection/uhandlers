import {isArray} from 'uarray';

// flag for foreign checks (slower path, fast by default)
let useForeign = false;

export class Foreign {
  constructor(handler, value) {
    useForeign = true;
    this._ = (...args) => handler(...args, value);
  }
}

export const foreign = (handler, value) => new Foreign(handler, value);

export const aria = node => values => {
  for (const key in values) {
    const name = key === 'role' ? key : `aria-${key}`;
    const value = values[key];
    if (value == null)
      node.removeAttribute(name);
    else
      node.setAttribute(name, value);
  }
};

export const attribute = (node, name) => {
  let oldValue, orphan = true;
  const attributeNode = document.createAttributeNS(null, name);
  return newValue => {
    if (oldValue !== newValue) {
      oldValue = newValue;
      if (oldValue == null) {
        if (!orphan) {
          node.removeAttributeNode(attributeNode);
          orphan = true;
        }
      }
      else {
        const value = useForeign && (newValue instanceof Foreign) ?
                        newValue._(node, name) : newValue;
        if (value == null) {
          if (!orphan)
            node.removeAttributeNode(attributeNode);
            orphan = true;
        }
        else {
          attributeNode.value = value;
          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    }
  };
};

export const boolean = (node, key, oldValue) => newValue => {
  if (oldValue !== !!newValue) {
    // when IE won't be around anymore ...
    // node.toggleAttribute(key, oldValue = !!newValue);
    if ((oldValue = !!newValue))
      node.setAttribute(key, '');
    else
      node.removeAttribute(key);
  }
};

export const data = ({dataset}) => values => {
  for (const key in values) {
    const value = values[key];
    if (value == null)
      delete dataset[key];
    else
      dataset[key] = value;
  }
};

export const event = (node, name) => {
  let oldValue, lower, type = name.slice(2);
  if (!(name in node) && (lower = name.toLowerCase()) in node)
    type = lower.slice(2);
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

export const ref = node => {
  let oldValue;
  return value => {
    if (oldValue !== value) {
      oldValue = value;
      if (typeof value === 'function')
        value(node);
      else
        value.current = node;
    }
  };
};

export const setter = (node, key) => key === 'dataset' ?
  data(node) :
  value => {
    node[key] = value;
  };

export const text = node => {
  let oldValue;
  return newValue => {
    if (oldValue != newValue) {
      oldValue = newValue;
      node.textContent = newValue == null ? '' : newValue;
    }
  };
};
