"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useAuth } from "@/store/AuthContext";
import { AuthModal } from "../Modals/AuthModal";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Car,
  Users,
  Heart,
  ArrowRight,
  Bed,
  Bath,
  AirVent,
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
}) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isLiked, setIsLiked] = useState(false);
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Free Wi-Fi": <Wifi className="w-4 h-4" />,
      AC: <AirVent className="w-4 h-4" />,
      Breakfast: <Coffee className="w-4 h-4" />,
      "Room Service": <Bed className="w-4 h-4" />,
      Balcony: <Bath className="w-4 h-4" />,
    };
    return iconMap[amenity] || <Bed className="w-4 h-4" />;
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
        {/* Image Section */}
        <div className="relative">
          <div className="relative h-64 md:h-72 overflow-hidden">
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Floating Elements */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/90 text-gray-800 font-semibold">
                {roomType}
              </Badge>
            </div>

            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${isLiked ? "text-red-500 fill-current" : "text-gray-600"}`}
                />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex space-x-2">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img ? "border-white" : "border-white/50"
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

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <Link href={`/rooms/${id}`}>
                <h3 className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors cursor-pointer">
                  {title}
                </h3>
              </Link>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">
                  {location} • {distance}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900">{rating}</span>
                <span className="text-sm text-gray-500">({reviews})</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{price}
                </span>
                <span className="text-sm text-gray-500 block">per night</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-full"
              >
                {getAmenityIcon(amenity)}
                <span className="text-sm text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>

          {/* Capacity and Book Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Up to {capacity} guests</span>
            </div>

            {token ? (
              <Link href={`/rooms/${id}`}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold">
                  Book Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold"
              >
                Sign In to Book
              </Button>
            )}
          </div>
        </div>
      </div>

      {open && <AuthModal open={open} closed={() => setOpen(false)} />}
    </>
  );
};

const Rooms: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price");

  const roomTypes = ["all", "AC Deluxe", "AC", "Non-AC"];
  const sortOptions = [
    { value: "price", label: "Price: Low to High" },
    { value: "rating", label: "Rating: High to Low" },
    { value: "reviews", label: "Most Reviewed" },
  ];

  const filteredRooms = dummyRooms.filter(
    (room) => selectedType === "all" || room.roomType === selectedType,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Header Section */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="jakarta-font text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Kanchenjunga{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Rooms
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Enjoy a peaceful and comfortable stay in our well-furnished alumni
            rooms — thoughtfully designed to offer the perfect blend of
            nostalgia, convenience, and homely warmth during your visit to
            campus.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Room Type Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-700 mr-2">
                Filter by type:
              </span>
              {roomTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type === "all" ? "All Rooms" : type}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-700">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <HotelCard key={room.id} {...room} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-3 rounded-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Load More Rooms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
