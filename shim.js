const getUserHandler = userHandlerValue => {
  const module = userHandlerValue
    .split(".")
    .slice(0, -1)
    .join(".");
  const handler = userHandlerValue.split(".").slice(-1)[0];

  const userModule = require("./${module}.js");
  return userModule[handler];
};

userHandler = getUserHandler(process.env.USER_HANDLER);

module.exports.sns = async (event, context) => {
  for (const record of event.Records) {
    await userHandler(JSON.parse(record.Sns.Message));
  }
};
