// src/scripts/seed.ts
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/schema';
import dotenv from 'dotenv';

dotenv.config();

async function createSuperAdmin() {
  try {
    await db.initialize();
    
    // Check if superadmin already exists
    const existingAdmin = await db.getUserByEmail('admin@church.com');
    if (existingAdmin) {
      console.log('Superadmin already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      return;
    }

    // Create superadmin user
    const superAdminData = {
      id: uuidv4(),
      email: 'admin@church.com',
      firstName: 'Super',
      lastName: 'Admin',
      password: await bcrypt.hash('admin123', 10), // Change this password!
      role: 'superadmin' as const,
    };

    await db.createUser(superAdminData);
    
    console.log('✅ Superadmin created successfully!');
    console.log('📧 Email: admin@church.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  IMPORTANT: Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating superadmin:', error);
  } finally {
    await db.close();
  }
}

// Allow running this script directly
if (require.main === module) {
  createSuperAdmin();
}

export { createSuperAdmin };