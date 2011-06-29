// Found this code here: http://snipplr.com/view.php?codeview&id=5144
// It was mentioned in this stack overflow question:
// http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox

function doGetCaretPosition (ctrl) {
  var CaretPos = 0;
  // IE Support
  if (document.selection) {

    ctrl.focus ();
    var Sel = document.selection.createRange ();

    Sel.moveStart ('character', -ctrl.value.length);

    CaretPos = Sel.text.length;
  }
  // Firefox support
  else if (ctrl.selectionStart || ctrl.selectionStart == '0')
    CaretPos = ctrl.selectionStart;

  return (CaretPos);
}

function setCaretPosition(ctrl, pos)
{
  if(ctrl.setSelectionRange)
  {
    ctrl.focus();
    ctrl.setSelectionRange(pos,pos);
  }
  else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

