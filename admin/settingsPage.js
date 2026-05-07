const Setting = require("../models/Setting");

const settingsHandler = async (request, response, context) => {
  const settings = await Setting.findAll();

  return {
    settings,
  };
};

module.exports = settingsHandler;
