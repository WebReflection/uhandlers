const {document, HTMLElement} = require('linkedom').parseHTML('');
global.document = document;

if (!('onclick' in HTMLElement.prototype))
  HTMLElement.prototype.onclick = function () {};

const {aria, attribute, data, event, ref, setter, text} = require('../cjs');

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
reffy(node => { object.node = node; });
console.assert(object.node === div, 'ref=${callback}');

const setterfy = setter(div, 'setter');
setterfy('value');
console.assert(div.setter === 'value', 'setter');

const textfy = text(div);
textfy(null);
console.assert(div.textContent === '', 'text(null)');
textfy('value');
console.assert(div.textContent === 'value', 'text(value)');
textfy(void 0);
console.assert(div.textContent === '', 'text(void 0)');
