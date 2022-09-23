'use strict';
const {isArray} = require('uarray');

// flag for foreign checks (slower path, fast by default)
let useForeign = false;

class Foreign {
  constructor(handler, value) {
    useForeign = true;
    this._ = (...args) => handler(...args, value);
  }
}
exports.Foreign = Foreign

const foreign = (handler, value) => new Foreign(handler, value);
exports.foreign = foreign;

const aria = node => values => {
  for (const key in values) {
    const name = key === 'role' ? key : `aria-${key}`;
    const value = values[key];
    if (value == null)
      node.removeAttribute(name);
    else
      node.setAttribute(name, value);
  }
};
exports.aria = aria;

const getValue = value => value == null ? value : value.valueOf();

const attribute = (node, name) => {
  let oldValue, orphan = true;
  const attributeNode = document.createAttributeNS(null, name);
  return newValue => {
    const value = useForeign && (newValue instanceof Foreign) ?
                  newValue._(node, name) : getValue(newValue);
    if (oldValue !== value) {
      if ((oldValue = value) == null) {
        if (!orphan) {
          node.removeAttributeNode(attributeNode);
          orphan = true;
        }
      }
      else {
        attributeNode.value = value;
        if (orphan) {
          node.setAttributeNodeNS(attributeNode);
          orphan = false;
        }
      }
    }
  };
};
exports.attribute = attribute;

const boolean = (node, key, oldValue) => newValue => {
  const value = !!getValue(newValue);
  if (oldValue !== value) {
    // when IE won't be around anymore ...
    // node.toggleAttribute(key, oldValue = !!value);
    if ((oldValue = value))
      node.setAttribute(key, '');
    else
      node.removeAttribute(key);
  }
};
exports.boolean = boolean;

const data = ({dataset}) => values => {
  for (const key in values) {
    const value = values[key];
    if (value == null)
      delete dataset[key];
    else
      dataset[key] = value;
  }
};
exports.data = data;

const event = (node, name) => {
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
exports.event = event;

const ref = node => {
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
exports.ref = ref;

const setter = (node, key) => key === 'dataset' ?
  data(node) :
  value => {
    node[key] = value;
  };
exports.setter = setter;

const text = node => {
  let oldValue;
  return newValue => {
    const value = getValue(newValue);
    if (oldValue != value) {
      oldValue = value;
      node.textContent = value == null ? '' : value;
    }
  };
};
exports.text = text;
