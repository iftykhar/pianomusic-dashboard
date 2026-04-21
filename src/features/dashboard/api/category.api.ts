// features/dashboard/api/category.api.ts
import { api } from "@/lib/api";

export const createCategoryApi = (data: FormData) => {
    return api.post("/content/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export const updateCategoryApi = ({ id, data }: { id: string; data: FormData }) => {
    return api.patch(`/content/${id}`, data);
}

export const deleteCategoryApi = (id: string) => {
    return api.delete(`/content/${id}`);
}