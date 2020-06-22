import Constants from "expo-constants";

export const prodUrl = "https://someapp.herokuapp.com";

const ENV = {
  dev: {
    apiUrl: "http://localhost:19002/",
  },
  prod: {
    apiUrl: prodUrl,
  },
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
