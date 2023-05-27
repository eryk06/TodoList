import Category from "../models/category-model";
import { Request, Response } from "express";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const categories = await Category.find({
      user: user,
    });
    return res.send(categories);
  } catch (error) {
    res.send({ error: "Something went wrong" });
    console.log("error in getAllCategories", error);
    throw error;
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { color, icon, isEditable, name }: ICategory = req.body;
    const { user } = req;

    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });
    res.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    res.send({ error: "Something went wrong" });
    throw error;
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Category.deleteOne({ _id: id });
    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    res.send({ error: "Error in deleting the category" });
    throw error;
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = req.body;
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );
    res.send({ message: "Category updated successfully" });
  } catch (error) {
    console.log("error in updateCategory", error);
    res.send({ error: "Error in updating the category" });
    throw error;
  }
};
