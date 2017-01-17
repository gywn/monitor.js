/* jshint esnext: true */
var monitor = (elem, selector, callback) => {
    if (elem === undefined || selector === undefined) return;
    if (elem.constructor === Array) {
        elem.forEach(e => monitor(e, selector, callback));
        return;
    } else if (!(elem instanceof Node))
        return;

    switch (selector.constructor) {
        case Array:
            if (selector.length === 0) {
                callback(0, elem);
            } else {
                var head = selector[0];
                const tail = selector.slice(1);
                var apply = nds => {for (var i = 0; i < nds.length; i++) {
                    if (nds[i].nodeType === 1 && nds[i].matches(head)) monitor(nds[i], tail, callback);
                }};
                apply(elem.childNodes);
                (new MutationObserver(muts => muts.forEach((r, _) => apply(r.addedNodes))))
                    .observe(elem, {childList: true});
            }
            break;
        case Function:
            monitor(elem, ['*'], selector);  // selector is treated as callback
            break;
        case String:
            monitor(elem, selector.trim().split(/\s*>\s*/), callback);  // only direct children chain is supported
            break;
    }
};
