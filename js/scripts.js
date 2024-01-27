(() => {
  //#region Email Handler
  let sendWithEmailProgram = () => {
    let form = document.querySelector("#contact-form");
    let email = form.querySelector("#email").value;
    let subject = form.querySelector("#subject").value;
    let urgency = form.querySelector("#u").value;
    let name = form.querySelector("#name").value;
    let message = form.querySelector("#msg").value;
    //form.action() = `mailto:info@comdecon.com&subject=${subject+" - "+urgency+" by "+name}&body=${message}`;
    // form.setAttribute("action","https://formsubmit.com/info@comdecon.com");
    // Email.send({
    //   SecureToken : "b76308e0-12b9-462f-8d0f-bfdec8e3e596",
    //   To : 'info@comdecon.com',
    //   From : "info@comdecon.com",
    //   Subject : subject+" - "+urgency+" by "+name,
    //   Body : message
    // }).then(()=> alert("Message is on its way.\nLine Thank you for reaching out!"));
    let thx = document.createElement("div");
    thx.innerText = "Message is on its way.\nLine Thank you for reaching out!";
    form.appendChild(thx);
    thx.style = "display:none";
    thx.classList.add("thankyou_message");
    form.setAttribute("data-email", "example@email.net");
    form.setAttribute("action",
      `https://script.google.com/macros/s/AKfycbwZpCYOrdiS_I4VoRWFWXL7vj3lcyrYtKjKKFdel3UzfEM_4FoafrpHsWEn-nKSp8tGaw/exec`);
    // `mailto:info@comdecon.com&subject=${subject+" - "+urgency+" by "+name}&body=${message}`;

  }
  //#endregion Email Handler
  //#region Form validation
  let form = document.querySelector("#contact-form");
  let emailInput = document.querySelector("#email");

  let showErrorMessage = (input, message) => {
    let container = input.parentElement; //.input-wrapper

    let error = container.querySelector(".error-message");
    if (error) container.removeChild(error); //clear existing
    if (message) {
      let error = document.createElement("div");
      error.classList.add("error-message");
      error.innerText = message;
      error.appendChild(document.createElement("br"));
      error.appendChild(document.createElement("br"));
      container.appendChild(error);
      return true;
    } //add new and show if message truthy
    return false; //just remove any existing
  }
  let emailInvalid = () => {
    let email = emailInput.value;
    return showErrorMessage(emailInput,
      !email ? "Email required." :
        !email.includes("@") || !email.includes(".") ?
          "Please enter a valid email address." :
          null); //custom message and true or return false (from show function)
  }
  form.addEventListener("submit", e => {
    if (emailInvalid()) e.preventDefault();
    else {
      sendWithEmailProgram();
      alert("Message is on its way.\nLine Thank you for reaching out!");
    }
  });
  emailInput.addEventListener("input", emailInvalid);
  //#endregion Form validation
})()