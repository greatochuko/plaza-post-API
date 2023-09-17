import Express from "express";

const app = Express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
