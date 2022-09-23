var uhtmlHandlers = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var isArray = Array.isArray;

  var useForeign = false;
  var Foreign = /*#__PURE__*/_createClass(function Foreign(handler, value) {
    _classCallCheck(this, Foreign);

    useForeign = true;

    this._ = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return handler.apply(void 0, args.concat([value]));
    };
  });
  var foreign = function foreign(handler, value) {
    return new Foreign(handler, value);
  };
  var aria = function aria(node) {
    return function (values) {
      for (var key in values) {
        var name = key === 'role' ? key : "aria-".concat(key);
        var value = values[key];
        if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
      }
    };
  };

  var getValue = function getValue(value) {
    return value == null ? value : value.valueOf();
  };

  var attribute = function attribute(node, name) {
    var oldValue,
        orphan = true;
    var attributeNode = document.createAttributeNS(null, name);
    return function (newValue) {
      var value = useForeign && newValue instanceof Foreign ? newValue._(node, name) : getValue(newValue);

      if (oldValue !== value) {
        if ((oldValue = value) == null) {
          if (!orphan) {
            node.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = value;

          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    };
  };

  var _boolean = function _boolean(node, key, oldValue) {
    return function (newValue) {
      var value = !!getValue(newValue);

      if (oldValue !== value) {
        // when IE won't be around anymore ...
        // node.toggleAttribute(key, oldValue = !!value);
        if (oldValue = value) node.setAttribute(key, '');else node.removeAttribute(key);
      }
    };
  };
  var data = function data(_ref) {
    var dataset = _ref.dataset;
    return function (values) {
      for (var key in values) {
        var value = values[key];
        if (value == null) delete dataset[key];else dataset[key] = value;
      }
    };
  };
  var event = function event(node, name) {
    var oldValue,
        lower,
        type = name.slice(2);
    if (!(name in node) && (lower = name.toLowerCase()) in node) type = lower.slice(2);
    return function (newValue) {
      var info = isArray(newValue) ? newValue : [newValue, false];

      if (oldValue !== info[0]) {
        if (oldValue) node.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = function ref(node) {
    var oldValue;
    return function (value) {
      if (oldValue !== value) {
        oldValue = value;
        if (typeof value === 'function') value(node);else value.current = node;
      }
    };
  };
  var setter = function setter(node, key) {
    return key === 'dataset' ? data(node) : function (value) {
      node[key] = value;
    };
  };
  var text = function text(node) {
    var oldValue;
    return function (newValue) {
      var value = getValue(newValue);

      if (oldValue != value) {
        oldValue = value;
        node.textContent = value == null ? '' : value;
      }
    };
  };

  exports.Foreign = Foreign;
  exports.aria = aria;
  exports.attribute = attribute;
  exports.boolean = _boolean;
  exports.data = data;
  exports.event = event;
  exports.foreign = foreign;
  exports.ref = ref;
  exports.setter = setter;
  exports.text = text;

  return exports;

})({});
