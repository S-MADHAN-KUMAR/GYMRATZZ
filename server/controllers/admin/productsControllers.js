import ProductModel from "../../models/productsModel.js";
import { imageUploadUtil } from "../../utils/imageUploadUtil.js";

export const get_all_products = async (req, res) => {
    try {
      const products = await ProductModel.find()
      res.status(200).json(products)
    } catch (error) {
      console.error('Error fetching products:', error.message)
      res.status(500).send({
        message: 'Error fetching products',
        error: error.message,
      });
    }
}

export const add_product = async (req, res) => {
    try {
      console.log('Request body:', req.body);
      console.log('Uploaded files:', req.files);
      const { name, price, description, stock, status, category, brand } = req.body; // Destructure product data
      const files = req.files;
  
      if (!files || files.length < 3) {
        return res.status(400).send({
          message: 'Please upload at least 3 images (minimum required).',
        });
      }

      const existNamedProduct = await ProductModel.findOne({ name });

      if (existNamedProduct) {
        return res.status(400).send({
          message: 'A product with this name already exists. Please choose a different name.',
        });
      }
  
      const uploadPromises = files.map((file) => imageUploadUtil(file.buffer));
      const imageUrls = await Promise.all(uploadPromises);
  
      const productData = { name, price, description, stock, status, imageUrls, category, brand };
      const product = new ProductModel(productData);
      await product.save();
  
      console.log('Product added successfully:', product);
      res.status(200).send({
        message: 'Product added successfully',
        product,
      });
    } catch (error) {
      console.error('Error processing add product:', error.message);
      res.status(500).send({
        message: 'An error occurred while adding the product.',
        error: error.message,
      });
    }
  };

export const get_edit_product = async (req, res) => {
    try {
      const { id } = req.params; 
  
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const product = await ProductModel.findById(id); 
  
      if (product) {
        return res.status(200).json( product );
      } else {
        console.log(`Product with id ${id} not found.`);
        return res.status(404).json({ message: `Product with id ${id} not found.` });
      }
    } catch (error) {
      console.error('Error retrieving product details:', error);
      return res.status(500).json({ message: 'Error retrieving product details', error: error.message });
    }
}

export const update_product = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, price, description, stock, status, category, brand } = req.body;
    const files = req.files; 

    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    console.log('Received Images: ', files);

    if (!files || files.length === 0) {
      return res.status(400).send({ message: "At least one image is required" });
    }

    const uploadPromises = files.map((file) => imageUploadUtil(file.buffer));
    const imageUrls = await Promise.all(uploadPromises);

    console.log("Uploaded Image URLs: ", imageUrls);

    const productData = {
      name,
      price,
      description,
      stock,
      status,
      category,
      brand,
      imageUrls,
    };

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, productData, {
      new: true, 
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Server error.", error: error.message });
  }
  }

export const toggleBlockProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { id, status } = req.body;

    if (id === undefined || status === undefined) {
      return res.status(400).json({ message: 'Product ID and status are required' });
    }

    const updatedStatus = status === true;

    const product = await ProductModel.findByIdAndUpdate(id, { status: updatedStatus }, { new: true });

    if (product) {
      console.log(`Product with id ${id} has been ${updatedStatus ? 'activated' : 'blocked'}.`);

      return res.status(200).json({ message: `Product with id ${id} has been ${updatedStatus ? 'activated' : 'blocked'}.` });
    } else {
      console.log(`Product with id ${id} not found.`);

      return res.status(404).json({ message: `Product with id ${id} not found.` });
    }
  } catch (error) {
    console.error('Error updating product status:', error);

    return res.status(500).json({ message: 'Error updating product status', error: error.message });
  }
};

export const delete_product = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!id) {
        return res.status(400).send({
          message: "Product ID is required.",
        });
      }
  
      const product = await ProductModel.findOneAndDelete({ _id: id });
  
      if (product) {
        res.status(200).send({
          message: "Product deleted successfully",
        });
      } else {
        res.status(404).send({
          message: "Product not found or already deleted",
        });
      }
    } catch (error) {
      console.error(error)
      res.status(500).send({
        message: "Server error occurred while deleting the product",
      });
    }
  };


