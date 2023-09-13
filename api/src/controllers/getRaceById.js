const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/'
const URL_2 = 'https://cdn2.thedogapi.com/images';
const { API_KEY } = process.env;
const { Dog } = require('../db')

const getRaceById = async (req, res) => {
const { idRaza } = req.params;
try {
    let response2 = await Dog.findOne({where: {id: idRaza}});
    if (response2) {
        res.status(201).send(response2);
    }
    else {
        let { data } = await axios(`${URL}${idRaza}?api_key=${API_KEY}`)
        if (data) {
            data.reference_image_id = `${URL_2}/${data.reference_image_id}.jpg`
            res.status(200).send(data);
        }
        else {
            res.status(404).json('No se ha encontrado ninguna raza con esa ID');
        }
    }
} catch (error) {
    res.status(500).json('Error: ' + error.message);
}

}


module.exports = getRaceById;