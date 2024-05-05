import { Request, Response } from "express";
import Joi from 'joi';
import { db } from "../db.js";

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
    const newPlanet= {id, name}
    const validatedNewPlanet = planetSchema.validate(newPlanet)

    if(validatedNewPlanet.error){
        return res.status(400).json({msg: validatedNewPlanet.error.details[0].message})
    } else {
        res.status(201).json({msg: 'The planet was created.'}) // STATUS 201 significa che la nostra post è stata creata
    }

}

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    res.status(200).json({msg: 'The planet was updated.'})
}

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;

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