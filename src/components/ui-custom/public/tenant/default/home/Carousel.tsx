"use client";

// Next / React
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
import { getFeaturedProperties } from "@/api/tenant/property/route";

// Schema
import { FeaturedProperty } from "@/lib/schemas/property/property";

// Formatter
import { priceFormatter } from "@/lib/formatters/UIformatters";

// Animation inside de Carousel
import { motion } from "framer-motion";

// Context
import { useTenant } from "@/lib/contexts/TenantContext";

export function FeaturedCarousel({ userId }: { userId: number }) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>(); // Gives carousel its mechanics
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);
  const slug = useTenant().slug;
  const [featuredProperties, setFeaturedProperties] = useState<
    FeaturedProperty[]
  >([]);

  const bannerDefaultImage = useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // Requests featured properties
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await getFeaturedProperties(userId);
        setFeaturedProperties(response);
        console.log(response);
      } catch (e: any) {
        console.log("Erro", e);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="relative w-full">
      <Carousel setApi={setCarouselApi} className="w-full">
        <CarouselContent>
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property, index) => (
              <CarouselItem key={index} className="w-full">
                <Card className="h-[310px] sm:h-[470px] lg:h-[635px] 2xl:h-[750px] w-full p-0 border-none">
                  <CardContent className="h-full w-full flex items-center justify-center p-0 m-0">
                    <Link className="relative w-full h-full" href={`/${slug}/properties/${property.id}`}>
                      {property.coverImage ? (
                        <CldImage
                          alt="Foto capa do imóvel destaque"
                          fill
                          className="object-cover"
                          src={property.coverImage}
                          priority
                        />
                      ) : (
                        <Image
                          alt="Message Banner"
                          fill
                          src="/templates/default/bannerMessage2.jpg"
                        />
                      )}
                      <div className="w-full h-full flex items-end justify-center lg:justify-start">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="
                      bg-black/80 text-white rounded-2xl 
                      w-fit h-fit py-2 px-6 sm:py-3 lg:px-10 lg:py-5 z-10 ml-0 mb-4 lg:mb-8 lg:ml-10 2xl:mb-14 2xl:ml-20               
                      min-w-[210px] min-h-[80px] sm:min-w-[280px] sm:min-h-[110px] md:min-w-[340px] md:min-h-[110px] lg:min-w-[380px] lg:min-h-[150px]"
                        >
                          <div className="min-w-fit min-h-fit w-4/5 flex flex-col items-start justify-center md:gap-1">
                            <p className="text-[13px] sm:text-[15px] md:text-[20px] font-light">
                              {property.address.city}
                            </p>
                            <h2 className="text-[16px] sm:text-[21px] lg:text-3xl font-semibold">
                              {property.title}
                            </h2>
                            <p className="text-[13px] sm:text-[18px] lg:text-[19px] font-normal mt-1 md:mt-0">
                              A partir de: R$ {priceFormatter(property.price)}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <Card className="h-[310px] sm:h-[470px] lg:h-[635px] 2xl:h-[750px] w-full p-0 border-none">
                <CardContent className="h-full w-full flex items-center justify-center p-0 m-0">
                  <Image
                    alt="Message Banner"
                    fill
                    src="/templates/default/bannerMessage.jpg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          )}
        </CarouselContent>

        {/* navigation buttons inside carousel */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
      </Carousel>
    </div>
  );
}
