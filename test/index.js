const {document} = require('linkedom').parseHTML('');
global.document = document;

const {aria, attribute, boolean, data, event, foreign, ref, setter, text} = require('../cjs');

const div = document.createElement('div');

const ariafy = aria(div);
ariafy({role: 'button', labelledBy: 'id'});
console.assert(div.getAttribute('role') === 'button', 'role');
console.assert(div.getAttribute('aria-labelledBy') === 'id', 'aria-labelled');

ariafy({role: null, labelledBy: 'id'});
console.assert(div.getAttribute('role') == null, 'dropped role');

const attributefy = attribute(div, 'test');
attributefy(null);
attributefy('value');
attributefy('value');
console.assert(div.getAttribute('test') === 'value', 'attribute');
attributefy(null);
console.assert(!div.hasAttribute('test'), 'attribute null');
attributefy('value');
console.assert(div.hasAttribute('test'), 'attribute exists');
attributefy('test');
console.assert(div.getAttribute('test') === 'test', 'attribute test');

const foreignify = attribute(div, 'foreign');
let called = false;
const handler = (node, name, value) => {
  called = true;
  if (value) {
    console.assert(div === node, 'foreign handelr node');
    console.assert(name === 'foreign', 'foreign handelr name');
    console.assert(value === 'value', 'foreign handelr value');
  }
  return value;
};
foreignify(foreign(handler, 'value'));
console.assert(called, 'foreign handelr');
foreignify(foreign(handler, null));
foreignify(foreign(handler, null));

const datafy = data(div);
datafy({labelledBy: 'id'});
console.assert(div.dataset.labelledBy === 'id', 'data');

datafy({labelledBy: null});
console.assert(div.dataset.labelledBy == null, 'dropped data');

const eventfy = event(div, 'onClick');
eventfy(Object);
eventfy([String, false]);
eventfy([String, false]);
eventfy(null);
event(div, 'dataset');

const reffy = ref(div);
const object = {};

reffy(object);
console.assert(object.current === div, 'ref=${object}');

// for coverage sake
reffy(object);
console.assert(object.current === div, 'ref=${object}');

object.count = 0;
const fn = node => { object.count++; object.node = node; };
reffy(fn);
console.assert(object.node === div, 'ref=${callback}');
console.assert(object.count === 1, 'ref=${callback} invokes');

reffy(fn);
console.assert(object.node === div, 'ref=${callback}');
console.assert(object.count === 1, 'ref=${callback} invokes');

let setterfy = setter(div, 'setter');
setterfy('value');
console.assert(div.setter === 'value', 'setter');

setterfy = setter(div, 'dataset');
setterfy({test: 'ok'});
console.assert(div.dataset.test === 'ok', 'setter as dataset');

const textfy = text(div);
textfy(null);
console.assert(div.textContent === '', 'text(null)');
textfy('value');
console.assert(div.textContent === 'value', 'text(value)');
textfy(void 0);
console.assert(div.textContent === '', 'text(void 0)');

const booleanify = boolean(div, 'boolean');
console.assert(!div.hasAttribute('boolean'), 'no boolean');
booleanify(1);
console.assert(div.hasAttribute('boolean'), 'yes boolean');
booleanify(1);
console.assert(div.hasAttribute('boolean'), 'yes boolean');
booleanify(0);
console.assert(!div.hasAttribute('boolean'), 'no boolean again');
booleanify(0);
console.assert(!div.hasAttribute('boolean'), 'no boolean again');
