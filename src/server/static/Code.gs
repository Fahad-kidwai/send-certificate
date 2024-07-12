/**
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */
/**
 * Adds a custom menu to the active form to show the add-on sidebar.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
    FormApp.getUi()
      .createAddonMenu()
      .addItem('Send Certificate', 'showSidebar')
      // .addItem('About', 'showAbout')
      .addToUi();
  }
  
  /**
   * Runs when the add-on is installed.
   *
   * @param {object} e The event parameter for a simple onInstall trigger. To
   *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
   *     running in, inspect e.authMode. (In practice, onInstall triggers always
   *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
   *     AuthMode.NONE).
  */
  function onInstall(e) {
    onOpen(e);
  }
  
  /**
   * Opens a sidebar in the form containing the add-on's user interface for
   * configuring the notifications this add-on will produce.
   */
  function showSidebar() {
    var ui = HtmlService.createTemplateFromFile('sidebar-shadcn-ui')
      .evaluate()
      .setTitle('Send Certificate');
    FormApp.getUi().showSidebar(ui);
    // setUp();
    // Trigger For onSubmit
    const triggers = ScriptApp.getProjectTriggers();
    if (triggers.length > 1) {
      ScriptApp.newTrigger('onFormSubmit')
        .forForm(FormApp.getActiveForm())
        .onFormSubmit()
        .create();
    }
  }

  function includeFile_(output, name, params) {
    let template = HtmlService.createTemplateFromFile(name);
    if (params) {
      Object.keys(params).forEach(function (key) {
        template[key] = params[key];
      });
    }
    output.$out.append(template.evaluate().getContent());
  }

  function onFormSubmit(e) {
    let info = PropertiesService.getDocumentProperties().getProperties();
    if (info.addOn === 'false') {
      console.log('Add-on is turned off');
      return;
    }
    let reachedPoints = 0;
    let certificate;
    let systemGeneratedTags = [
      'Reached Percentage',
      'Reached Points',
      'Form Name',
      'Date',
    ]; // system generated tags List
    let response = e.response;
    let email = response.getRespondentEmail();
    let gradableItemsResponses = response.getGradableItemResponses();

    let passingPercentage = info.passingScore;
    let fileFormat = info.fileFormat;
    let templateID = info.templateID;
    let senderName = info.senderName;
    let dateFormat = info.dateFormat;

    for (gradableItemsResponse of gradableItemsResponses) {
      // returns all the items from response
      let point = gradableItemsResponse.getScore();
      reachedPoints += point;
    }
    let totalPoints = gradableItemsResponses.length; // Score calculation is static, ASK
    let formName = DriveApp.getFileById(
      FormApp.getActiveForm().getId()
    ).getName();

    let date = Utilities.formatDate(new Date(), 'GMT', dateFormat);
    let reachedPercentage = (reachedPoints / totalPoints) * 100;

    let tags = JSON.parse(info.mergedTags);
    for (let i = 0; i < tags.length; i++) {
      if (systemGeneratedTags.includes(tags[i][0])) {
        if (tags[i][0] === systemGeneratedTags[0]) {
          tags[i][0] = reachedPercentage;
        } else if (tags[i][0] === systemGeneratedTags[1]) {
          tags[i][0] = reachedPoints;
        } else if (tags[i][0] === systemGeneratedTags[2]) {
          tags[i][0] = formName;
        } else if (tags[i][0] === systemGeneratedTags[3]) {
          tags[i][0] = date;
        }
      } else {
        let answer = getAnswerByQuestionTitle(response, tags[i][0]);
        if (answer) {
          tags[i][0] = answer;
        } else {
          continue;
        }
      }
    }

    let subject;
    let mailBody;
    if (reachedPercentage >= passingPercentage) {
      certificate = generateCertificate(tags, templateID, fileFormat, formName);
      subject = info.mailSubject;
      mailBody = info.mailBody;
    } else {
      subject = info.failedSubject;
      mailBody = info.failedBody;
    }
    tags.forEach(function (tag) {
      subject = subject.replace(tag[1], tag[0]);
      mailBody = mailBody.replace(tag[1], tag[0]);
    });

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: mailBody,
      name: senderName,
      attachments: certificate ? certificate : null,
    });
  }

  // function generateCertificate(responderName, formName, reachedPercentage, passingPercentage, date) {
  function generateCertificate(tags, templateID, fileFormat, formName) {
    let template = DriveApp.getFileById(templateID);
    let folder = DriveApp.getFolderById('1F-jL3AaFgUPHak_UVcZ8_zMGFrKd1gZ0'); // need to change the folder  ID, ASK
    let templateCopy = template.makeCopy(formName, folder); // ask

    let id = templateCopy.getId();

    let pt = SlidesApp.openById(id);
    let slide = pt.getSlides()[0];
    let shapes = slide.getShapes();

    shapes.forEach(function (shape) {
      var text = shape.getText();
      if (text) {
        tags.forEach(function (tag) {
          text.replaceAllText(tag[1], tag[0]);
        });
      }
    });
    pt.saveAndClose();
    let attachment = folder.createFile(templateCopy.getAs(fileFormat));
    templateCopy.setTrashed(true);
    return attachment;
  }
  
  
  