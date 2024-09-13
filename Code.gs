/* What should the add-on do after it is installed */
function onInstall(e) {
  onOpen(e);
}

/* What should the add-on do when a document is opened */
function onOpen(a) {
  DocumentApp.getUi()
 
}
  var ui = DocumentApp.getUi();
  // Or DocumentApp, SlidesApp or FormApp.
  ui.createMenu('Debate')
      .addItem('Highlight', 'menuItem1')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Second item', 'menuItem2'))
      .addToUi();


function menuItem1() {

    var selection = DocumentApp.getActiveDocument().getSelection();
    
    var elements = selection.getRangeElements();
    if (elements.length > 0){
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i].getElement();
      var startOffset = elements[i].getStartOffset();
      var endOffset = elements[i].getEndOffsetInclusive();
         }

      if (element.editAsText) {
        var text = element.asText();
        text.deleteText(startOffset, endOffset);
        var textElement = element;
        text.insertText(startOffset, "Hello World!");
        var textStyle = {};
        textStyle[DocumentApp.Attribute.BACKGROUND_COLOR] = '#FFFF00'; // Yellow highlight
    
        textElement.setAttributes(startOffset, endOffset, textStyle);
      }
    }
      else {
    DocumentApp.getUi().alert('Nothing is selected.');
      } 
   
}

function menuItem2() {
  DocumentApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the second menu item!');
}
