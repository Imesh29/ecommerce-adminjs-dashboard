import { findAll } from "../models/Setting";

const settingsHandler = async (request, response, context) => {
  const settings = await findAll();

  return {
    settings,
  };
};

export default settingsHandler;
