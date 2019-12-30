const axios = require('axios');

const app_id = 'b358c577';
const app_key = '1bd2fd172c50e891ee839305f8e7b98a';

const getRecipe = async word => {

    const url = `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=${word}`;

    const response = await axios.get(url);

    const hits = response.data.hits;

    const data = [];

    for (i = 0; i < 5; i++) {

        const ingredients = [];

        const recipe = hits[i].recipe;
        const { label, ingredientLines, url } = recipe;

        for (j = 0; j < ingredientLines.length; j++) {
            ingredients.push(ingredientLines[j]);
        }

        const recipeData = { label, ingredients, url };
        data.push(recipeData);
    }

    return data;
};

module.exports = getRecipe;


