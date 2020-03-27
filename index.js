var uhtmlHandlers = (function (exports) {
  'use strict';

  var isArray = Array.isArray;

  var aria = function aria(node) {
    return function (value) {
      for (var key in value) {
        node.setAttribute(key === 'role' ? key : "aria-".concat(key), value[key]);
      }
    };
  };
  var attribute = function attribute(node, name) {
    var oldValue,
        ownerLess = true;
    var attributeNode = node.ownerDocument.createAttribute(name);
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (oldValue == null) {
          if (!ownerLess) {
            node.removeAttributeNode(attributeNode);
            ownerLess = true;
          }
        } else {
          attributeNode.value = newValue;

          if (ownerLess) {
            node.setAttributeNode(attributeNode);
            ownerLess = false;
          }
        }
      }
    };
  };
  var data = function data(_ref) {
    var dataset = _ref.dataset;
    return function (value) {
      for (var key in value) {
        dataset[key] = value[key];
      }
    };
  };
  var event = function event(node, name) {
    var oldValue,
        type = name.slice(2);
    if (!(name in node) && name.toLowerCase() in node) type = type.toLowerCase();
    return function (newValue) {
      var info = isArray(newValue) ? newValue : [newValue, false];

      if (oldValue !== info[0]) {
        if (oldValue) node.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = function ref(node) {
    return function (value) {
      if (typeof value === 'function') value(node);else value.current = node;
    };
  };
  var setter = function setter(node, key) {
    return function (value) {
      node[key] = value;
    };
  };

  exports.aria = aria;
  exports.attribute = attribute;
  exports.data = data;
  exports.event = event;
  exports.ref = ref;
  exports.setter = setter;

  return exports;

}({}));
