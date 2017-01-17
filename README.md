# monitor.js
a wrapper of MutationObserver to monitor DOM elements creation/deleting.

## Usage

```javascript
monitor(elem, func)
monitor(elem, ['div', 'a'], func)
monitor(elem, 'div > a', func)
monitor([e1, e2], 'div > a', func)

func = (0, elem) => {...}
```
