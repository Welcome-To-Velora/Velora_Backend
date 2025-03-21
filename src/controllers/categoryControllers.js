import { Category } from "../models/CategoryModel.js";
import { handleControllerError, sendErrorResponse, sendSuccessResponse } from "../lib/utils.js";

export const getAllCategories = async (request, response) => {
    try {
        const categories = await Category.find({});
        return sendSuccessResponse(response, 200, "Categories retrieved successfully", categories);

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

        return sendSuccessResponse(response, 200, "Category retrieved successfully", category);
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
        return sendSuccessResponse(response, 201, "Category Created successfully", newCategory);
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

        return sendSuccessResponse(response, 200, "Category Updated successfully", updateCategory);
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

        return sendSuccessResponse(response, 200, "Category Deleted successfully");
    } catch (error) {
        return handleControllerError(response, error, "deleteCategory");
    }
};

