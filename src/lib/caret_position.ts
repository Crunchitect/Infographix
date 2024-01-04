export const getCaretPosition = () => {
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
    if (<any>window.getSelection && (<any>window).getSelection().getRangeAt) {
      var range = (<any>window).getSelection().getRangeAt(0);
      var selectedObj = (<any>window).getSelection();
      var obj = (<any>selectedObj).anchorNode.parentNode.childNodes[0];
      range.setStart(obj, target_pos);
      range.collapse(true);
    
      selectedObj.removeAllRanges();
      selectedObj.addRange(range);
    }
};