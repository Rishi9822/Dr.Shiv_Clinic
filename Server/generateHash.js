// Server/generateHash.js
import bcrypt from "bcrypt";

const password = process.argv[2] || "ChangeThisPassword!";
bcrypt.hash(password, 10).then((hash) => {
  console.log("Hash:", hash);
});
