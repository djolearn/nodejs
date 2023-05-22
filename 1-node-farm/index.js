const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
///////////////////////////////////////////
/////////////////FILES
// Synchronous - Blocking code
// const textInput = fs.readFileSync("./lyrics.txt", "utf-8");
// console.log(textInput);

// const addText = `Love song: ${textInput}`;

// fs.writeFileSync("./lyrics.txt", addText);

// console.log("Uspesno izvrsena promena");

// Asynchronous - Non - Blocking Code

// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
//   if (err) {
//     return console.log("Error has occured.😡");
//   }
//   fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         "./starter/txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("File has been written😀");
//         }
//       );
//     });
//   });
// });
// console.log("Will read file");
/////////////////////////////////////////
////////////////SERVER

const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/home") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("<h1 style='color:lightgreen';>This is a home page!</h1>");
  } else if (pathName === "/kontakt") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("<h1 style='color:lightblue';>This is a contact page!</h1>");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(
      "<h1 style='color:red';>This page doesn't exist or has been moved...</h1><br><a href='/home'>Go back to home</a>"
    );
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to server requests on port 8000!");
});
