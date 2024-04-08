const figlet = require("figlet");

figlet("Ciao, Hegel", function (err, data) {
    if (err) {
      console.log("Qualcosa è andato storto...");
      console.dir(err);
      return;
    }
    console.log(data);
  });