import { Request, Response } from "express";
import Joi from 'joi';
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:Gegele.db@localhost:5432/postgres")
console.log(db)

const setupDb = async () => {
     await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );
    `)

    await db.none(`INSERT INTO planets (name)  VALUES ('Earth')`)
    await db.none(`INSERT INTO planets (name)  VALUES ('Mars')`)
    await db.none(`INSERT INTO planets (name)  VALUES ('Jupiter')`)

}

setupDb()

/* type Planet = {
    id: number;
    name: string;
}

type Planets = Planet[];

let planets: Planets = [
    {id: 1, name: 'Earth'},
    {id: 2, name: 'Mars'}
] */

const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets;`)
    res.status(200).json(planets)
  }

const getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id))

    res.status(200).json(planet)
} 


const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
})



const create = async (req: Request, res: Response) => {
    const {id, name} = req.body
    const newPlanet/* : Planet */ = {id, name}
    const validatedNewPlanet = planetSchema.validate(newPlanet)

    if(validatedNewPlanet.error){
        return res.status(400).json({msg: validatedNewPlanet.error.details[0].message})
    } else {

        /* planets = [...planets, newPlanet] */
    
        res.status(201).json({msg: 'The planet was created.'}) // STATUS 201 significa che la nostra post è stata creata
    }

}

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    // planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p) //cerchiamo tramite id se c'è il pianeta che vogliamo modificare, se c'è lo aggiorniamo, altrimenti rimane invariato

    res.status(200).json({msg: 'The planet was updated.'})
}

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //planets = planets.filter(p => p.id !== Number(id)) 

    res.status(200).json({msg: 'The planet was deleted.'})
}

const createImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fileName = req.file?.path;

    await db.none('UPDATE planets SET image = $1 WHERE id = $2', [fileName, id]);

    res.status(201).json({ msg: "Planet image uploaded successfully." });
}

export {
    getAll, getOneById, create, updateById, deleteById, createImage
}