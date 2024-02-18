const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

app.use(express.json());

app.get("/users", async (req, res) => {
try {
    const users = await User.find();
    res.status(200).json(users);
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

app.post("/users", async (req, res) => {
try {
    const newUser = req.body;
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

app.put("/users/:id", async (req, res) => {
try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
    });

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

app.delete("/users/:id", async (req, res) => {
try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
