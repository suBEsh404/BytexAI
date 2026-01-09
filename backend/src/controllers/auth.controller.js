import { UserModel } from '../models/User.js';
import { DeveloperModel } from '../models/Developer.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

const findAccountByEmail = async (email) => {
  const user = await UserModel.findByEmail(email);
  if (user) return { account: user, accountType: 'user' };
  const developer = await DeveloperModel.findByEmail(email);
  if (developer) return { account: developer, accountType: 'developer' };
  return { account: null, accountType: null };
};

export const authController = {
  // User signup
  signup: async (req, res) => {
    try {
      const { fullName, email, password, role } = req.body;

      // Validation
      if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      const normalizedRole = (role || 'user').toLowerCase();
      if (!['user', 'developer'].includes(normalizedRole)) {
        return res.status(400).json({ error: 'Invalid role', code: 'INVALID_ROLE' });
      }

      // Check if email already exists in either table
      const existing = await findAccountByEmail(email);
      if (existing.account) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Hash password and create account in appropriate table
      const hashedPassword = await hashPassword(password);
      let newAccount;
      
      if (normalizedRole === 'developer') {
        newAccount = await DeveloperModel.create(email, hashedPassword, fullName);
      } else {
        newAccount = await UserModel.create(email, hashedPassword, fullName);
      }

      // Generate token with role - signup always gets 7 days
      const token = generateToken(newAccount.id, newAccount.email, '7d', normalizedRole);

      res.status(201).json({
        message: `${normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1)} created successfully`,
        user: {
          id: newAccount.id,
          email: newAccount.email,
          fullName: newAccount.full_name,
          role: normalizedRole,
          created_at: newAccount.created_at
        },
        token
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Signup failed' });
    }
  },

  // User login
  login: async (req, res) => {
    try {
      const { email, password, rememberMe } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      // Find account in either users or developers table
      const { account, accountType } = await findAccountByEmail(email);
      if (!account) {
        return res.status(401).json({ error: 'Email not registered', code: 'EMAIL_NOT_FOUND' });
      }

      const isPasswordValid = await comparePassword(password, account.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect password', code: 'PASSWORD_INCORRECT' });
      }

      // Remember me => 7d, otherwise 10m
      const tokenTtl = rememberMe ? '7d' : '10m';
      const token = generateToken(account.id, account.email, tokenTtl, accountType);

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: account.id,
          email: account.email,
          fullName: account.full_name,
          role: accountType,
          created_at: account.created_at
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  // Get current user
  getMe: async (req, res) => {
    try {
      const userId = req.user?.userId;
      const userType = req.user?.type || 'user';

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      let account;
      if (userType === 'developer') {
        account = await DeveloperModel.findById(userId);
      } else {
        account = await UserModel.findById(userId);
      }

      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }

      res.status(200).json({
        user: {
          id: account.id,
          email: account.email,
          fullName: account.full_name,
          role: userType,
          created_at: account.created_at
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to get user' });
    }
  }
};
