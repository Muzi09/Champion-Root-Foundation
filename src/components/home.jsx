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

import React from "react";

import Autoplay from "embla-carousel-autoplay"
import { FaBars } from "react-icons/fa"; // Add this import at the top



export default function HomePage() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )


    return (
        <div className="flex flex-col items-center w-full">
            {/* Header */}
            <header className="relative w-full bg-blue-800 text-white flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="ISPL Logo"
                        width={50}
                        height={50}
                        className="mr-2"
                    />
                    <h1 className="text-xl font-bold">Champion Root Foundation</h1>
                </div>
                <button
                    className="text-white text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu"
                >
                    <FaBars />
                </button>
            </header>

            {/* Sidebar/Menu */}
            {menuOpen && (
                <div className="fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg z-50 flex flex-col p-6">
                    <button
                        className="self-end text-2xl mb-4"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        &times;
                    </button>
                    {/* Add your menu items here */}
                    <a href="#" className="mb-4 text-blue-800 font-bold">Home</a>
                    <a href="#" className="mb-4 text-blue-800 font-bold">Teams</a>
                    <a href="#" className="mb-4 text-blue-800 font-bold">Fixtures</a>
                    <a href="#" className="mb-4 text-blue-800 font-bold">Gallery</a>
                    <a href="#" className="mb-4 text-blue-800 font-bold">About Us</a>
                </div>
            )}

            {/* First Carousel */}
            <div className="w-full mt-4">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-xs"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
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
                <h2 className="text-2xl font-bold mb-4">ISPL Season 2 Fixture</h2>
                <Image
                    src="/fixtures.jpg"
                    alt="Match Fixtures"
                    width={1200}
                    height={600}
                    className="rounded-lg"
                />
            </main>

        </div>
    );
}