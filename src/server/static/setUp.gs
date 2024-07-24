function setUp() {
  let form = FormApp.getActiveForm();
  form.setCollectEmail(true);
  if (form.isQuiz()) return;
  form.setIsQuiz(true);

  // let nameItem = form.addTextItem()
  // nameItem.setTitle('Name')
  // nameItem.setRequired(true)
  // console.log(FormApp.getActiveForm().getTitle())
}