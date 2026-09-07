const express = require("express");
const path = require("path");
const app = express();
const bookRouter = require("./src/router/book.routes");

app.use(express.json());
app.use("/books", bookRouter);

app.use(express.static(path.join(__dirname, "public")));


app.use("/books", bookRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/views/book-list.html"));
})
app.listen(3000, () => {
    console.log('serve đang chạy ở cổng 3000')
});