const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Jenkins CI/CD Pipeline Running Successfully",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "jenkins-cicd-pipeline"
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Application running on port ${PORT}`);
  });
}

module.exports = app;
