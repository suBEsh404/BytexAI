import { UserModel } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

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

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const user = await UserModel.create(email, hashedPassword, fullName, normalizedRole);

      // Generate token
      // Signup: short-lived token (10 minutes)
      const token = generateToken(user.id, user.email, '10m');

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          created_at: user.created_at
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

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Email not registered', code: 'EMAIL_NOT_FOUND' });
      }

      const isPasswordValid = await comparePassword(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect password', code: 'PASSWORD_INCORRECT' });
      }

      // Remember me => 7d, otherwise 10m
      const tokenTtl = rememberMe ? '7d' : '10m';
      const token = generateToken(user.id, user.email, tokenTtl);

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          created_at: user.created_at
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
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          created_at: user.created_at
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to get user' });
    }
  }
};
