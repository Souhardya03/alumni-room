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
  AirVent,
  Eye,
  Calendar,
  Award,
  Filter,
  SortDesc,
  CheckCircle,
  Clock,
} from "lucide-react";

interface RoomCardProps {
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

const RoomCard: React.FC<RoomCardProps> = ({
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
  const [isLiked, setIsLiked] = useState(false);
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Free Wi-Fi": <Wifi className="w-3 h-3" />,
      AC: <AirVent className="w-3 h-3" />,
      Breakfast: <Coffee className="w-3 h-3" />,
      "Room Service": <CheckCircle className="w-3 h-3" />,
      Balcony: <CheckCircle className="w-3 h-3" />,
      Fan: <AirVent className="w-3 h-3" />,
    };
    return iconMap[amenity] || <CheckCircle className="w-3 h-3" />;
  };

  const getAvailabilityColor = (available: number) => {
    if (available <= 2) return "text-red-500 bg-red-50";
    if (available <= 5) return "text-orange-500 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <>
      <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg bg-white">
        {featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-sm">
              <Award className="w-3 h-3 mr-1" />
              FEATURED
            </Badge>
          </div>
        )}

        <div className="flex">
          {/* Image Section - Compact */}
          <div className="relative w-64 h-48 shrink-0">
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Heart Icon */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? "text-red-500 fill-current" : "text-gray-600"
                }`}
              />
            </button>

            {/* Room Type Badge */}
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-sm">
                {roomType}
              </Badge>
            </div>
          </div>

          {/* Content Section - Compact Layout */}
          <div className="flex-1 p-4">
            <div className="flex justify-between h-full">
              <div className="flex-1 space-y-2">
                {/* Title and Location */}
                <div>
                  <Link href={`/rooms/${id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-1">
                      {title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>
                      {location} • {distance}
                    </span>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {rating}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({reviews} reviews)
                  </span>
                </div>

                {/* Amenities - Compact Display */}
                <div className="flex flex-wrap gap-1">
                  {amenities.slice(0, 3).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {amenities.length > 3 && (
                    <span className="text-xs text-blue-600 font-medium">
                      +{amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Capacity and Availability */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Up to {capacity} guests</span>
                  </div>

                  <div
                    className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(available)}`}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {available <= 2
                      ? "Only few left!"
                      : available <= 5
                        ? "Limited"
                        : "Available"}
                  </div>
                </div>
              </div>

              {/* Price and Book Section */}
              <div className="flex flex-col justify-between items-end ml-4 text-right">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>

                <div className="space-y-2">
                  <Link href={`/rooms/${id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </Link>

                  {token ? (
                    <Link href={`/rooms/${id}`}>
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => setOpen(true)}
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Sign In to Book
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Simplified Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kanchenjunga Rooms
            </h1>
            <p className="text-gray-600">
              Premium alumni accommodation with modern amenities and comfortable
              stays
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Compact Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Room Type Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-gray-700 font-medium">
                <Filter className="w-4 h-4 mr-2" />
                Filter:
              </div>
              <div className="flex flex-wrap gap-2">
                {roomTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type === "all" ? "All Rooms" : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-gray-700 font-medium">
                <SortDesc className="w-4 h-4 mr-2" />
                Sort:
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm"
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

        {/* Rooms List - Compact Cards */}
        <div className="space-y-4 mb-8">
          {filteredAndSortedRooms.map((room, index) => (
            <div
              key={room.id}
              className="fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RoomCard {...room} />
            </div>
          ))}
        </div>

        {/* Results Summary */}
        <div className="text-center space-y-4">
          <div className="text-gray-600 text-sm">
            Showing {filteredAndSortedRooms.length} of {dummyRooms.length}{" "}
            available rooms
          </div>

          <Button
            variant="outline"
            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Load More Rooms
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
