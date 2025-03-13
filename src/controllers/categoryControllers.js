import { Category } from "../models/CategoryModel.js";
import { handleControllerError } from "../lib/utils.js";

export const getAllCategories = async (request, response) => {
    try {
        const categories = await Category.find({});
        response.json(categories);

    } catch (error) {
        return handleControllerError(response, error, "getAllCategories");
    }
};

export const getCategoryById = async (request, response) => {
    try {
        const category = await Category.findById(request.params.id);

        if (!category) {
            return sendErrorResponse(response, 404, "Category Not Found");
        }

        response.json(category);
    } catch (error) {
        return handleControllerError(response, error, "getCategoryById");
    }
};

export const createCategory = async (request, response) => {
    try {
        const { name } = request.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return sendErrorResponse(response, 400, "Category already exists");
        }

        const newCategory = await Category.create({ name });
        response.status(201).json(newCategory);
    } catch (error) {
        return handleControllerError(response, error, "createCategory");
    }
};

export const updateCategory = async (request, response) => {
    try {
        const { name } = request.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            request.params.id,
            { name },
            { new: true, runValidators: true } // { new: true } returns the updated doc, runValidators enforces schema rules
        );

        if (!updatedCategory) {
            return sendErrorResponse(response, 404, "Category Not Found");
        }

        response.json(updatedCategory);
    } catch (error) {
        return handleControllerError(response, error, "updateCategory");
    }
};

export const deleteCategory = async (request, response) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(request.params.id);

        if (!deletedCategory) {
            return sendErrorResponse(response, 404, "Category Not Found");
        }

        response.json({ message: "Category deleted successfully" });
    } catch (error) {
        return handleControllerError(response, error, "deleteCategory");
    }
};

