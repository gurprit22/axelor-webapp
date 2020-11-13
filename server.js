const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const host = "localhost";
let port = 5000;

function startApp() {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    "/*",
    createProxyMiddleware({
      target: "http://sos.axelor.com:8080/",
      changeOrigin: true,
      pathRewrite: function (path) {
        return `/axelor-portal${path}`;
      },
      onProxyRes(proxyRes) {
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
          proxyRes.headers["cookie"] = Array.isArray(cookie)
            ? cookie.map(getCookie)
            : getCookie(cookie);
        }
        proxyRes.headers["Access-Control-Allow-Credentials"] = true;
        proxyRes.headers["Access-Control-Expose-Headers"] = "cookie, date";

      },
    })
  );

  app.listen(port, () => {
    console.log("Server is running on http://" + host + ":" + port + "/");
  });
}

startApp();


/* 
API calls 
1. list of customers 'http://sos.axelor.com:8080/axelor-portal/ws/rest/com.axelor.apps.base.db.Partner/search'
2. customer contact 'http://sos.axelor.com:8080/axelor-portal/ws/rest/com.axelor.apps.base.db.Partner/search'
3. currency list 'http://sos.axelor.com:8080/axelor-portal/ws/rest/com.axelor.apps.base.db.Currency/search'
4. Action API 'http://sos.axelor.com:8080/axelor-portal/ws/action'
5. API to get Products 'http://sos.axelor.com:8080/axelor-portal/ws/rest/com.axelor.apps.base.db.Product/search' 
6. API to get unit 'http://sos.axelor.com:8080/axelor-portal/ws/rest/com.axelor.apps.base.db.Unit/search'
 
  com.axelor.apps.sale.db.SaleOrder


  {code: "AXE", name: "Axelor", currency: {code: "EUR", name: "Euro", id: 46}, id: 1}
  
*/