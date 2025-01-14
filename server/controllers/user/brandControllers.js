import BrandModel from '../../models/brandsModel.js'

export const get_all_brands = async (req, res) => {
  try {
    const brands = await BrandModel.find({ status: true })

    if (!brands || brands.length === 0) {
      return res.status(400).json({ message: "No products found!" })
    }

    res.status(200).json(brands);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}