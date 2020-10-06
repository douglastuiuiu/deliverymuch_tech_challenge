const http = require('http');
const Promise = require('promise');

const recipePuppyUrl = "http://www.recipepuppy.com/api/?i=";
const gifService = require('./gifService');

let fn = function(ingredients) {
    var promise = new Promise(function(resolve, reject) {
        http.get(recipePuppyUrl + ingredients, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                let result = [];

                JSON.parse(data).results.forEach((element) => {
                    //TODO implementar busca de gifs, ajustar sincronia entre metodos e
                    //gifService.findGifByRecipeTitle(element.title).then((gif) => {
                        let item = {
                            "title": element.title,
                            "ingredients": element.ingredients.replace(", ", ",").split(",").sort(),
                            "link": element.href
                            //"gif": gif
                        }

                        result.push(item);
                    //});
                });

                resolve(result);
            });
        });
    });

    return promise;
}

module.exports = {
    findRecipesByIngredinents: fn
}