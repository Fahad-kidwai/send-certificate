
function switchAddOn(cmd){
    console.log({cmd})
    if(cmd){
      PropertiesService.getDocumentProperties().setProperty('addOn', true)
    }
    else{
      PropertiesService.getDocumentProperties().setProperty('addOn', false)
    }
  
  }
  function saveMailInfo(obj) {
    console.log(obj)
    PropertiesService.getDocumentProperties().setProperties(obj)
  }
  
  function test() {
    // // console.log(JSON.parse(info.tags))
    // PropertiesService.getDocumentProperties().deleteProperty('tags')
    let info = PropertiesService.getDocumentProperties().getProperties();
    console.log(info)
  
    let date = Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy");
    console.log(date)
  }
  
  function saveTags(arr) {
    console.log(arr)
    let tags = JSON.parse(PropertiesService.getDocumentProperties().getProperty('tags') || "[]");
    console.log({tags})
    if(tags){
      arr.forEach((a)=>{
        tags.push(a);
      })
      console.log({tags})
    }
    else{
      tags = arr;
    }
    PropertiesService.getDocumentProperties().setProperty("tags", JSON.stringify(tags))
  }
  
  function saveCertificateInfo(obj) {
    // let passing = '70' // to be cntd
    // let template = '1w-jwGt2Cx3E6NLpCiBiXObSj19369N8s0iA54oe3n64'
    // let fileFormat = 'PDF'
  
    PropertiesService.getDocumentProperties().setProperties(obj)
  }
  
  
  function fetchFormDetails() {
    let form = FormApp.getActiveForm()
    let questions = form.getItems()
    let titles = questions.map((question) => question.getTitle())
    // console.log(titles)
    return titles
  }
  
  function fetchTemplateTags() {
    // id = "1w-jwGt2Cx3E6NLpCiBiXObSj19369N8s0iA54oe3n64";
    let id =
      PropertiesService.getDocumentProperties().getProperty('templateID');
    console.log('Inside Fetch Tags', id);

    let pt = SlidesApp.openById(id);
    let slide = pt.getSlides()[0];
    let shapes = slide.getShapes();

    let allTags = [];

    shapes.forEach(function (shape) {
      let regEx = new RegExp('{{s*(.*?)s*}}');
      var text = shape.getText().asString();
      if (text) {
        // console.log(text)
        let r = regEx.exec(text);
        if (r) {
          allTags.push(r[0]);
        }
      }
    });
    console.log(allTags);
    return allTags;
  }

  function showDialog(pageName, title) {
    console.log('dialog');
    var template = HtmlService.createTemplateFromFile(pageName);
    let html = template.evaluate().setWidth(640).setHeight(520);

    FormApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, title);
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
  
  function getAllProperties(){
    let info = PropertiesService.getDocumentProperties().getProperties();
    console.log({info})
    return info;
  }

  function showFilePicker(triggerId, type) {
    var template = HtmlService.createTemplateFromFile('picker');
    template.triggerId = triggerId;
    template.type = type;
    FormApp.getUi().showModalDialog(
      template.evaluate().setWidth(640).setHeight(482),
      type === 'file' ? 'Select a slide' : 'Select parent folder'
    );
  }
  
  function getPickedFile(triggerId) {
    var pcikedFile = CacheService.getDocumentCache().get(triggerId);
    // logInfo('getPickedFile', { triggerId, pcikedFile });
    return pcikedFile;
  }
  
  function setPickedFile(triggerId, fileObjStr) {
    // logInfo('setPickedFile', { triggerId, fileObjStr });
    CacheService.getDocumentCache().put(triggerId, fileObjStr);
  }

  function getOAuthToken() {
    const token = ScriptApp.getOAuthToken();
    if(token){
      console.log("token", token)
      return token
    }
    // const authorizationUrl = ScriptApp.getAuthorizationRequestUrl(
    //   // Replace with your script's project key
    //   'YOUR_SCRIPT_PROJECT_KEY',
    //   // Scopes required by your Picker (e.g., Docs editing)
    //   ['https://www.googleapis.com/auth/drive']);
    
    // Logger.log('You need to authorize this script first. Please go to: ' + authorizationUrl);
    throw new Error('Authorization required');
  }
  