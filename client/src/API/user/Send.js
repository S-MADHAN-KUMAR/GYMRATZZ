// loginUtils.js
import axios from 'axios';
import { LoginFailure, LoginStart, LoginSuccess, Logout } from '../../redux/user/userSlice';
import { showToast } from '../../helpers/toast';
import { showBlockConfirmation } from '../../helpers/Sweat';

export const handleLoginSubmit = async (values, dispatch, navigate) => {
  dispatch(LoginStart());

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/login`,
      values,
      { withCredentials: true }
    );

    if (response.status === 200) {
      localStorage.setItem('USER_TOKEN', response?.data?.token);
      localStorage.setItem('USER_EMAIL', response?.data?.user?.email);

      dispatch(LoginSuccess(response?.data?.user));

      
      showToast('Logged in successfully!', 'light', 'success');
      navigate('/')
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred!';
    dispatch(LoginFailure(errorMessage));

    console.error('Error during login:', error);
    showToast(errorMessage, 'dark', 'error');
  }
}

export const handleLogout = async (dispatch, navigate) => {
  showBlockConfirmation('Do you want to LOGOUT?', 'LOGOUT', async () => {
    try {
      localStorage.removeItem('USER_TOKEN');
      localStorage.removeItem('USER_EMAIL');
      dispatch(Logout());
      navigate('/login');

      showToast('Logged out successfully!', 'light', 'success');
    } catch (error) {
      console.error('Error logging out:', error);
      showToast('An unexpected error occurred during logout.', 'dark', 'error');
    }
  });
};
