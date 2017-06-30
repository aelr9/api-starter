const config = {
  'secret': process.env.NODEDEMO_SECRET,
  'database': process.env.NODEDEMO_DBURI,
  'saltRounds': 10,
};

module.exports = config;