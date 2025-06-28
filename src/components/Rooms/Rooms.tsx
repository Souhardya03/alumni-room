"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { useAuth } from "@/store/AuthContext";
import { AuthModal } from "../Modals/AuthModal";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Users,
  Heart,
  ArrowRight,
  Bed,
  Bath,
  AirVent,
  Eye,
  Calendar,
  Award,
  Shield,
  Sparkles,
  Filter,
  SortDesc,
} from "lucide-react";

interface HotelCardProps {
  id: number;
  title: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  price: number;
  images: string[];
  amenities: string[];
  roomType: string;
  capacity: number;
  available?: number;
  featured?: boolean;
}

const dummyRooms = [
  {
    id: 1,
    title: "Executive Suite",
    location: "Kanchenjunga Block A",
    distance: "Ground Floor",
    rating: 4.8,
    reviews: 245,
    price: 1200,
    roomType: "AC Deluxe",
    capacity: 2,
    available: 3,
    featured: true,
    amenities: ["Free Wi-Fi", "AC", "Breakfast", "Room Service"],
    images: [
      "/images/test-1.jpg",
      "/images/test-2.jpg",
      "/images/test-3.jpg",
      "/images/test-5.jpeg",
    ],
  },
  {
    id: 2,
    title: "Deluxe Room",
    location: "Kanchenjunga Block B",
    distance: "First Floor",
    rating: 4.5,
    reviews: 189,
    price: 950,
    roomType: "AC",
    capacity: 2,
    available: 5,
    featured: false,
    amenities: ["Free Wi-Fi", "AC", "Breakfast"],
    images: [
      "/images/test-2.jpg",
      "/images/test-1.jpg",
      "/images/test-4.webp",
      "/images/test-5.jpeg",
    ],
  },
  {
    id: 3,
    title: "Standard Room",
    location: "Kanchenjunga Block C",
    distance: "Second Floor",
    rating: 4.2,
    reviews: 156,
    price: 700,
    roomType: "Non-AC",
    capacity: 1,
    available: 8,
    featured: false,
    amenities: ["Free Wi-Fi", "Fan", "Breakfast"],
    images: [
      "/images/test-3.jpg",
      "/images/test-1.jpg",
      "/images/test-2.jpg",
      "/images/test-4.webp",
    ],
  },
  {
    id: 4,
    title: "Premium Suite",
    location: "Kanchenjunga Block A",
    distance: "Third Floor",
    rating: 4.9,
    reviews: 312,
    price: 1500,
    roomType: "AC Deluxe",
    capacity: 3,
    available: 2,
    featured: true,
    amenities: ["Free Wi-Fi", "AC", "Breakfast", "Room Service", "Balcony"],
    images: [
      "/images/test-4.webp",
      "/images/test-1.jpg",
      "/images/test-2.jpg",
      "/images/test-3.jpg",
    ],
  },
];

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  title,
  location,
  distance,
  rating,
  reviews,
  price,
  images,
  amenities,
  roomType,
  capacity,
  available = 0,
  featured = false,
}) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Free Wi-Fi": <Wifi className="w-4 h-4" />,
      AC: <AirVent className="w-4 h-4" />,
      Breakfast: <Coffee className="w-4 h-4" />,
      "Room Service": <Bed className="w-4 h-4" />,
      Balcony: <Bath className="w-4 h-4" />,
      Fan: <AirVent className="w-4 h-4" />,
    };
    return iconMap[amenity] || <Bed className="w-4 h-4" />;
  };

  const getPriceColor = (price: number) => {
    if (price >= 1400) return "text-red-600";
    if (price >= 1000) return "text-orange-600";
    if (price >= 800) return "text-blue-600";
    return "text-green-600";
  };

  const getAvailabilityStatus = (available: number) => {
    if (available <= 2)
      return { text: "Only few left!", color: "text-red-600 bg-red-50" };
    if (available <= 5)
      return {
        text: "Limited availability",
        color: "text-orange-600 bg-orange-50",
      };
    return { text: "Available", color: "text-green-600 bg-green-50" };
  };

  const availabilityStatus = getAvailabilityStatus(available);

  return (
    <>
      <Card className="group relative overflow-hidden hover-lift bg-white border-0 shadow-luxury hover:shadow-premium transition-all duration-500 rounded-3xl">
        {featured && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-3 py-1 shadow-lg">
              <Award className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}

        {/* Image Section */}
        <div className="relative">
          <div className="relative h-80 overflow-hidden rounded-t-3xl">
            <Image
              src={mainImage}
              alt={title}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoading ? "blur-sm" : "blur-0"
              }`}
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

            {/* Top Floating Elements */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-white/95 transition-all duration-200 group/heart"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 group-hover/heart:scale-110 ${
                    isLiked ? "text-red-500 fill-current" : "text-gray-600"
                  }`}
                />
              </button>

              <Link href={`/rooms/${id}`}>
                <button className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-white/95 transition-all duration-200 group/view">
                  <Eye className="w-5 h-5 text-gray-600 group-hover/view:scale-110 transition-transform duration-200" />
                </button>
              </Link>
            </div>

            {/* Room Type Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="glass-card text-gray-800 font-semibold px-4 py-2 text-sm">
                {roomType}
              </Badge>
            </div>

            {/* Image Thumbnails */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="flex space-x-3 justify-center">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      mainImage === img
                        ? "border-white shadow-lg"
                        : "border-white/50 hover:border-white/80"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`thumbnail-${index}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <Link href={`/rooms/${id}`}>
                <h3 className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors cursor-pointer mb-2 leading-tight">
                  {title}
                </h3>
              </Link>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                <span className="text-sm font-medium">
                  {location} • {distance}
                </span>
              </div>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${availabilityStatus.color}`}
              >
                <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                {availabilityStatus.text}
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-1 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold text-gray-900 text-lg">
                  {rating}
                </span>
                <span className="text-sm text-gray-500">({reviews})</span>
              </div>
              <div className="text-right">
                <span className={`text-3xl font-bold ${getPriceColor(price)}`}>
                  ₹{price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 block font-medium">
                  per night
                </span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
              Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 4).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-full border border-purple-100 hover:shadow-md transition-all duration-200"
                >
                  {getAmenityIcon(amenity)}
                  <span className="text-sm text-gray-700 font-medium">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Capacity and Book Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2 text-purple-500" />
              <span className="text-sm font-medium">
                Up to {capacity} guests
              </span>
            </div>

            {token ? (
              <Link href={`/rooms/${id}`}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 btn-modern">
                  Book Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 btn-modern"
              >
                Sign In to Book
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {open && <AuthModal open={open} closed={() => setOpen(false)} />}
    </>
  );
};

