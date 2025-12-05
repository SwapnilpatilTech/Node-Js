import { Books } from "../models/books.model.js";

export const addBook = async (req, res) => {
    try {
        const bookData = req.body;
        const newBook = await Books.create(bookData);

        // Send success response
        res.status(201).json({
            book: newBook,
        });
    } catch (error) {

        res.status(500).json({
            message: "Failed to add book",
            error: error.message,
        });
    }
};

export const deleteData = async (req, res) => {
    const { id } = req.params; 

    try {
        const result = await Books.deleteOne({ bookId: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Book not found. No data deleted.",
            });
        }
        res.status(200).json({
            message: "Book deleted successfully!",
            result,
        });
    } catch (error) {
        console.log("❌ Error in deleteData controller:", error.message);

        res.status(500).json({
            message: "Failed to delete the book",
            error: error.message,
        });
    }
};

export const getAllData = async (req, res) => {
    const { q } = req.query; 

    try {
        let filter = {};
        if (q) {
            const numberQuery = Number(q); 

            filter = {
                $or: [
                    { bookName: { $regex: q, $options: "i" } },
                    { author: { $regex: q, $options: "i" } },
                    { language: { $regex: q, $options: "i" } },
                    { category: { $regex: q, $options: "i" } },
                    { isbn: { $regex: q, $options: "i" } },
                    ...(isNaN(numberQuery)
                        ? []
                        : [
                            { publishYear: numberQuery },
                            { price: numberQuery },
                            { pages: numberQuery }
                        ])
                ]
            };
        }

        const books = await Books.find(filter);

        res.status(200).json({
            message: "Books fetched successfully",
            count: books.length,
            data: books,
        });

    } catch (error) {
        console.log("Error in getAllData controller:", error.message);

        res.status(500).json({
            message: "Failed to fetch books",
            error: error.message,
        });
    }
};

export const getDataById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Book ID is required!",
        });
    }

    try {
        const book = await Books.findOne({ bookId: id });
        if (!book) {
            return res.status(404).json({
                message: "Book not found!",
            });
        }

        res.status(200).json({
            message: "Book fetched successfully!",
            data: book,
        });

    } catch (error) {
        console.log("Error in getDataById controller:", error.message);

        res.status(500).json({
            message: "Failed to fetch book",
            error: error.message,
        });
    }
};

export const updateData = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
        return res.status(400).json({
            message: "Book ID is required!",
        });
    }

    try {

        const updatedBook = await Books.findOneAndUpdate(
            { bookId: id },       
            { $set: updatedData }, 
            { new: true }          
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found. Update failed.",
            });
        }
        res.status(200).json({
            message: "Book updated successfully!",
            data: updatedBook,
        });

    } catch (error) {
        console.log("Error in updateData controller:", error.message);

        res.status(500).json({
            message: "Failed to update book",
            error: error.message,
        });
    }
};
