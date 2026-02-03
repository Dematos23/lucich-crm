
import dotenv from 'dotenv';
import { auth, firestore } from '../src/firebase/firebase-admin';
import { User } from '../src/lib/types';

dotenv.config({ path: process.cwd() + '/.env.local', override: true });

async function seedAdminUser() {
  const email = 'dematos23@gmail.com';
  const password = 'alessandra';

  try {
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log(
        `User ${email} already exists with uid ${userRecord.uid}. Updating claims.`
      );
    } catch (error: any) {
      if (error?.code === 'auth/user-not-found') {
        console.log(`Creating admin user ${email}`);
        userRecord = await auth.createUser({
          email,
          password,
          displayName: 'Diego Matos',
          emailVerified: true,
        });
        console.log(`Successfully created new admin user: ${userRecord.uid}`);
      } else {
        throw error;
      }
    }

    await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });
    console.log('Admin claims set.');

    // Create user document in Firestore
    const userDoc: User = {
      id: userRecord.uid,
      firstName: 'Diego',
      lastName: 'Matos',
      email: userRecord.email!,
      role: 'admin',
    };

    await firestore.collection('users').doc(userRecord.uid).set(userDoc);
    console.log(`User document created/updated in Firestore for ${userRecord.uid}`);

  } catch (error) {
    console.error('Error seeding admin user:', error);
    throw error;
  }
}

async function main() {
  await seedAdminUser();
}

main().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
