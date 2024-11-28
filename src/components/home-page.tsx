"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export const HomePage = () => {
  // Variants for section animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Variants for button hover effects
  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 min-h-[calc(100vh-68px)] w-full overflow-hidden text-white p-4"
      >
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-7xl font-bold mb-8"
          >
            Track your games and compete with friends in real-time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-6"
          >
            BRDS.gg is a website for tracking your gaming sessions and competing
            with friends. Select a game, create a session, share the link and
            start tracking your progress.
          </motion.p>

          <div className="flex gap-4">
            <motion.div
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <Button
                asChild
                className="font-black bg-green-500 hover:bg-green-900 text-white p-2 rounded transition-colors duration-300 uppercase"
              >
                <Link href="/new-session">Get Started</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <Button
                asChild
                variant="ghost"
                className="font-black p-2 rounded transition-colors duration-300 uppercase"
              >
                <a href="#how-it-works">Learn More</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="min-h-screen grid grid-cols-1 grid-rows-3 gap-16 justify-center items-center max-w-7xl mx-auto text-white p-4 w-full mb-10"
        id="how-it-works"
      >
        {[
          {
            title: "Select a game and add some metrics to track",
            description:
              "You can track any metrics you want from your favorite games. Choose a key metric to track for your leaderboards.",
            image: "/games.png",
            alt: "Game library screenshot",
            reverse: false,
          },
          {
            title: "Start your session and share your link with friends",
            description:
              "Start your session and share your link with friends. They can join your session and scores will be updated in real time.",
            image: "/realtime.png",
            alt: "Real-time tracking screenshot",
            reverse: true,
          },
          {
            title: "View analytics on previous sessions.",
            description:
              "View analytics on previous sessions. See how you and your friends are improving over time and who ranks best at each game.",
            image: "/analytics.png",
            alt: "Analytics screenshot",
            reverse: false,
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className={`grid grid-cols-1 md:grid-cols-2 gap-16 h-full place-items-center ${
              section.reverse ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`${section.reverse ? "md:order-1" : ""} flex flex-col justify-center items-center h-full p-4`}
            >
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8 w-full"
              >
                {section.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg"
              >
                {section.description}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-white rounded-lg w-fit"
            >
              <Image
                src={section.image}
                width={1024}
                height={768}
                alt={section.alt}
                className="shadow-lg max-w-[500px]"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
