const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash-password -- yourPasswordHere");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nAdd this to your .env.local / Render environment variables:\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
