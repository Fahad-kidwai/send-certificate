
  function switchAddOn(cmd) {
    if (cmd) {
      PropertiesService.getDocumentProperties().setProperty('addOn', true);
    } else {
      PropertiesService.getDocumentProperties().setProperty('addOn', false);
    }
  }
  function saveMailInfo(obj) {
    PropertiesService.getDocumentProperties().setProperties(obj);
  }

  function test() {
    // let info = PropertiesService.getDocumentProperties().deleteAllProperties();
    // let totalPoints = 0;
    // let items = FormApp.getActiveForm().getItems();
    // for (let i = 0; i < items.length; i++) {
    //   let item = items[i];
    //   // console.log(item)
    //   let temp;
    //   console.log(item.getType().name());
    //   if (item.getType().name() == 'MULTIPLE_CHOICE') {
    //     temp = item.asMultipleChoiceItem();
    //   } else if (item.getType().name() == 'TEXT') {
    //     temp = item.asTextItem();
    //   }
    //   totalPoints += temp.getPoints();
    // }
    // console.log('total', totalPoints);
  }

  function saveTags(arr, setAll = false) {
    if (setAll) {
      console.log('setall');
      PropertiesService.getDocumentProperties().setProperty(
        'mergedTags',
        JSON.stringify(arr)
      );
    } else {
      let newArr;
      let tags = JSON.parse(
        PropertiesService.getDocumentProperties().getProperty('mergedTags') ||
          '[]'
      );
      if (tags) {
        newArr = [...tags, ...arr];
      } else {
        newArr = arr;
      }
      PropertiesService.getDocumentProperties().setProperty(
        'mergedTags',
        JSON.stringify(newArr)
      );
    }
  }

  function saveCertificateInfo(obj) {
    PropertiesService.getDocumentProperties().setProperties(obj);
  }

  function fetchFormDetails() {
    let form = FormApp.getActiveForm();
    let questions = form.getItems();
    let titles = questions.map((question) => question.getTitle());
    return titles;
  }

  function fetchTemplateTags() {
    let id =
      PropertiesService.getDocumentProperties().getProperty('templateID');
    let allTags = [];
    if (!id) {
      PropertiesService.getDocumentProperties().setProperty(
        'templateTags',
        allTags
      );
      throw new Error('Choose Template to fetch tags');
    } //
    let pt = SlidesApp.openById(id);
    let slide = pt.getSlides()[0];
    let shapes = slide.getShapes();

    shapes.forEach(function (shape) {
      let regEx = new RegExp('{{s*(.*?)s*}}');
      var text = shape.getText().asString();
      if (text) {
        let r = regEx.exec(text);
        if (r) {
          allTags.push(r[0]);
        }
      }
    });

    PropertiesService.getDocumentProperties().setProperty(
      'templateTags',
      allTags
    );
    return allTags;
  }

  function getAllProperties() {
    let info = PropertiesService.getDocumentProperties().getProperties();
    console.log(info);
    return info;
  }

  function getAnswerByQuestionTitle(response, questionTitle) {
    const itemResponses = response.getItemResponses();
    // Loop through each item response (question and answer)
    for (const itemResponse of itemResponses) {
      const question = itemResponse.getItem().getTitle();
      const answer = itemResponse.getResponse();

      // Check if question title matches
      if (question === questionTitle) {
        return answer;
      }
    }
    // No answer found for the question
    return null;
  }

  function showDialog(pageName, title) {
    var template = HtmlService.createTemplateFromFile(pageName);
    let html = template.evaluate().setWidth(640).setHeight(520);

    FormApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, title);
  }

  function showFilePicker(triggerId, type, name) {
    var template = HtmlService.createTemplateFromFile('picker');
    template.triggerId = triggerId;
    template.type = type;
    template.name = name;
    FormApp.getUi().showModalDialog(
      template.evaluate().setWidth(640).setHeight(482),
      type === 'file' ? 'Select a slide' : 'Select parent folder'
    );
  }

  function getPickedFile(triggerId) {
    var pcikedFile = CacheService.getDocumentCache().get(triggerId);
    return pcikedFile;
  }

  function setPickedFile(triggerId, fileObjStr) {
    // logInfo('setPickedFile', { triggerId, fileObjStr });
    CacheService.getDocumentCache().put(triggerId, fileObjStr);
  }

  function getOAuthToken() {
    const token = ScriptApp.getOAuthToken();
    if (token) {
      return token;
    }
    throw new Error('Authorization required');
  }
  