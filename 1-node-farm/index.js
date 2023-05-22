const fs = require("fs");
const http = require("http");
const url = require("url");

require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

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
const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  "utf-8"
);
const dataFromStringToObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataFromStringToObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataFromStringToObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(
      "<h1 style='color:red';>This page doesn't exist or has been moved...</h1><br><a href='/'>Go back to home</a>"
    );
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to server requests on port 8000!");
});
