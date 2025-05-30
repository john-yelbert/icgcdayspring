// src/routes/auth.ts
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/schema';

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Helper function to generate JWT
const generateToken = (userId: string, role: string) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Helper function to create user response (without password)
const createUserResponse = (user: any) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
  role: user.role,
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await db.getUserByEmail(validatedData.email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const userId = uuidv4();
    const userData = {
      id: userId,
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      password: hashedPassword,
      phone: validatedData.phone,
      role: 'user' as const, // All new registrations are regular users
    };

    await db.createUser(userData);

    // Generate token
    const token = generateToken(userId, userData.role);

    // Return success response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: createUserResponse(userData),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    // Find user by email
    const user = await db.getUserByEmail(validatedData.email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    // Return success response
    res.json({
      message: 'Login successful',
      token,
      user: createUserResponse(user),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token route
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Get fresh user data
    const user = await db.getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      message: 'Token valid',
      user: createUserResponse(user),
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout route (optional - mainly for cleanup)
router.post('/logout', (req, res) => {
  // In a stateless JWT setup, logout is mainly handled client-side
  // You could implement token blacklisting here if needed
  res.json({ message: 'Logout successful' });
});

export default router;