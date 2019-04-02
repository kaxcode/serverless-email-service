const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ses = new AWS.SES({
  region: "us-east-1" // Set the region in which SES is configured
});

app.get("/", (req, res) => {
  res.send("AWS SES - Email Webservice");
});

/**
 * Create a new SES Template based on the request data
 */
app.post("/template", (req, res) => {
  const { templateName, subject, body } = req.body;

  var params = {
    Template: {
      TemplateName: templateName,
      HtmlPart: body,
      SubjectPart: subject
    }
  };

  ses.createTemplate(params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(200);
    }
  });
});

module.exports.handler = serverless(app);
