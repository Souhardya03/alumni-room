"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Users,
  Calendar,
  Shield,
  CheckCircle,
  Award,
  Car,
  Bath,
  Bed,
  AirVent,
  Zap,
  ArrowLeft,
  Share,
  Heart,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Clock,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface RoomData {
  id: number;
  title: string;
  description: string;
  location: string;
  singleOccupancy: number;
  doubleOccupancy: number;
  type: "AC" | "NonAC" | "Both";
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  capacity: number;
  highlights: string[];
  host: {
    name: string;
    avatar: string;
    joinDate: string;
    responseRate: number;
    responseTime: string;
  };
}

const roomData: RoomData = {
  id: 1,
  title: "Executive Suite - Teesta",
  description:
    "Experience luxury like never before in our premium executive suite. This beautifully appointed room offers stunning campus views, modern amenities, and the perfect blend of comfort and elegance for visiting alumni.",
  location: "Kanchenjunga Block A, Ground Floor",
  singleOccupancy: 1200,
  doubleOccupancy: 1800,
  type: "AC",
  rating: 4.8,
  reviews: 245,
  images: [
    "/images/test-1.jpg",
    "/images/test-2.jpg",
    "/images/test-3.jpg",
    "/images/test-5.jpeg",
  ],
  amenities: [
    "Free Wi-Fi",
    "Air Conditioning",
    "Breakfast Included",
    "Room Service",
    "Campus View",
    "Private Bathroom",
    "Queen Bed",
    "Work Desk",
    "Free Parking",
    "24/7 Security",
  ],
  capacity: 2,
  highlights: [
    "Clean & Safe Stay: A well-sanitized and hygienic space just for you",
    "Enhanced Cleaning: This host follows 5-step enhanced cleaning standards",
    "Excellent Location: 90% of recent guests rated the location 5 stars",
    "Smooth Check-in: 100% of guests gave check-in a 5-star rating",
    "Campus Heritage: Stay in the heart of your alma mater with easy access to all facilities",
  ],
  host: {
    name: "Alumni Services",
    avatar: "/images/host-avatar.jpg",
    joinDate: "2018",
    responseRate: 98,
    responseTime: "within an hour",
  },
};

const reviews = [
  {
    name: "Shayan Kundu",
    department: "Computer Science",
    year: 2022,
    review:
      "Staying at the Alumni House brought back so many memories! The comfort, hospitality, and location were just perfect. The room was spotless and the amenities exceeded my expectations.",
    rating: 5,
    avatar: "/images/reviewer-1.jpg",
    stayDate: "December 2023",
  },
  {
    name: "Aarav Mehta",
    department: "Mechanical Engineering",
    year: 2020,
    review:
      "It felt amazing to be back on campus. The Alumni House was cozy and had everything I needed for a comfortable stay. The staff was incredibly helpful and friendly.",
    rating: 4,
    avatar: "/images/reviewer-2.jpg",
    stayDate: "November 2023",
  },
  {
    name: "Sneha Roy",
    department: "Biotechnology",
    year: 2019,
    review:
      "Loved the peaceful environment and how welcoming the staff were. Definitely a must-stay place for visiting alumni. The breakfast was delicious and the room service was prompt.",
    rating: 5,
    avatar: "/images/reviewer-3.jpg",
    stayDate: "October 2023",
  },
];

