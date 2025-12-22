import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchByProductName = async (req, res) => {
    try {
        const { name } = req.query;

        const products = await Product.find({
            productName: { $regex: name, $options: "i" }
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchByBrand = async (req, res) => {
    try {
        const { brand } = req.query;

        const products = await Product.find({
            brand: { $regex: brand, $options: "i" }
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchByMultipleFields = async (req, res) => {
    try {
        const { productName, category, brand } = req.query;
        const query = {};

        if (productName) {
            query.productName = { $regex: productName, $options: "i" };
        }
        if (category) {
            query.category = { $regex: category, $options: "i" };
        }
        if (brand) {
            query.brand = { $regex: brand, $options: "i" };
        }

        const products = await Product.find(query);

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        const products = await Product.find({
            category: { $regex: category, $options: "i" }
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const filterByPriceRange = async (req, res) => {
    try {
        const { min, max } = req.query;
        const query = {};

        if (min) {
            query.price = { ...query.price, $gte: Number(min) };
        }
        if (max) {
            query.price = { ...query.price, $lte: Number(max) };
        }

        const products = await Product.find(query);

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const filterByRating = async (req, res) => {
    try {
        const { rating } = req.query;

        const products = await Product.find({
            rating: { $gte: Number(rating) }
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sortByPrice = async (req, res) => {
    try {
        const { order = "asc" } = req.query;
        const sortOrder = order === "desc" ? -1 : 1;

        const products = await Product.find().sort({ price: sortOrder });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsWithPagination = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({
            products,
            totalProducts,
            totalPages,
            currentPage: page,
            limit
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { productName, category, brand, price, rating, description } = req.body;

        if (!productName || !category || !brand || price == null || rating == null) {
            return res.status(400).json({
                message: "productName, category, brand, price, and rating are required"
            });
        }

        if (price < 0) {
            return res.status(400).json({ message: "Price must be positive" });
        }

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" });
        }
        
        const product = new Product({
            productName,
            category,
            brand,
            price,
            rating,
            description
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
