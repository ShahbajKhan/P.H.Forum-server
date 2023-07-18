const mongoose = require("mongoose");

const { NODE_ENV, DATABASE_PROD,DATABASE_LOCAL } = process.env;

let DB_URL;

// if (process.argv[2] && process.argv[2] === "dblocal") DB_URL = DBLocal;
if (NODE_ENV === "production") {
  DB_URL = DATABASE_PROD;
} else if (NODE_ENV === "development") {
  DB_URL = DATABASE_LOCAL;
}
console.log({dbUrl : DB_URL});
module.exports = () => {
  console.log(`connecting to ${NODE_ENV} DB...`);
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log("err", err);
    });
};
