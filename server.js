const express = require("express");

const app = express();

app.get("/", (req, res) => res.json({ msg: "welcome to Contact Keeper Api" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
