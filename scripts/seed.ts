// scripts/seed.ts
import dotenv from "dotenv";

// Carga .env.local (asegurando ruta absoluta y override)
dotenv.config({
  path: process.env.DOTENV_CONFIG_PATH ?? `${process.cwd()}/.env.local`,
  override: true,
});

async function seedAdminUser() {
  // ✅ Import dinámico: ocurre DESPUÉS de dotenv.config
  const { auth } = await import("../src/firebase/firebase-admin");

  const email = "dematos23@gmail.com";
  const password = "alessandra";

  try {
    const user = await auth.getUserByEmail(email);
    console.log(
      `User ${email} already exists with uid ${user.uid}. Updating claims.`
    );
    await auth.setCustomUserClaims(user.uid, { role: "admin" });
    console.log("Admin claims set.");
  } catch (error: any) {
    if (error?.code === "auth/user-not-found") {
      console.log(`Creating admin user ${email}`);
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: "Diego Matos",
        emailVerified: true,
      });

      await auth.setCustomUserClaims(userRecord.uid, { role: "admin" });
      console.log(`Successfully created new admin user: ${userRecord.uid}`);
    } else {
      throw error;
    }
  }
}

async function main() {
  // (Opcional) sanity check rápido
  // console.log("ENV OK?", {
  //   project: !!process.env.FIREBASE_PROJECT_ID,
  //   email: !!process.env.FIREBASE_CLIENT_EMAIL,
  //   key: !!process.env.FIREBASE_PRIVATE_KEY,
  // });

  await seedAdminUser();
}

main().catch((err) => {
  console.error("Error seeding data:", err);
  process.exit(1);
});
