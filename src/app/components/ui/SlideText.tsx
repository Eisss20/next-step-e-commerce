"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


export default function SlideText() { 

    const text: string[] = [ "Enjoy free shipping on every order—no minimum, no worries!", "Step up your game! Sign up now for exclusive deals and special perks! 🎁✨", "Reach out to us anytime – we're here for you 24/7! 📞" ];
    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % text.length);

        }, 6500);

        return () => clearInterval(interval);
    }, []);


    return ( 
        <>
        
        <div className="bg-black p-2 text-white text-center font-semibold hidden lg:block">
                <AnimatePresence mode="wait">   
                    <motion.h2
                        key={currentText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {text[currentText]}
                    </motion.h2>        
        </AnimatePresence>

        </div>
        
        
        
        
        
        </>



)

}