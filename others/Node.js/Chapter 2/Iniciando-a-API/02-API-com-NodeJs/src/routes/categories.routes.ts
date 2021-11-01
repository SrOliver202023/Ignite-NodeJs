import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRepository = new CategoriesRepository();

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) => {
    const { name, description } = req.body;

    categoriesRepository.create({ name, description });

    return res.status(201).json({ msg: "Created with Success!" });
});

export { categoriesRoutes };
