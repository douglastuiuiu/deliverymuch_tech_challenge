const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/recipes", (req, res) => {
    res.send("Recipes Route")
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
