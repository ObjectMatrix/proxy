/**
- Forwarding only requests that are authorized to access a service (with a more sophisticated authorization/authentication middleware)
- Distributing the requests equally among many deployments of an API service
- Logging every requests going to a Back End API service
- Setting up a React app with your Node.js proxy server
- And a lot more!
- yarn add express http-proxy-middleware morgan
*/
const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');


// Create Express Server
const app = express();

// Configuration
const default_PORT = 3001;
const PORT = process.env.PORT || default_PORT;
const HOST = "localhost";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
  res.send('This is a proxy service which proxies jsonplaceholder APIs.');
});


// Authorization
app.use('', (req, res, next) => {
  if (req.headers.authorization) {
      next();
  } else {
      res.sendStatus(403);
  }
});

// Proxy endpoints
/**
 * Then we define the proxy endpoint. We want to proxy all
 * requests starting with /json_placeholder to the notorious
 * JSONPlaceholder API (a simple mock API which contains
 * multiple endpoints supporting all HTTP methods).
 * We also define a pathRewrite so that /json_placeholder
 * is omitted when forwarded to the API
 */
app.use('/libertymutual', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      [`^/libertymutual`]: '',
  },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