const RoomDetails = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  const [mainImage, setMainImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Free Wi-Fi": <Wifi className="w-5 h-5" />,
      "Air Conditioning": <AirVent className="w-5 h-5" />,
      "Breakfast Included": <Coffee className="w-5 h-5" />,
      "Room Service": <CheckCircle className="w-5 h-5" />,
      "Campus View": <MapPin className="w-5 h-5" />,
      "Private Bathroom": <Bath className="w-5 h-5" />,
      "Queen Bed": <Bed className="w-5 h-5" />,
      "Work Desk": <CheckCircle className="w-5 h-5" />,
      "Free Parking": <Car className="w-5 h-5" />,
      "24/7 Security": <Shield className="w-5 h-5" />,
    };
    return iconMap[amenity] || <CheckCircle className="w-5 h-5" />;
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case "AC":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "NonAC":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Both":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20">
      {/* Navigation Bar */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/rooms">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Rooms</span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Share className="w-4 h-4" />
              <span className="hidden sm:block">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-2"
            >
              <Heart
                className={`w-4 h-4 ${isLiked ? "text-red-500 fill-current" : ""}`}
              />
              <span className="hidden sm:block">Save</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        {/* Header Section */}
        <div className="mb-8 fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 jakarta-font">
                {roomData.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{roomData.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                className={`${getRoomTypeColor(roomData.type)} border text-sm px-3 py-1.5 rounded-full font-medium`}
              >
                {roomData.type === "Both" ? "AC/Non-AC" : roomData.type}
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {roomData.rating}
                </div>
                <span className="text-gray-600">
                  ({roomData.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Image Gallery */}
        <div className="mb-12 scale-in">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-96 lg:h-[500px]">
            {/* Main Image */}
            <div className="lg:col-span-3 relative rounded-2xl overflow-hidden group">
              <Image
                src={roomData.images[mainImage]}
                alt={roomData.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setMainImage(
                    mainImage > 0 ? mainImage - 1 : roomData.images.length - 1,
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setMainImage(
                    mainImage < roomData.images.length - 1 ? mainImage + 1 : 0,
                  )
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {mainImage + 1} / {roomData.images.length}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {roomData.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    mainImage === i
                      ? "border-blue-500 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Room view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  {mainImage === i && (
                    <div className="absolute inset-0 bg-blue-500/20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Description */}
            <div className="slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 jakarta-font">
                About this room
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {roomData.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6 jakarta-font">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6 jakarta-font">
                Why guests love staying here
              </h3>
              <div className="space-y-4">
                {roomData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Information */}
            <div className="slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6 jakarta-font">
                Meet your host
              </h3>
              <Card className="p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={roomData.host.avatar}
                        alt={roomData.host.name}
                      />
                      <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                        AS
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {roomData.host.name}
                      </h4>
                      <p className="text-gray-600">
                        Host since {roomData.host.joinDate}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{roomData.rating} rating</span>
                        </div>
                        <div>{roomData.host.responseRate}% response rate</div>
                        <div>Responds {roomData.host.responseTime}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <PhoneCall className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-luxury border border-gray-200 bounce-in">
                <CardContent className="p-6 space-y-6">
                  {/* Pricing */}
                  <div className="text-center border-b border-gray-100 pb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ₹{roomData.singleOccupancy.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      per night • Single occupancy
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Double: ₹{roomData.doubleOccupancy.toLocaleString()} /
                      night
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Check-in
                        </label>
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Check-out
                        </label>
                        <Input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Guests
                      </label>
                      <Input
                        type="number"
                        min={1}
                        max={roomData.capacity}
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="text-xs text-gray-500">
                        Maximum {roomData.capacity} guests
                      </div>
                    </div>

                    <Button className="w-full gradient-secondary text-white py-3 text-lg font-semibold hover:shadow-md transition-all duration-200">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Reserve Now
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      You won't be charged yet
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Free cancellation</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span>Instant booking</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Award className="w-4 h-4 text-green-600" />
                        <span>Alumni exclusive</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 slide-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 jakarta-font">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear firsthand from alumni who've stayed with us — their stories
              of comfort, connection, and memorable experiences.
            </p>
          </div>

          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-1">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <ReviewCard {...review} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

interface Review {
  name: string;
  department: string;
  year: number;
  review: string;
  rating: number;
  avatar: string;
  stayDate: string;
}

const ReviewCard: React.FC<Review> = ({
  name,
  department,
  year,
  review,
  rating,
  avatar,
  stayDate,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="glass-card hover-lift border border-gray-200 h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-blue-600 bg-blue-100 font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">
              {department} • Batch of {year}
            </p>
            <p className="text-xs text-gray-500 mt-1">{stayDate}</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-700 leading-relaxed">{review}</p>
      </CardContent>
    </Card>
  );
};

export default RoomDetails;
