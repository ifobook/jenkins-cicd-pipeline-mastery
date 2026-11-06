const test = require("node:test");
const assert = require("node:assert/strict");

const app = require("../src/app");

let server;
let baseURL;

test.before(async () => {
  server = app.listen(0, "127.0.0.1");

  await new Promise((resolve) => {
    if (server.listening) return resolve();
    server.once("listening", resolve);
  });

  baseURL = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test("GET / returns application information", async () => {
  const response = await fetch(baseURL);

  assert.equal(response.status, 200);

  const data = await response.json();

  assert.equal(
    data.message,
    "Jenkins CI/CD Pipeline Running Successfully"
  );
});

test("GET /health returns healthy status", async () => {
  const response = await fetch(`${baseURL}/health`);

  assert.equal(response.status, 200);

  const data = await response.json();

  assert.equal(data.status, "healthy");
});

test("GET /unknown returns 404", async () => {
  const response = await fetch(`${baseURL}/unknown`);

  assert.equal(response.status, 404);
});