const Rooms: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const roomTypes = ["all", "AC Deluxe", "AC", "Non-AC"];
  const sortOptions = [
    { value: "featured", label: "Featured First" },
    { value: "price", label: "Price: Low to High" },
    { value: "rating", label: "Rating: High to Low" },
    { value: "reviews", label: "Most Reviewed" },
  ];

  const filteredAndSortedRooms = dummyRooms
    .filter((room) => selectedType === "all" || room.roomType === selectedType)
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return Number(b.featured) - Number(a.featured);
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pt-20">
      {/* Hero Header */}
      <div className="relative py-20 bg-gradient-to-br from-purple-900/95 via-blue-900/90 to-indigo-900/95 mb-16">
        <div className="absolute inset-0 bg-[url('/images/test-1.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-blue-900/90 to-indigo-900/95" />

        <div className="relative container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium px-6 py-3 rounded-full mb-8">
              <Shield className="w-4 h-4 mr-2" />
              Premium Alumni Accommodation
            </Badge>

            <h1 className="jakarta-font text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Kanchenjunga{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rooms
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Rediscover comfort and connection in our thoughtfully designed
              rooms. Where memories are made and alumni find their home away
              from home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-700 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <Calendar className="w-5 h-5 mr-2" />
                Check Availability
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold"
              >
                Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 pb-20">
        {/* Enhanced Filters */}
        <div className="glass-card rounded-3xl shadow-luxury p-8 mb-12 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Room Type Filter */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center text-gray-700 font-semibold mr-4">
                <Filter className="w-5 h-5 mr-2 text-purple-600" />
                Filter by type:
              </div>
              {roomTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                    selectedType === type
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"
                  }`}
                >
                  {type === "all" ? "All Rooms" : type}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-700 font-semibold">
                <SortDesc className="w-5 h-5 mr-2 text-purple-600" />
                Sort by:
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none bg-white shadow-sm font-medium text-gray-700 min-w-[200px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {filteredAndSortedRooms.map((room, index) => (
            <div
              key={room.id}
              className="fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <HotelCard {...room} />
            </div>
          ))}
        </div>

        {/* Results Summary & Load More */}
        <div className="text-center space-y-6">
          <div className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-purple-700">
              {filteredAndSortedRooms.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-purple-700">
              {dummyRooms.length}
            </span>{" "}
            available rooms
          </div>

          <Button
            variant="outline"
            className="px-12 py-4 rounded-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Load More Rooms
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
