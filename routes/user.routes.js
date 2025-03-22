import { Router } from "express";

const userRouter = Router();

// Route to get all users
userRouter.get('/', (req, res) => {
    res.send({ title: 'Get all users' });
});

// Route to get a user by ID
userRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid ID, must be a number' });
    }
    res.send({ title: `Get user with id ${id}` });
});

// Route to create a new user
userRouter.post('/', (req, res) => {
    const newUser = req.body; // Ensure body parsing middleware is used
    if (!newUser) {
        return res.status(400).send({ error: 'Invalid user data' });
    }
    res.status(201).send({ title: 'User created', data: newUser });
});

// Route to update a user by ID
userRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid ID, must be a number' });
    }
    res.send({ title: `Updated user with id ${id}`, data: updatedData });
});

// Route to delete a user by ID
userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid ID, must be a number' });
    }
    const userDeleted = true; // Replace with actual deletion logic
    if (!userDeleted) {
        return res.status(404).send({ error: `User with id ${id} not found` });
    }
    res.send({ title: `Deleted user with id ${id}` });
});

export default userRouter;