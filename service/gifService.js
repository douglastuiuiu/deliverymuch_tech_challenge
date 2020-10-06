const https = require('https');
const Promise = require('promise');

const giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=5b7QezFlRxonuN3Y1tUMYxWmMQW6CjkL&q=";

let fn = function(title) {
    var promise = new Promise(function(resolve, reject) {
        https.get(giphyUrl + title, (res) => {
            let data = '';

            res.on('data', (chunck) => {
                data += chunck;
            });

            res.on('end', () => {
                let result = JSON.parse(data).data[0].embed_url;

                resolve(result);
            });
        });
    });

    return promise;
};

module.exports = {
    findGifByRecipeTitle: fn
}