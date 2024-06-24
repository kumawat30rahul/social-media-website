const EnvConfig = () => {
  let config = {
    env: {
      development: {
        baseurl: "http://localhost:5000",
      },
      production: {
        baseurl: process.env.PROD_URL,
      },
    },
  };

  let env = process.env.NODE_ENV;
  console.log("env", env);

  return {
    envBaseurl: env,
  };
};

export default EnvConfig;
