import ProductModel from "../../models/productsModel.js";

export const get_related_products = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const categoryId = product.category;

    let relatedProducts = await ProductModel.find({
      category: categoryId,
      _id: { $ne: id },
      status: true,
    });

    if (!relatedProducts || relatedProducts.length === 0) {
      relatedProducts = await ProductModel.find();
    }

    res.json({
      message: "Related products fetched successfully!",
      relatedProducts,
    });
  } catch (error) {
    console.error("Error fetching related products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const new_arrivals = async (req, res) => {
  try {
    const currentDate = new Date(); 

    const products = await ProductModel.aggregate([
      {
        $match: { status: true },
      },
      {
        $lookup: {
          from: "productoffers",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$productId", "$$productId"] },
                    { $eq: ["$status", true] },
                    { $lte: ["$startDate", currentDate] },
                    { $gte: ["$endDate", currentDate] },
                  ],
                },
              },
            },
          ],
          as: "productDetails",
        },
      },
      {
        $sort: { createdAt: -1 },  // Sort products by createdAt in descending order
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send({
      message: "Error fetching products",
      error: error.message,
    });
  }
}

export const get_all_products = async (req, res) => {
  try {
    const currentDate = new Date(); 

    const products = await ProductModel.aggregate([
      {
        $match: { status: true },
      },
      {
        $lookup: {
          from: "productoffers",
          let: { productId: "$_id" }, 
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$productId", "$$productId"] },
                    { $eq: ["$status", true] },
                    { $lte: ["$startDate", currentDate] },
                    { $gte: ["$endDate", currentDate] },
                  ],
                },
              },
            },
          ],
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true, 
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send({
      message: "Error fetching products",
      error: error.message,
    });
  }
}

export const products_details = async (req, res) => {
  try {
    const { id } = req.params;
    const currentDate = new Date();

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productDetails = await ProductModel.aggregate([
      { $match: { _id: product._id } },
      {
        $lookup: {
          from: "productoffers",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$productId", "$$productId"] },
                    { $eq: ["$status", true] },
                    { $lte: ["$startDate", currentDate] },
                    { $gte: ["$endDate", currentDate] },
                  ],
                },
              },
            },
          ],
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    if (productDetails.length === 0) {
      return res.status(404).json({ error: "Product details not found" });
    }

    product.popularity += 1;
    await product.save();

    res.json(productDetails[0]); // Send the enriched product data
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}





