// src/scripts/createAdmin.ts
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/schema';

async function createAdminUser() {
  try {
    const adminEmail = 'admin@church.com';
    const adminPassword = 'admin123'; // Change this to a secure password
    
    // Check if admin already exists
    const existingAdmin = await db.getUserByEmail(adminEmail);
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const adminData = {
      id: uuidv4(),
      email: adminEmail,
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      phone: '',
      role: 'admin' as const,
    };

    await db.createUser(adminData);
    
    console.log('Admin user created successfully');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Please change the password after first login');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Run the script
createAdminUser().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});