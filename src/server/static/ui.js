const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('My Sample React Project') // edit me!
    .addItem('Show sidebar', 'openSidebar');

  menu.addToUi();
};

const openSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-shadcn-ui');
  SpreadsheetApp.getUi().showSidebar(html);
};
