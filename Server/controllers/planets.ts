import { Request, Response } from "express";
import Joi from 'joi';


type Planet = {
    id: number;
    name: string;
}

type Planets = Planet[];

let planets: Planets = [
    {id: 1, name: 'Earth'},
    {id: 2, name: 'Mars'}
]

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets)
  }

const getOneById = (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = planets.find(p => p.id === Number(id))

    res.status(200).json(planet)
} 


const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
})



const create = (req: Request, res: Response) => {
    const {id, name} = req.body
    const newPlanet: Planet = {id, name}
    const validatedNewPlanet = planetSchema.validate(newPlanet)

    if(validatedNewPlanet.error){
        return res.status(400).json({msg: validatedNewPlanet.error.details[0].message})
    } else {

        planets = [...planets, newPlanet]
    
        res.status(201).json({msg: 'The planet was created.'}) // STATUS 201 significa che la nostra post è stata creata
    }

}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p) //cerchiamo tramite id se c'è il pianeta che vogliamo modificare, se c'è lo aggiorniamo, altrimenti rimane invariato

    res.status(200).json({msg: 'The planet was updated.'})
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    planets = planets.filter(p => p.id !== Number(id)) 

    res.status(200).json({msg: 'The planet was deleted.'})
}

export {
    getAll, getOneById, create, updateById, deleteById
}