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
    if (/\d/.test(content)) {
      console.log("Your file contains numbers, which will cause errors during compression. Please remove the numbers and try again.");
    }
    else {
      compressFile(content, fileName);
    }
});
}

function compressFile(content, fileName) {
  //Divides the file by line
  content = content.split(/\r?\n/);
  fileName += "-compressed.txt";

  //Initializes compressed file
  compressed_file = [];
  compressed_line = "";

  //For each line in the file
  for (line in content) {
    console.log("'" + content[line] + "''");

    //Sets the current character to the character at the beginning of the line
    //Sets the number of characters in a row to 1.
    char_counter = 1;
    current_char = content[line].charAt(0);

    //For each character in the line
    for (var index=1; index <= content[line].length; index++) {

      //If the character is the same as the previous, add to char_counter
      if (content[line].charAt(index) === current_char) {
        char_counter += 1;
      }

      //if the index is the last in the line, or the character is different
      //write the compression to the line
      else if (index == (content[line].length) || content[line].charAt(index) != current_char) {
        compressed_line += char_counter.toString() + current_char;
        current_char = content[line].charAt(index);
        char_counter = 1;
      }
    }

    //Adds the compressed line to the file and clears the line
    compressed_file.push(compressed_line);
    compressed_line = "";
  }

  //Joins the compressed file array to become a string with a new-line characters
  compressed_file = compressed_file.join("\r\n");
  console.log(compressed_file);

  //Creates a new file in the system with the compression
  fs.writeFile(fileName, compressed_file, function(err) {
    if (err) {
      throw err;
    }
    console.log("Your file has been compressed and saved in the same location as " + fileName + ".");
  });
}

readFile();
