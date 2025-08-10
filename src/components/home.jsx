'use client'

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { FaBars, FaHome, FaUsers, FaCalendarAlt, FaImages, FaInfoCircle } from "react-icons/fa";

import React from "react";
import Autoplay from "embla-carousel-autoplay"

export default function HomePage() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [showPopup, setShowPopup] = React.useState(false);
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    React.useEffect(() => {
        // Only show popup if not already shown in this session
        if (!sessionStorage.getItem("welcomePopupShown")) {
            setShowPopup(true);
            sessionStorage.setItem("welcomePopupShown", "true");
        }
    }, []);

    React.useEffect(() => {
        if (menuOpen || showPopup) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [menuOpen, showPopup]);

    // Example images for carousels
    const carouselImages1 = [
        "/banner1.jpg",
        "/banner2.jpg",
        "/banner3.jpg"
    ];
    const carouselImages2 = [
        "/fixtures1.jpg",
        "/fixtures2.jpg",
        "/fixtures3.jpg"
    ];

    return (
        <div className="flex flex-col items-center w-full">
            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xs">
                    <button
                        className="absolute top-2 right-2 text-2xl text-white hover:text-red-500"
                        onClick={() => setShowPopup(false)}
                        aria-label="Close popup"
                    >
                        &times;
                    </button>
                    <Image
                        style={{ borderRadius: '10px' }}
                        src="/Popup.png"
                        alt="Welcome"
                        width={250}
                        height={250}
                    />
                </div>
            )}
            {/* Header */}
            <header className="relative w-full bg-blue-900 text-white flex items-center justify-between p-4">
                {/* Logo on left */}
                <div className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="ISPL Logo"
                        width={50}
                        height={50}
                        className="mr-2"
                    />
                </div>
                {/* Hamburger on right */}
                <button
                    className="text-white text-xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu"
                >
                    <FaBars />
                </button>
            </header>

            {/* Sidebar/Menu with animation */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 flex flex-col transition-all duration-500 ease-in-out
                    ${menuOpen ? "translate-x-0 w-4/5" : "translate-x-full w-4/5"}
                `}
                style={{ maxWidth: 500 }}
            >
                {/* Sidebar header with logo and title */}
                <div className="flex items-center justify-between mb-6 border-b pb-4 pt-4 px-1 bg-blue-900">
                    <div className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="ISPL Logo"
                            width={50} // Match header logo size
                            height={50}
                            className="mr-2"
                        />
                        <span className="text-md font-semibold text-white">Champions Root Foundation</span>
                    </div>
                    <button
                        className="text-white text-2xl ml-2"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        &times;
                    </button>
                </div>
                <nav className="flex flex-col px-4">
                    <a href="#" className="mb-4 text-blue-800 font-semibold flex items-center gap-2">
                        <FaHome /> Home
                    </a>
                    <a href="#" className="mb-4 text-blue-800 font-semibold flex items-center gap-2">
                        <FaUsers /> Teams
                    </a>
                    <a href="#" className="mb-4 text-blue-800 font-semibold flex items-center gap-2">
                        <FaCalendarAlt /> Fixtures
                    </a>
                    <a href="#" className="mb-4 text-blue-800 font-semibold flex items-center gap-2">
                        <FaImages /> Gallery
                    </a>
                    <a href="#" className="mb-4 text-blue-800 font-semibold flex items-center gap-2">
                        <FaInfoCircle /> About Us
                    </a>
                </nav>
            </div>

            {/* Overlay for sidebar */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 backdrop-blur-xs"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* First Image Carousel (Banner) */}
            <div className="w-full mt-4 flex justify-center overflow-x-hidden">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {carouselImages1.map((img, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-[3/1] items-center justify-center p-0">
                                            <Image
                                                src={img}
                                                alt={`Banner ${index + 1}`}
                                                fill
                                                className="object-cover rounded w-full h-full"
                                                sizes="100vw"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {/* Main Content */}
            <main className="w-full px-4 mt-8 text-center">
                <h2 className="text-xl font-semibold mb-4">IPL Season 2 Fixture</h2>
                {/* Second Image Carousel (Fixtures) */}
                <div className="flex justify-center overflow-x-hidden">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full max-w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {carouselImages2.map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-[4/3] items-center justify-center p-0">
                                                <Image
                                                    src={img}
                                                    alt={`Fixture ${index + 1}`}
                                                    fill
                                                    className="object-cover rounded w-full h-full"
                                                    sizes="100vw"
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </main>
        </div>
    );
}