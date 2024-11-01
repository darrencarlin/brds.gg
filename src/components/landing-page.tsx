"use client";

import { createSubscriber } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { useState } from "react";
import { toast } from "sonner";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const { success } = await createSubscriber(email);

    if (success) {
      toast("Thanks for signing up! We'll notify you when we go live.");
      setEmail("");
    } else {
      toast("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <ReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <div
        className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden text-white"
        style={{
          backgroundColor: "#151515",
          backgroundImage:
            "radial-gradient(#2c2c2c 1.4500000000000002px, #151515 1.4500000000000002px)",
          backgroundSize: "29px 29px",
        }}
      >
        <motion.main
          className="z-10 text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            BRDS.GG
          </motion.h1>
          <motion.p className="text-xl mb-8" variants={itemVariants}>
            Track scores and compete with your friends!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 mb-8"
            variants={itemVariants}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full max-w-xs bg-white/10 border-white/20 text-white placeholder-white/50"
              aria-label="Email address"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full max-w-xs bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                {!loading
                  ? "Sign Up for Launch Notifications"
                  : "Submitting..."}
              </Button>
            </motion.div>
          </motion.form>

          <motion.p className="text-sm text-white/70" variants={itemVariants}>
            Get notified when we go live and start tracking leaderboards with
            your friends!
          </motion.p>
        </motion.main>
      </div>
    </ReCaptchaProvider>
  );
}
