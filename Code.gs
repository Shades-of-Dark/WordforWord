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
  ui.createMenu('Custom Menu')
      .addItem('First item', 'menuItem1')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Second item', 'menuItem2'))
      .addToUi();


function menuItem1() {

    var selection = DocumentApp.getActiveDocument().getSelection();
  
  if (selection) {
  var elements = selection.getRangeElements();
  var selection = "Hello World!"
} else {
  DocumentApp.getUi().alert('Nothing is selected.');
}
  
}

function menuItem2() {
  DocumentApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the second menu item!');
}
