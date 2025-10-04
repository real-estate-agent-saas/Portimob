"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const bannerSlides = [
  {
    id: 1,
    title: "Lorem Ipsum",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Build modern, responsive websites with cutting-edge technology and beautiful design that converts visitors into customers.",
    cta: "Start Building",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    subtitle: "Proin nec arcu rhoncus, eleifend augue eget, rutrum neque.",
    description:
      "Monitor your website performance, user engagement, and conversion rates with our comprehensive analytics platform.",
    cta: "View Analytics",
  
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    subtitle: "Nam nec nisi volutpat, interdum tortor in, sagittis mauris.",
    description:
      "Ensure your website looks perfect on smartphones, tablets, and desktops with our responsive design approach.",
    cta: "Learn More",
    
  },
  {
    id: 4,
    title: "Lorem Ipsum",
    subtitle: "Nullam posuere molestie ante, sed suscipit tellus dapibus eu.",
    description:
      "Our dedicated support team is available around the clock to help you succeed with your digital projects.",
    cta: "Contact Support",
   
  },
]

export function SwipeableBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Touch/Mouse handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setTranslateX(diff)
  }

  const handleEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50
    if (translateX > threshold) {
      prevSlide()
    } else if (translateX < -threshold) {
      nextSlide()
    }

    setTranslateX(0)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isDragging])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {bannerSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 px-4 py-16 md:py-24">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">{slide.subtitle}</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">{slide.title}</h1>
                  </div>
                  <p className="text-lg text-muted-foreground text-pretty max-w-md">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="w-full sm:w-auto">
                      {slide.cta}
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-2/4 rounded-lg shadow-2xl z-100"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80"
        onClick={prevSlide}
      >
        <ChevronLeft className="hidden md:block h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80"
        onClick={nextSlide}
      >
        <ChevronRight className="hidden md:block h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
