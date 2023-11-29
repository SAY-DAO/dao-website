document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#SendEmail").onclick = () => {
    console.log("1");

    Email.send({
      SecureToken: "e3844cad-dd39-4c17-965b-86f796f952e6",
      To: "them@website.com",
      From: "you@isp.com",
      Subject: "This is the subject",
      Body: "And this is the body",
    }).then((message) => alert(message));

    // Email.send({
    //     Host : "https://smartermail.bertina.us",
    //     Port:"465",
    //     Username : "info@say.company",
    //     Password : "}Iww[+-U7ew~",
    //     To : 'ehsan@say.company',
    //     From : "info@say.company",
    //     Subject : "This is the subject",
    //     Body : "And this is the body"
    //
    // }).then(( message) => {
    //     console.log("3");
    //     alert(message)
    //
    // });
  };
});
