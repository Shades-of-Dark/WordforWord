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
      .addItem('Condense', 'condense')
      .addItem("Pocket", 'pocket')
      .addItem("Hat", 'hat')
      .addItem("Block", "block")
      .addItem('Tag', 'tag')
      .addItem("Cite", "cite")
      .addItem('Highlight', 'highlight') // creates ui
      .addItem('Emphasis', 'emphasis')
      .addItem('Underline', 'underline')
      .addItem('Bold', 'bold')
      .addItem('Shrink', 'shrink')
      
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Settings', 'setting'))
      .addToUi();



function get_selection() {
    var doc = DocumentApp.getActiveDocument();
    var cursor = doc.getCursor();
    var selection = doc.getSelection();

    if (selection) { // checks if the user selected anything
        var elements = selection.getRangeElements();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i].getElement();
            if (element.getType() == DocumentApp.ElementType.TEXT) {
                var startOffset = elements[i].getStartOffset();
                var endOffset = elements[i].getEndOffsetInclusive();
                return { text: element.asText(), startOffset: startOffset, endOffset: endOffset };
            }
        }
    } else if (cursor) {
        var surroundingText = cursor.getSurroundingText();
        var offset = cursor.getSurroundingTextOffset();

        if (surroundingText) {
            var text = surroundingText.getText();
            var start = offset;
            var end = offset;

            // Find the start of the word
            while (start > 0 && text[start - 1] !== ' ' && text[start - 1] !== '\n') {
                start--;
            }

            // Find the end of the word
            while (end < text.length - 1 && text[end  + 1] !== ' ' && text[end] !== '\n') {
                end++;
            }

            return { text: surroundingText, startOffset: start, endOffset: end };
        } else {
            DocumentApp.getUi().alert('Unable to retrieve the surrounding text.');
        }
    } else {
        DocumentApp.getUi().alert('Please place the cursor inside a word.');
    }
}

function pocket(){
    var selectionData = get_selection();
  
    if (selectionData) {
        var { text, startOffset, endOffset } = selectionData;
 
        if (text) {
          text.setBold(startOffset,endOffset, true)
          text.setUnderline(startOffset, endOffset, true)
          text.setFontSize(startOffset, endOffset, 26)
          
        }     
    }
}

function highlight() {
    var selectionData = get_selection();
  
    if (selectionData) {
        var { text, startOffset, endOffset } = selectionData;
 
        if (text) {
            
            // Highlight the word
            text.setBackgroundColor(startOffset, endOffset, '#00FFFF');
            
            // Ensure endOffset is within the valid range
           
            
            // Apply new attributes to the specified range
        
        }
    }
}


function emphasis() {
    var selectionData = get_selection();
    
    
    if (selectionData){
      var { text, startOffset, endOffset } = selectionData;


      if (text) {
       text.setBold(startOffset, endOffset, true)
       text.setFontSize(startOffset,endOffset, 13)
       text.setUnderline(startOffset, endOffset, true)

     
       
      }
    }
     
}

function bold(){
    var selectionData = get_selection();
    
    
    if (selectionData){
      var { text, startOffset, endOffset } = selectionData;


      if (text) {
       text.setBold(startOffset, endOffset, true)
     
       
      }
    }
}

function condense() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var text = body.getText();
  
  // Remove unnecessary newline characters
  text = text.replace(/\n+/g, ' ');
  
  // Set the modified text back to the document
  body.setText(text);
}

function tag(){
  var selectionInfo = get_selection();
  if (selectionInfo){
     var { text, startOffset, endOffset } = selectionInfo;
    if (text){
      text.setFontSize(startOffset, endOffset, 13)
    }
  } 
}

function shrink() {
  var selectionInfo = get_selection();
  
  if (selectionInfo) {
    var textElement = selectionInfo.text;
    var paragraph = textElement.asParagraph();
    var text = paragraph.getText();
    var textElement = paragraph.editAsText();
    
    for (var i = 0; i < text.length - 1; i++) {
      var isBold = textElement.isBold(i);
      var isUnderline = textElement.isUnderline(i);
      var isHighlighted = textElement.getBackgroundColor(i) !== null;

      if (!isBold && !isUnderline && !isHighlighted) {
        textElement.setFontSize(i, i, 8); // Shrink text size to 8
      }
    }
  } else {
    Logger.log("No selection or cursor found.");
  }
}

function underline(){
    var selectionData = get_selection();
    
    
    if (selectionData){
      var { text, startOffset, endOffset } = selectionData;


      if (text) {
       text.setUnderline(startOffset, endOffset, true)
     
       
      }
    }
}
