import { api } from "@/lib/api";

export async function getAllBooks() {
    try {
        // Note: Confirm if the GET endpoint is also /order/upload-book
        // or if it should be /order/all-books or similar.
        const res = await api.get("/order/upload-book");
        return res.data;
    } catch (error) {
        console.error("Error getting all books:", error);
        throw error;
    }
}

export async function uploadBook(formData: FormData) {
    try {
        const res = await api.patch("/order/upload-book", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error uploading book:", error);
        throw error;
    }
}
