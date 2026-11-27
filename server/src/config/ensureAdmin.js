import User from '../models/User.js';

export const ensureSuperAdmin = async () => {
  try {
    const adminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@rkfoundation.org').toLowerCase().trim();
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin@RK2026!';
    const adminName = process.env.INITIAL_ADMIN_NAME || 'Sahyora Super Admin';

    let user = await User.findOne({ email: adminEmail }).select('+password');

    if (!user) {
      console.log(`[Admin Seed] Creating initial Super Admin: ${adminEmail}...`);
      user = new User({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
        isActive: true,
      });
      await user.save();
      console.log(`[Admin Seed] Super Admin created successfully: ${adminEmail}`);
    } else {
      // If user exists, ensure account is active and password matches current env setting
      let modified = false;
      if (!user.isActive) {
        user.isActive = true;
        modified = true;
      }
      if (user.role !== 'superadmin' && user.role !== 'super_admin') {
        user.role = 'superadmin';
        modified = true;
      }
      if ((!user.name || user.name === 'RK Foundation Super Admin') && adminName) {
        user.name = adminName;
        modified = true;
      }
      const isMatch = await user.matchPassword(adminPassword);
      if (!isMatch) {
        console.log(`[Admin Seed] Syncing Super Admin password to env setting for ${adminEmail}...`);
        user.password = adminPassword; // Will be hashed by User pre-save hook
        modified = true;
      }
      if (modified) {
        await user.save();
        console.log(`[Admin Seed] Super Admin updated and verified: ${adminEmail}`);
      } else {
        console.log(`[Admin Seed] Super Admin verified and ready: ${adminEmail}`);
      }
    }
  } catch (err) {
    console.warn(`[Admin Seed Warning] Could not ensure Super Admin: ${err.message}`);
  }
};
