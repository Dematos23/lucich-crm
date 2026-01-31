import 'dotenv/config';
import { auth } from '../src/firebase/firebase-admin';

async function seedAdminUser() {
  const email = 'dematos23@gmail.com';
  try {
    const user = await auth.getUserByEmail(email);
    console.log(`User ${email} already exists with uid ${user.uid}. Updating claims.`);
    await auth.setCustomUserClaims(user.uid, { role: 'admin' });
    console.log('Admin claims set.');
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.log(`Creating admin user ${email}`);
      const userRecord = await auth.createUser({
        email: email,
        password: 'alessandra',
        displayName: 'Diego Matos',
        emailVerified: true,
      });
      await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });
      console.log(`Successfully created new admin user: ${userRecord.uid}`);
    } else {
      throw error;
    }
  }
}

async function main() {
  await seedAdminUser();
}

main().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
