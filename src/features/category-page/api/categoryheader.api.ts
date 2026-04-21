import { api } from "@/lib/api";
import { CategoryHeader } from "../types";

// GET
export const getCategoryHeader = () => {
    return api.get("/content/get-header");
};


// POST
export const postCategoryHeader = (data: CategoryHeader) => {
    return api.post("/content/header", data);
};