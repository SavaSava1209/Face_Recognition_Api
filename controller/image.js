const Clarifai = require('clarifai') ;

const app = new Clarifai.App({
 apiKey: 'e47d257a61564aea96c1aab04d0b2d0a'
});

const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries=> res.json(entries[0]))
        .catch(err => res.status(400).json('Unable to get Uers'))
};

const handleImageApiCall = (req, res) => {
    app.models   
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => console.log('API is not responding'))
}


module.exports = {
    handleImage,
    handleImageApiCall

}