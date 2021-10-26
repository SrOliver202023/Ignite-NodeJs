import { Router } from "express";

import { Category } from "../model/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (req, res) => {
    const { name, description } = req.body;

    const newCategory = new Category();
    Object.assign(newCategory, {
        name,
        description,
    });

    categories.push(newCategory);

    return res.status(201).json(newCategory);
});

export { categoriesRoutes };
