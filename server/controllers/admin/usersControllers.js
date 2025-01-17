import UserModel from '../../models/userModel.js';

export const get_all_users = async (req, res) => {
    try {
      const users = await UserModel.find()
      if (!users) {
        res.status(200).json({ message: "No users are found!" });
      }
      else {
        res.status(200).json(users)
      }
    } catch (error) {
      console.error('Error in Google Authentication:', error);
    return res.status(500).json({ message: 'Internal server error', error });
    }
  }
    
export const toggleBlock = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { id, status } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await UserModel.findByIdAndUpdate(id, { status }, { new: true });

    if (user) {
      console.log(`User with id ${id} has been ${status ? 'active' : 'blocked'}.`);

      return res.status(200).json({ message: `User with id ${id} has been ${status ? 'Active' : 'Blocked'}.` });
    } else {
      console.log(`User with id ${id} not found.`);

      return res.status(404).json({ message: `User with id ${id} not found.` });
    }
  } catch (error) {
    console.error('Error updating user status:', error);

    return res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
}

export const get_current_user = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) console.log('errorr no id')

    const currUser = await UserModel.findById(id);

    if (!currUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User retrieved successfully.',
      currentUser: currUser,
    });
  } catch (error) {
    console.error('Error in getCurrentUser:', error.message);
    res.status(500).json({
      message: 'An error occurred while retrieving user details.',
      error: error.message,
    });
  }
}