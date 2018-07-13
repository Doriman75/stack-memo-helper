// build script
const fs = require("fs");

var lines = fs.readFileSync("index-orig.html", "utf-8").split("\n");

function template(l) {
  var result = l;
  if (l.trim().startsWith("template: §")) {
    var filename = l.trim().substring("template: §".length);
    while (filename.indexOf('"') != -1) filename = filename.replace('"', '').trim();
    l = "template: `\n" + fs.readFileSync(filename, "utf-8") + "\n`";
  }
  return l;
}

function replace(l) {
  var out = l;
  if (l.startsWith("§")) out = fs.readFileSync(l.substring(1).trim(), "utf-8");

  out = out.split("\n").map(l => template(l)).join("\n");

  console.log(out);
}


lines.forEach(l => replace(l));