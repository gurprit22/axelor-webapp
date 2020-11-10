const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors');

const host = "localhost";
let   port = 5000;

function startApp() {
  var app = express();
  app.use(cors());

  app.use(
    "/*",
    createProxyMiddleware({
      target: "http://sos.axelor.com:8080/",
      changeOrigin: true,
      pathRewrite: function (path) {
       return  `/axelor-portal${path}`;
      },
      onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';  
        if (proxyRes.headers["set-cookie"]) {
          const cookie = proxyRes.headers["set-cookie"];
          const getCookie = (str) => {
            return str
              .split(";")
              .filter((x) => {
                const [key] = x.split("=");
                return !["Path", "Secure", "HttpOnly"].includes(key.trim());
              })
              .join(";");
          };
          proxyRes.headers["set-cookie"] = Array.isArray(cookie)
            ? cookie.map(getCookie)
            : getCookie(cookie);
        }
      },
    })
  );

  app.listen(port, () => {
    console.log("Server is running on http://" + host + ":" + port + "/");
  });
}

startApp();