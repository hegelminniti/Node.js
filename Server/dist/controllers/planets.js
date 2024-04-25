import Joi from 'joi';
let planets = [
    { id: 1, name: 'Earth' },
    { id: 2, name: 'Mars' }
];
const getAll = (req, res) => {
    res.status(200).json(planets);
};
const getOneById = (req, res) => {
    const { id } = req.params;
    const planet = planets.find(p => p.id === Number(id));
    res.status(200).json(planet);
};
const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
});
const create = (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    const validatedNewPlanet = planetSchema.validate(newPlanet);
    if (validatedNewPlanet.error) {
        return res.status(400).json({ msg: validatedNewPlanet.error.details[0].message });
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: 'The planet was created.' }); // STATUS 201 significa che la nostra post è stata creata
    }
};
const updateById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map(p => p.id === Number(id) ? (Object.assign(Object.assign({}, p), { name })) : p); //cerchiamo tramite id se c'è il pianeta che vogliamo modificare, se c'è lo aggiorniamo, altrimenti rimane invariato
    res.status(200).json({ msg: 'The planet was updated.' });
};
const deleteById = (req, res) => {
    const { id } = req.params;
    planets = planets.filter(p => p.id !== Number(id));
    res.status(200).json({ msg: 'The planet was deleted.' });
};
export { getAll, getOneById, create, updateById, deleteById };
