var fs = require('fs');

function readFile() {
  fs.readFile(process.argv[2], "utf-8", function read(err, data) {
    //Throws error if file cannot be read
    if (err) {
        throw err;
    }

    //Console logs and saves the data into a variable, then calls a function to process the file.
    //Gets file title
    fileName = process.argv[2].substr(0, process.argv[2].indexOf('.'));
    content = data;
    console.log(content);
    decompressFile(content, fileName);
});
}

function decompressFile(content, fileName) {
  //Splits the file content into individual lines
  content = content.split(/\r?\n/);

  //Renames the file
  if (fileName.indexOf("compressed") > 0) {
    fileName = fileName.substr(0, fileName.indexOf("compressed")) + "decompressed.txt";
    console.log("A" + fileName)
  }
  else {
    fileName += "decompressed.txt"
    console.log("B" + fileName)
  }

  //Initializes variables
  var decompressed_file = [];

  for (line in content) {
    //Create empty line
    var decompressed_line = "";

    //Initialize blank instances of the times_repeated and character variables
    var times_repeated = "";
    var character = "";

    for (index=0; index < content[line].length; index++) {
      if ("0123456789".indexOf(content[line].charAt(index)) >= 0) {
        //If character a number, add to the times_repeated Str
        times_repeated += content[line].charAt(index);

      }
      else {
        //If character not a number, take it in as the character to be repeated,
        //parse the times_repeated variable, and add the string to the line
        times_repeated = parseInt(times_repeated)+1;
        character = content[line].charAt(index);
        var repeated_char = "";
        for (i=1; i < times_repeated; i++) {
          repeated_char += character;
        }
        decompressed_line += repeated_char;
        repeated_char = "";
        times_repeated = "";
      }
    }
    decompressed_file.push(decompressed_line);
  }
  decompressed_file = decompressed_file.join("\r\n");

  fs.writeFile(fileName, decompressed_file, function(err) {

    console.log("Your file has been decompressed and saved in the same location as " + fileName + ".");
  });
}

readFile();
