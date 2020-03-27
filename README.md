# <em>µ</em>handlers

[![Build Status](https://travis-ci.com/WebReflection/uhandlers.svg?branch=master)](https://travis-ci.com/WebReflection/uhandlers) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/uhandlers/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/uhandlers?branch=master)

All [µhtml](https://github.com/WebReflection/uhtml#readme) attributes handlers.

```js
import {aria, attribute, data, event, ref, setter} from 'uhandlers';
```

# API

<details>
  <summary><strong>aria(node)</strong></summary>

Given an object, assign all `aria-` attributes and `role` to the node.

```js
const node = document.createElement('div');
const ariaHandler = aria(node);
ariaHandler({role: 'button', labelledBy: 'id'});
node.outerHTML;
// <div role="button" aria-labelledby="id"></div>
```

</details>

<details>
  <summary><strong>attribute(node, name)</strong></summary>

Handle a generic attribute `name`, updating it when its value changes.

```js
const node = document.createElement('div');
const attributeHandler = attribute(node, 'test');
attributeHandler('value');
node.outerHTML;
// <div test="value"></div>
```

If the passed value is either `null` or `undefined`, the node is being removed.

```js
attributeHandler(null);
node.outerHTML;
// <div></div>
```

</details>

<details>
  <summary><strong>data(node)</strong></summary>

Given an object, assign all keys to the node `dataset`.

```js
const node = document.createElement('div');
const dataHandler = data(node);
dataHandler({anyKey: 'value'});
node.outerHTML;
// <div data-any-key="value"></div>
```

</details>

<details>
  <summary><strong>event(node, type)</strong></summary>

Given a `listener` or a `[listener, options]` array, add or remove events listeners whenever different from the previous time.

```js
const node = document.createElement('div');
const eventHandler = event(node, 'click');
eventHandler([e => console.log(e.type), {once: true}]);
node.click();
// "click"
node.click();
```

</details>

<details>
  <summary><strong>ref(node)</strong></summary>

Add current `node` to `ref.current` or pass `node` to the `callback`.

```js
const node = document.createElement('div');
const refHandler = ref(node);
const reference = {current: null};
refHandler(reference);
reference.current === node; // true
```

</details>

<details>
  <summary><strong>setter(node, property)</strong></summary>

Directly assign any value to a node property.

```js
const node = document.createElement('div');
const setterHandler = setter(node, 'className');
setterHandler('a b c');
node.outerHTML;
// <div class="a b c"></div>
```

</details>
