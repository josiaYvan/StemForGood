const Adler32 = require("adler32-js");
const hash = new Adler32();

export default (text) => {
  return hash.update(text);
};
