/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// DO NOT CHANGE FUNCTION NAME
function renderToDOM(virtualNode, domNode) {
  // write your solution below
  if(!virtualNode) return null;

  if(typeof virtualNode === "string"){
    const textNode = document.createTextNode(virtualNode);
    domNode.appendChild(textNode);
    return;
  }

  let node;
  if(virtualNode.type) node = document.createElement(virtualNode.type);
  else node = document.createDocumentFragment();

  if(virtualNode.props){
    const props = virtualNode.props;
    for(let key of Object.keys(props)){
      if(key !== 'children'){
        if(key === 'class') node.classList.add(props['class']);
        else if(key === 'value') node.value = props.value
        else node.setAttribute(key, props[key]);
      }
    }
    if(props.children){
      if(typeof props.children === "string"){
        const child = document.createTextNode(props.children);
        node.appendChild(child);
      }else{
        for(let key of Object.keys(props.children)){
          renderToDOM(props.children[key],node);
        }
      }
    }
  }
  domNode.appendChild(node)
}

// 0: Hide test cases UI
// 1: Show test cases UI
window.__SHOW_ELEMENTS__ = 1;
