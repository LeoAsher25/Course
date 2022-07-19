const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost/LA_education", {
      useNewUrlParser: true,
      //   useUnifinedTopology: true,
    });
    console.log("Connect DB successfully!");
  } catch (error) {
    console.log("Connect DB error: ", error);
  }
}

module.exports = { connect };
