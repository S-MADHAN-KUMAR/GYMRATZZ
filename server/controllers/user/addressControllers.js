import AddressModel from '../../models/addressModel.js'
import UserModel from '../../models/userModel.js';

export const add_address = async (req, res) => {
  try {
    const { id, name, phone, addressline1, addressline2, city, state, pincode } = req.body;

    if (!id || !name || !phone || !addressline1 || !city || !state || !pincode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const addressData = {
      name,
      phone,
      addressline1,
      addressline2,
      city,
      state,
      pincode,
    };

    const existUser = await UserModel.findById(id);

    if (!existUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    const existAddress = await AddressModel.findOne({ userId: id });

    if (existAddress) {
      existAddress.addresses.push(addressData);
      await existAddress.save()
      return res.status(200).json({ message: 'Address added successfully', address: existAddress });
    } else {
      
      const newAddress = new AddressModel({
        userId: id,
        addresses: [addressData], 
      });

      await newAddress.save()
      return res.status(201).json({ message: 'Address added successfully', address: newAddress });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding the address' });
  }
}
  
export const get_current_address = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const address = await AddressModel.findOne({userId:id});

    if (!address) {
      return res.status(400).json({ message: "Address not found!" });
    }

    res.status(200).json({ message: "Successfully fetched!", address });
  } catch (error) {
    console.error('Error fetching address:', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const get_edit_address = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({ message: "UserId and AddressId are required!" });
    }

    const addressData = await AddressModel.findOne({userId});

    if (!addressData) {
      return res.status(400).json({ message: "User not found!" });
    }

    const allAddress = addressData.addresses;

    if (!allAddress || allAddress.length === 0) {
      return res.status(404).json({ message: "No addresses found!" });
    }

    const address = allAddress.find((add) => add._id.toString() === addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found for this user!" });
    }

    return res.status(200).json(address);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const update_address = async (req, res) => {
  try {
    const { userId, addressId, newAddress } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({ message: "UserId and AddressId are required!" });
    }

    const addressData = await AddressModel.findOne({ userId });

    if (!addressData) {
      return res.status(400).json({ message: "User not found!" });
    }

    const allAddress = addressData.addresses; 

    if (!allAddress || allAddress.length === 0) {
      return res.status(404).json({ message: "No addresses found!" });
    }

    const addressIndex = allAddress.findIndex((add) => add._id.toString() === addressId);

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found for this user!" });
    }

    Object.keys(newAddress).forEach((key) => {
      allAddress[addressIndex][key] = newAddress[key];
    });

    await addressData.save();

    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
