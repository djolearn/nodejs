const fs = require("fs");

// Synchronous - Blocking code
// const textInput = fs.readFileSync("./lyrics.txt", "utf-8");
// console.log(textInput);

// const addText = `Love song: ${textInput}`;

// fs.writeFileSync("./lyrics.txt", addText);

// console.log("Uspesno izvrsena promena");

// Asynchronous - Non - Blocking Code

fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    return console.log("Error has occured.😡");
  }
  fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(
        "./starter/txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (err) => {
          console.log("File has been written😀");
        }
      );
    });
  });
});
console.log("Will read file");
