function setUp() {
  let form = FormApp.getActiveForm();
  if (fromTheme.isQuiz()) return;
  form.setIsQuiz(true).setCollectEmail(true);

  // let nameItem = form.addTextItem()
  // nameItem.setTitle('Name')
  // nameItem.setRequired(true)
  // console.log(FormApp.getActiveForm().getTitle())
}