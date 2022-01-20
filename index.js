/** @jsx h */
let vdom = <div id="foo">Hello! Im in a div added via JSX</div>;
/* With the help of a transpiler like Babel that JSX gets turned into this 
{
  nodeName: "div",
  attributes: {
    "id": "foo"
  },
  children: ["Hello! Im in a div added via JSX"]
} 
*/

//Creating the DOM node from the VDOM object
let dom = render(vdom);

//Appending node to DOM
window.onload = () => {
    document.body.appendChild(dom);
}

//parsing and rendering functions
function h(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children };
}

function render(vnode) {
    if (vnode.split) return document.createTextNode(vnode);

    let n = document.createElement(vnode.nodeName);

    let a = vnode.attributes || {};
    Object.keys(a).forEach( k => n.setAttribute(k, a[k]) );
    
    //Recursivity used to render children in case there are any
    (vnode.children || []).forEach( c => n.appendChild(render(c)) );

    return n;
}