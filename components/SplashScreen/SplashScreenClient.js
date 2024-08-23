"use client";
import { useState } from "react";

export default function SplashScreenClient() {
    const [splashViewed, setSplashViewed] = useState(sessionStorage.getItem("splashShown"));

    function closeSplash() {
        sessionStorage.setItem("splashShown", "true");
        setSplashViewed(true);
    }

    return (
        <div onBlur={closeSplash} className={`fixed grid items-center justify-end inset-0 z-50 bg-[#0c0c0c] text-white font-bold ${!splashViewed ? '' : '-translate-y-full'} transition-all duration-1000`}>
            <div className="fixed inset-0 z-30 cursor-pointer" onClick={closeSplash}></div>
            <div className="p-4 splash-text" aria-hidden="true">
                <div className="relative z-40 text-2xl md:text-3xl max-w-2xl">Avantgarde is an exquisite collection of carefully curated contemporary furniture designs and a fictional store. All image rights belong to <a href="https://artsandculture.google.com/" target="_blank" tabIndex={splashViewed ? -1 : 1}>Google’s Arts and Culture</a> and their respective owners.</div>
                <div className="mt-3 uppercase text-sm">[ Click anywhere to enter ]</div>
            </div>
        </div>
    ) 
}