const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.get("/", (req, res) => {
  const data = fs.readFileSync("count.txt", { encoding: "utf8", flag: "r" });
  console.log(data);
  res.json({ calls: data });
});
app.get("/getReq", (req, res) => {
  const data = fs.readFileSync("req.txt", { encoding: "utf8", flag: "r" });
  console.log(data);
  res.json({
    req: data,
  });
});

app.post("/incCount", (req, res) => {
  const data = fs.readFileSync("count.txt", { encoding: "utf8", flag: "r" });
  console.log(parseInt(data) + 1);
  const ans = (parseInt(data) + 1).toString();
  fs.writeFileSync("count.txt", ans);
  res.json({ calls: ans });
});
app.post("/saveReq", async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  console.log(req);
  fs.writeFileSync("req.txt", ip);
  res.send(ip);
});
app.put("reset", (req, res) => {
  fs.writeFileSync("count.txt", "0");
  res.json({ calls: 0 });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Started server");
});
