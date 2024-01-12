const createRange = (node: Node, targetPosition: number) => {
  let range = document.createRange();
  range.selectNode(node);

  let pos = 0;
  const stack = [node];
  while (stack.length > 0) {
      const current = stack.pop();

      if (current?.nodeType === Node.TEXT_NODE) {
          const len = current?.textContent?.length ?? 0;
          if (pos + len >= targetPosition) {
            // range.setStart(current, targetPosition - pos);
            range.setStart(current, targetPosition - pos);
            range.setEnd(current, targetPosition - pos);
              return range;
          }
          pos += len;
      } else if (current?.childNodes && current.childNodes.length > 0) {
          for (let i = current.childNodes.length - 1; i >= 0; i--) {
              stack.push(current.childNodes[i]);
          }
      }
  }

  // The target position is greater than the
  // length of the contenteditable element.
  range.setEnd(node, node.childNodes.length);
  return range;
};

export const getCaretPosition = () => {
    // return -1;
    if (<any>window.getSelection && (<any>window).getSelection().getRangeAt) {
      var range = (<any>window).getSelection().getRangeAt(0);
      var selectedObj = (<any>window).getSelection();
      var rangeCount = 0;
      var childNodes = (<any>selectedObj).anchorNode.parentNode.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] == (<any>selectedObj).anchorNode) {
          break;
        }
        if (childNodes[i].outerHTML)
          rangeCount += childNodes[i].outerHTML.length;
        else if (childNodes[i].nodeType == 3) {
          rangeCount += childNodes[i].textContent.length;
        }
      }
      return <number>(range.startOffset + rangeCount);
    }
    return -1;
};


export const setCaretPosition = (target_pos: number) => {
  console.log(document.activeElement)
  const range = createRange(document.activeElement ?? new Node(), target_pos);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  
  // debugger;
};

