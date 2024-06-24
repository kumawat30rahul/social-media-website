const EnvConfig = () => {
  let config = {
    env: {
      development: {
        baseurl: "http://localhost:5000",
      },
      production: {
        baseurl: process.env.VITE_PROD_URL,
      },
    },
  };

  let env = process.env.VITE_NODE_ENV;
  console.log("env", env);

  return {
    envBaseurl: config.env[env].baseurl,
  };
};

export default EnvConfig;
