import SignInWithGoogle from "@/components/sign-in-with-google";

export default async function SignIn() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <p className="text-xl mb-6 text-white">
        Welcome to BRDS.gg! Please sign in to continue.
      </p>
      <SignInWithGoogle />
    </div>
  );
}
