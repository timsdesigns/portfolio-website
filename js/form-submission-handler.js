(() =>{
  // get all data in form and return object
  let getFormData = form =>{
    let elements = form.elements;
    let honeypot;
    let fields = Object.keys(elements).filter(k =>{
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(k =>{
      if(elements[k].name !== undefined) return elements[k].name;
      /*special case for Edge's html collection*/
      else if(elements[k].length > 0) return elements[k].item(0).name;
    }).filter((item, pos, self) => self.indexOf(item) == pos && item
    );

    let formData = {};
    fields.forEach(name =>{
      let element = elements[name];
      formData[name] = element.value; // singular form elements just have one value
      if (element.length) {
        let data = [];
        for (let i = 0; i < element.length; i++) {
          let item = element.item(i);
          if (item.checked || item.selected) data.push(item.value);
        }
        formData[name] = data.join(', ');
      } // when our element has multiple items, get their values
    });
    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // default no email
    return {data: formData, honeypot: honeypot};
  }

  let handleFormSubmit = event =>{  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    let form = event.target;
    let formData = getFormData(form);
    let data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) return false;

    disableAllButtons(form);
    let url = form.action;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();
          let formElements = form.querySelector(".form-elements")
          if (formElements) formElements.style.display = "none"; // hide form
          let thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) thankYouMessage.style.display = "block";
        }
    };
    // url encode form data for sending as post data
    let encoded = Object.keys(data).map(k =>
      encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
    ).join('&');
    xhr.send(encoded);
  }
  
  let loaded = ()=>{
    // bind to the submit event of our form
    let forms = document.querySelectorAll("form.gform");
    for (let i = 0; i < forms.length; i++) 
      forms[i].addEventListener("submit", handleFormSubmit, false);
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  let disableAllButtons = form =>{
    let buttons = form.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) buttons[i].disabled = true;
  }
})();