import Stripe from 'stripe';
import WalletModel from '../../models/walletModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  
export const get_user_wallet = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      let wallet = await WalletModel.findOne({ userId });
  
      if (!wallet) {
        wallet = new WalletModel({
          userId,
          balance: 0, 
          history: []  
        });
  
        await wallet.save();
      }
  
      res.json({
        balance: wallet.balance,
        history: wallet.history
      });
    } catch (error) {
      console.error('Error fetching wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const add_wallet_amount = async (req, res) => {
    try {
      const { userId, amount } = req.body;
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'Wallet Amount',
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/wallet_success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5175/wallet_cancel',
        client_reference_id: userId, 
      });
  
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  
export const handle_successful_payment = async (req, res) => {
    try {
      const { id } = req.params;
      const session = await stripe.checkout.sessions.retrieve(id); 
  
      if (session.payment_status === 'paid') {
        const userId = session.client_reference_id;
        const amount = session.amount_total / 100; 
        //
  
        const user = await WalletModel.findOne({ userId });
  
        if (user) {
          user.balance += amount; 
  
          user.history.push({
            amount: amount,
            status: 'completed',  
            date: new Date(),     
          });
  
          await user.save(); 
  
          res.status(200).send('Payment successful and wallet updated');
        } else {
          res.status(404).send('User not found');
        }
      } else {
        res.status(400).send('Payment failed');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  