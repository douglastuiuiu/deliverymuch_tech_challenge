const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const recipeService = require('./service/recipeService');

app.use(express.json());

app.get("/recipes", (req, res) => {
    let ingredients = req.query.i;
    let result = {
        "keywords": [ingredients.split(",")],
        "recipes": []
    };

    if (ingredients.split(",").length > 3) {
        res.status(500).send('Quantity of ingredients exceeded!');
    }

    recipeService.findRecipesByIngredinents(ingredients).then((recipes) => {
        result.recipes = recipes;
        return res.json(result);
    }).catch((err) => {
        return res.send(err);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
