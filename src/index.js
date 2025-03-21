import React from "react";
import { createRoot } from "react-dom/client";
import { YMInitializer } from "react-yandex-metrika";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";
import Routes from "./routes.jsx";
import RouteChangeTracker from "./components/routeChangeTracker";
import {
  ScrollToTop,
  getServerUrl,
  useLocalStorage,
  SEO,
  OverlayWrapper,
  ErrorBoundary,
  ThemeProvider,
} from "@staketab/lib";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.sass";
import "./assets/styles/global.sass";

import needAuth from "./configs/needAuth";
import axios from "axios";
import { env } from "./configs/env";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/index";
import CryptoJS from "crypto-js";
import md5 from "md5";

if (env === "production") {
  // ReactGA.initialize('G-2Y2GRRXBD6')
}

const queryClient = new QueryClient({});

const App = () => {
  //
  const [, setToken] = useLocalStorage("token");
  const [, setRefreshToken] = useLocalStorage("refreshToken");

  const getLocalAccessToken = () => {
    const accessToken = window.localStorage.getItem("token");
    return accessToken;
  };

  const getLocalRefreshToken = () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
  };
  const removeLocalAccessToken = () => {
    window.localStorage.removeItem("token");
  };
  const removeLocalRefreshToken = () => {
    window.localStorage.removeItem("refreshToken");
  };

  const getPath = (url) => {
    var a = document.createElement("a");
    a.href = url;
    return a.pathname.substr(0, 1) === "/" ? a.pathname : "/" + a.pathname;
  };

  const generateSignature = (path, timestamp, secret) => {
    const dataString = `${path}:${timestamp}`;
    return CryptoJS.HmacSHA256(dataString, secret).toString(CryptoJS.enc.Hex);
  };
  const generateAppId = (timestamp, secret) => {
    const data = `2024-${timestamp}`;
    const hash = CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Hex);
    let result = "";
    for (let i = 0; i < hash.length; i++) {
      if (i % 2 === 1) {
        result += hash[i];
      }
    }
    return result;
  };

  axios.interceptors.request.use(
    (config) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const sec = "wpTujoYEJUqhalFjhioogmrdG";
      const url = new URL(config.url, config.baseURL);
      const path = url.pathname + (url.search || "");
      let changed = path.replace(/\/$/, "").split("/");
      changed = changed[changed.length - 1].split("?");
      changed = changed[0];
      const secr = "NWcEQUlBRY";

      const signature = md5(generateSignature(changed, timestamp, sec));
      const appId = md5(generateAppId(timestamp, secr));
      const token = getLocalAccessToken();
      if (needAuth && token && getPath(config.url) !== "/auth/refresh") {
        config.headers["authorization"] = "Bearer " + token;
      }
      config.headers["X-API-Random"] = timestamp;
      config.headers["X-API-Checker"] = signature;
      config.headers["X-APP-Gen"] = appId;

      return config;
    },

    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const refreshToken = getLocalRefreshToken();
      const originalRequest = error.config;
      const refreshPath = "/auth/refresh";
      if (needAuth) {
        if (
          (error.response?.status === 403 || error.response?.status === 401) &&
          originalRequest &&
          !originalRequest.__isRetryRequest &&
          refreshToken &&
          !originalRequest.url?.includes(refreshPath)
        ) {
          return new Promise((resolve) => {
            originalRequest.__isRetryRequest = true;
            const response = axios
              .post(getServerUrl() + refreshPath, {
                refresh: refreshToken,
              })
              .then((res) => {
                setToken(res.data.access_token);
                setRefreshToken(res.data.refresh_token);
                return axios(originalRequest);
              })
              .catch((err) => {
                if (error.response?.status === 401) {
                  console.log("Bad refresh");
                  removeLocalAccessToken();
                  removeLocalRefreshToken();
                  window.location.reload();
                }
              });
            resolve(response);
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <>
      {/* ya metrics */}
      {env === "production" ? (
        <YMInitializer
          accounts={[90856009]}
          options={{
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
          }}
          version="2"
        />
      ) : null}
      {/* ya metrics */}
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeProvider>
              <OverlayWrapper />
              <Router>
                <div className="app-wrapper">
                  <SEO />
                  <ScrollToTop />
                  {/* GA metrics */}
                  {env === "production" ? <RouteChangeTracker /> : null}
                  {/* GA metrics */}
                  <div className="main-content">
                    <ErrorBoundary>
                      <Routes />
                    </ErrorBoundary>
                  </div>
                </div>
              </Router>
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
