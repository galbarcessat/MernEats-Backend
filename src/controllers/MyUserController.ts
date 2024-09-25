import { Request, Response } from "express";
import { User } from "../models/user";

async function createCurrentUser(req: Request, res: Response) {
    try {
        const { auth0Id } = req.body
        const existingUser = await User.findOne({ auth0Id })
        if (existingUser) {
            return res.status(200).send()
        }

        const newUser = new User(req.body)
        await newUser.save()

        res.status(201).json(newUser.toObject())
    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: "Error creating user" })
    }
}

async function updateCurrentUser(req: Request, res: Response) {
    try {
        const { name, adressLine1, city, country } = req.body
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.name = name
        user.adressLine1 = adressLine1
        user.city = city
        user.country = country

        await user.save()

        res.send(user)

    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: "Error updating user" })
    }
}

export default {
    createCurrentUser,
    updateCurrentUser
}