"use client";

// Next / React
import { useState, useEffect } from "react";
import Link from "next/link";

// Shadcnui
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Cloudinary
import { CldImage } from "next-cloudinary";

// Services
import { getFeaturedProperties } from "@/services/tenant/property";

// Schema
import { FeaturedProperty } from "@/lib/schemas/property/property";

// Formatter
import { priceFormatter } from "@/lib/formatters/UIformatters";

// Animation
import { motion } from "framer-motion";

// Context
import { useTenant } from "@/contexts/TenantContext";

export function FeaturedCarousel({ userId }: { userId: number }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const slug = useTenant().slug;

  const [featuredProperties, setFeaturedProperties] = useState<
    FeaturedProperty[]
  >([]);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await getFeaturedProperties(userId);
        setFeaturedProperties(response);
        console.log(response);
      } catch (e) {
        console.log("erro", e);
      }
    };

    fetchFeaturedProperties();
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {featuredProperties.map((property, index) => (
            <CarouselItem key={index} className="w-full">
              <Card className="h-[310px] sm:h-[470px] lg:h-[635px] 2xl:h-[750px] w-full p-0">
                <CardContent className="relative h-full w-full flex items-center justify-center">
                  <Link href={`${slug}/property/${property.id}`}>
                    {property.coverImage && (
                      <CldImage
                        alt="Foto capa do imóvel destaque"
                        fill
                        className="object-cover"
                        src={property.coverImage}
                      />
                    )}
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute bottom-2 sm:left-50 sm:bottom-6 md:left-8 md:bottom-10 2xl:left-16 2xl:bottom-16 bg-black/70 w-fit h-fit px-4 py-2 sm:p-0 sm:min-w-[280px] sm:min-h-[110px] md:min-w-[300px] md:min-h-[130px] lg:min-w-[380px] lg:min-h-[150px] rounded-2xl text-white flex items-center justify-center"
                    >
                      <div className="min-w-fit min-h-fit w-4/5 flex flex-col items-start justify-center md:gap-2">
                        <p className="text-[15px] md:text-[20px] font-light">
                          {property.address.city}
                        </p>
                        <h2 className="text-[18px] sm:text-[21px] lg:text-3xl font-semibold">
                          {property.title}
                        </h2>
                        <p className="text-[13px] sm:text-[15px] lg:text-[19px] font-normal mt-1 md:mt-0">
                          A partir de: R$ {priceFormatter(property.price)}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Botões de navegação fixos dentro do carousel */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
      </Carousel>

      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} de {count}
      </div>
    </div>
  );
}
