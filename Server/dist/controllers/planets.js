var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from 'joi';
import pgPromise from "pg-promise";
const db = pgPromise()("postgres://postgres:Gegele.db@localhost:5432/postgres");
console.log(db);
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        );
    `);
    yield db.none(`INSERT INTO planets (name)  VALUES ('Earth')`);
    yield db.none(`INSERT INTO planets (name)  VALUES ('Mars')`);
    yield db.none(`INSERT INTO planets (name)  VALUES ('Jupiter')`);
});
setupDb();
/* type Planet = {
    id: number;
    name: string;
}

type Planets = Planet[];

let planets: Planets = [
    {id: 1, name: 'Earth'},
    {id: 2, name: 'Mars'}
] */
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
});
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json(planet);
});
const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
});
const create = (req, res) => {
    const { id, name } = req.body;
    const newPlanet /* : Planet */ = { id, name };
    const validatedNewPlanet = planetSchema.validate(newPlanet);
    if (validatedNewPlanet.error) {
        return res.status(400).json({ msg: validatedNewPlanet.error.details[0].message });
    }
    else {
        /* planets = [...planets, newPlanet] */
        res.status(201).json({ msg: 'The planet was created.' }); // STATUS 201 significa che la nostra post è stata creata
    }
};
const updateById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p) //cerchiamo tramite id se c'è il pianeta che vogliamo modificare, se c'è lo aggiorniamo, altrimenti rimane invariato
    res.status(200).json({ msg: 'The planet was updated.' });
};
const deleteById = (req, res) => {
    const { id } = req.params;
    //planets = planets.filter(p => p.id !== Number(id)) 
    res.status(200).json({ msg: 'The planet was deleted.' });
};
export { getAll, getOneById, create, updateById, deleteById };
