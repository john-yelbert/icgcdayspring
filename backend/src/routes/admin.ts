// src/routes/admin.ts
import express from 'express';
import { z } from 'zod';
import { db } from '../database/schema';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authMiddleware);

// Validation schemas
const updateRoleSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  role: z.enum(['user', 'admin', 'superadmin'], {
    errorMap: () => ({ message: 'Role must be user, admin, or superadmin' })
  }),
});

const deleteUserSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
});

// Helper function to create user response (without password)
const createUserResponse = (user: any) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// Get all users (superadmin only)
router.get('/users', requireRole(['superadmin']), async (req, res) => {
  try {
    const users = await db.getAllUsers();
    const userResponses = users.map(createUserResponse);
    
    res.json({
      message: 'Users retrieved successfully',
      users: userResponses,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user role (superadmin only)
router.put('/users/role', requireRole(['superadmin']), async (req, res) => {
  try {
    const validatedData = updateRoleSchema.parse(req.body);
    
    // Check if user exists
    const targetUser = await db.getUserById(validatedData.userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent superadmin from demoting themselves
    if (req.user?.userId === validatedData.userId && 
        req.user?.role === 'superadmin' && 
        validatedData.role !== 'superadmin') {
      return res.status(400).json({ 
        message: 'Superadmin cannot change their own role' 
      });
    }

    // Update user role
    await db.updateUserRole(validatedData.userId, validatedData.role);
    
    // Get updated user data
    const updatedUser = await db.getUserById(validatedData.userId);
    
    res.json({
      message: 'User role updated successfully',
      user: createUserResponse(updatedUser),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user (superadmin only)
router.delete('/users/:userId', requireRole(['superadmin']), async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId format
    const validatedData = deleteUserSchema.parse({ userId });
    
    // Check if user exists
    const targetUser = await db.getUserById(validatedData.userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent superadmin from deleting themselves
    if (req.user?.userId === validatedData.userId) {
      return res.status(400).json({ 
        message: 'Cannot delete your own account' 
      });
    }

    // Delete user
    await db.deleteUser(validatedData.userId);
    
    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user statistics (admin and superadmin)
router.get('/stats', requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const users = await db.getAllUsers();
    
    const stats = {
      totalUsers: users.length,
      usersByRole: {
        user: users.filter(u => u.role === 'user').length,
        admin: users.filter(u => u.role === 'admin').length,
        superadmin: users.filter(u => u.role === 'superadmin').length,
      },
      recentUsers: users
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(createUserResponse),
    };
    
    res.json({
      message: 'Statistics retrieved successfully',
      stats,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;