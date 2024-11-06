import { signIn } from "@/lib/auth";
import { GoogleIcon } from "./svg-icons/google";
import { Button } from "./ui/button";

export default function SignInWithGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/profile" });
      }}
    >
      <Button
        className="flex w-fit gap-2 p-2 text-black bg-white hover:bg-gray-100 hover:text-black"
        variant="outline"
        size="icon"
        type="submit"
        aria-label="Signin with Google"
      >
        Google <GoogleIcon />
      </Button>
    </form>
  );
}
