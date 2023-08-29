const express = require("express");
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,X-Response-Time"
  );
  res.header("Access-Control-Expose-Headers", "X-Response-Time");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let axios = require("axios");
app.post("/myserver1/url", async function (req, res) {
  console.log("In post,req", req.body);
  try {
    let body = req.body;
    let baseURL = body.url;
    let auth =
      body.headers.auth === "Authorization"
        ? body.headers.authKey
        : "dummyvalue";
    console.log("before request", body);
    if (body.method === "GET") {
      let response = await axios.get(baseURL, {
        headers: { authorization: +auth },
      });
      console.log("Inside get response Line 35", response);
      let responseData = response.data;
      console.log("In line 36", typeof responseData);
      if (typeof responseData === "number") {
        responseData = "" + responseData;
        res.send(responseData);
      } else {
        console.log("Hello response");
        res.send(response.data);
      }
    }
    if (body.method === "POST") {
      let response = await axios.post(baseURL, body.body, {
        headers: { authorization: +auth },
      });
      console.log("post Data", response.data);
      res.send(response.data);
    }
    if (body.method === "PUT") {
      let response = await axios.put(baseURL, body.body, {
        headers: { authorization: +auth },
      });
      console.log("PUT Data", response.data);
      res.send(response.data);
    }
    if (body.method === "DELETE") {
      let response = await axios.delete(baseURL, {
        headers: { authorization: +auth },
      });
      console.log("PUT Data", response.data);
      res.send(response.data);
    }
  } catch (error) {
    console.log("Error line 67:", error.response || "hellostatus");
    res.send(error.response);
  }
});
