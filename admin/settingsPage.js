const Setting = require("../models/Setting.js");

const settingsHandler = async (request, response, context) => {
  const settings = await Setting.findAll();

  return {
    settings,
  };
};

module.exports = settingsHandler;
