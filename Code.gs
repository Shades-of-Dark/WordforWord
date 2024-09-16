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
      .addItem('Highlight', 'highlight') // creates ui
      .addItem('Emphasis', 'emphasis')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Settings', 'setting'))
      .addToUi();


function highlight() {

    var selection = DocumentApp.getActiveDocument().getSelection();
    
    var elements = selection.getRangeElements();
    if (selection){
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i].getElement();
      var startOffset = elements[i].getStartOffset();
      var endOffset = elements[i].getEndOffsetInclusive();
         }

      if (element.editAsText) {
        var text = element.asText();

        var textElement = element;

        var textStyle = {};
        textStyle[DocumentApp.Attribute.BACKGROUND_COLOR] = '#00FFFF'; // Yellow highlight
    
        textElement.setAttributes(startOffset, endOffset, textStyle);
      }
    }
      else {
    DocumentApp.getUi().alert('Nothing is selected.');
      } 
   
}

function emphasis() {
   var selection = DocumentApp.getActiveDocument().getSelection();
    
    var elements = selection.getRangeElements();
    if (selection){
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i].getElement();
      var startOffset = elements[i].getStartOffset();
      var endOffset = elements[i].getEndOffsetInclusive();
         }

      if (element.editAsText) {
        var text = element.asText();
 
        var textElement = element;
     
        var textStyle = {};
        textStyle[DocumentApp.Attribute.BOLD] = true; // bold
        textStyle[DocumentApp.Attribute.UNDERLINE] = true; // underline
        textStyle[DocumentApp.Attribute.FONT_SIZE] = 13; // bigger
        textElement.setAttributes(startOffset, endOffset, textStyle);
      }
    }
      else {
    DocumentApp.getUi().alert('Nothing is selected.');
      } 
}

