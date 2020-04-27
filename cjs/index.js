'use strict';
const {isArray} = require('uarray');

const aria = node => value => {
  for (const key in value)
    node.setAttribute(key === 'role' ? key : `aria-${key}`, value[key]);
};
exports.aria = aria;

const attribute = (node, name) => {
  let oldValue, orphan = true;
  /* istanbul ignore next */
  const attributeNode = document.createAttributeNS(
    `http://www.w3.org/${
      'ownerSVGElement' in node ? '2000/svg' : '1999/xhtml'
    }`,
    name
  );
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
        attributeNode.value = newValue;
        if (orphan) {
          node.setAttributeNode(attributeNode);
          orphan = false;
        }
      }
    }
  };
};
exports.attribute = attribute;

const data = ({dataset}) => value => {
  for (const key in value)
    dataset[key] = value[key];
};
exports.data = data;

const event = (node, name) => {
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
exports.event = event;

const ref = node => value => {
  if (typeof value === 'function')
    value(node);
  else
    value.current = node;
};
exports.ref = ref;

const setter = (node, key) => value => {
  node[key] = value;
};
exports.setter = setter;

const text = node => {
  let oldValue;
  return newValue => {
    if (oldValue != newValue) {
      oldValue = newValue;
      node.textContent = newValue == null ? '' : newValue;
    }
  };
};
exports.text = text;
