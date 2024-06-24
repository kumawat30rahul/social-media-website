const EnvConfig = () => {
  let config = {
    env: {
      local: {
        baseurl: "http://localhost:5000",
      },
      production: {
        baseurl: process.env.PROD_URL,
      },
    },
  };

  let env = process.env.NODE_ENV || "local";

  console.log(`Environment: ${env}`);

  return {
    envBaseurl: config.env[env].baseurl,
  };
};

export default EnvConfig;
