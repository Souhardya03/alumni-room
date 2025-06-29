"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
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
  Award,
  Filter,
  SortDesc,
  CheckCircle,
  Clock,
  Search,
  Grid3X3,
  List,
  Calendar,
  Bath,
  Bed,
  Car,
  Zap,
} from "lucide-react";

interface RoomCardProps {
  id: number;
  title: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  singleOccupancy: number;
  doubleOccupancy: number;
  images: string[];
  amenities: string[];
  type: "AC" | "NonAC" | "Both";
  capacity: number;
  available?: number;
  featured?: boolean;
  description: string;
}

// Updated dummy data to match the Listing schema
const dummyRooms: RoomCardProps[] = [
  {
    id: 1,
    title: "Executive Suite",
    description:
      "Luxurious executive suite with modern amenities and stunning campus views",
    location: "Kanchenjunga Block A",
    distance: "Ground Floor",
    rating: 4.8,
    reviews: 245,
    singleOccupancy: 1200,
    doubleOccupancy: 1800,
    type: "AC",
    capacity: 2,
    available: 3,
    featured: true,
    amenities: ["Free Wi-Fi", "AC", "Breakfast", "Room Service", "Balcony"],
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
    description:
      "Comfortable deluxe room with air conditioning and essential amenities",
    location: "Kanchenjunga Block B",
    distance: "First Floor",
    rating: 4.5,
    reviews: 189,
    singleOccupancy: 950,
    doubleOccupancy: 1400,
    type: "AC",
    capacity: 2,
    available: 5,
    featured: false,
    amenities: ["Free Wi-Fi", "AC", "Breakfast", "Room Service"],
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
    description:
      "Budget-friendly standard room with fan cooling and basic amenities",
    location: "Kanchenjunga Block C",
    distance: "Second Floor",
    rating: 4.2,
    reviews: 156,
    singleOccupancy: 700,
    doubleOccupancy: 1000,
    type: "NonAC",
    capacity: 2,
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
    description:
      "Premium suite with luxury amenities and panoramic campus views",
    location: "Kanchenjunga Block A",
    distance: "Third Floor",
    rating: 4.9,
    reviews: 312,
    singleOccupancy: 1500,
    doubleOccupancy: 2200,
    type: "Both",
    capacity: 3,
    available: 2,
    featured: true,
    amenities: [
      "Free Wi-Fi",
      "AC",
      "Breakfast",
      "Room Service",
      "Balcony",
      "Parking",
    ],
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
  singleOccupancy,
  doubleOccupancy,
  images,
  amenities,
  type,
  capacity,
  available = 0,
  featured = false,
  description,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Free Wi-Fi": <Wifi className="w-4 h-4" />,
      AC: <AirVent className="w-4 h-4" />,
      Breakfast: <Coffee className="w-4 h-4" />,
      "Room Service": <CheckCircle className="w-4 h-4" />,
      Balcony: <CheckCircle className="w-4 h-4" />,
      Fan: <Zap className="w-4 h-4" />,
      Parking: <Car className="w-4 h-4" />,
    };
    return iconMap[amenity] || <CheckCircle className="w-4 h-4" />;
  };

  const getAvailabilityStatus = (available: number) => {
    if (available <= 2)
      return {
        text: "Only few left!",
        color: "bg-red-100 text-red-700 border-red-200",
      };
    if (available <= 5)
      return {
        text: "Limited availability",
        color: "bg-orange-100 text-orange-700 border-orange-200",
      };
    return {
      text: "Available",
      color: "bg-green-100 text-green-700 border-green-200",
    };
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

  const availabilityStatus = getAvailabilityStatus(available);

  return (
    <>
      <Card className="group relative overflow-hidden hover-lift bg-white border border-gray-200 rounded-xl shadow-soft">
        {featured && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="gradient-warm text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-md">
              <Award className="w-3 h-3 mr-1" />
              FEATURED
            </Badge>
          </div>
        )}

        <div className="flex flex-col lg:flex-row">
          {/* Enhanced Image Section */}
          <div className="relative lg:w-80 h-64 lg:h-72 shrink-0">
            <Image
              src={images[imageIndex]}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Image Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === imageIndex ? "bg-white w-6" : "bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? "text-red-500 fill-current" : "text-gray-600"
                  }`}
                />
              </button>
            </div>

            {/* Room Type Badge */}
            <div className="absolute bottom-4 left-4 z-10">
              <Badge
                className={`${getRoomTypeColor(type)} border text-sm px-3 py-1.5 rounded-full font-medium shadow-sm`}
              >
                {type === "Both" ? "AC/Non-AC" : type}
              </Badge>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <Link href={`/rooms/${id}`}>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-2 jakarta-font">
                      {title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>
                      {location} • {distance}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {description}
                  </p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {rating}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({reviews.toLocaleString()} reviews)
                  </span>
                  <div
                    className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${availabilityStatus.color} shadow-sm`}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    {availabilityStatus.text}
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {amenities.slice(0, 4).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {amenities.length > 4 && (
                    <div className="flex items-center text-sm text-blue-600 font-medium px-3 py-2">
                      +{amenities.length - 4} more
                    </div>
                  )}
                </div>

                {/* Capacity Info */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Up to {capacity} guests</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span>Queen bed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>Private bath</span>
                  </div>
                </div>
              </div>

              {/* Pricing and Actions */}
              <div className="flex items-end justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Starting from</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{singleOccupancy.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">/ night</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Double: ₹{doubleOccupancy.toLocaleString()}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link href={`/rooms/${id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>

                  {token ? (
                    <Link href={`/rooms/${id}`}>
                      <Button
                        size="sm"
                        className="gradient-secondary text-white px-6 hover:shadow-md transition-all duration-200"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => setOpen(true)}
                      size="sm"
                      className="gradient-secondary text-white px-6 hover:shadow-md transition-all duration-200"
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const roomTypes = ["all", "AC", "NonAC", "Both"];
  const sortOptions = [
    { value: "featured", label: "Featured First" },
    { value: "price", label: "Price: Low to High" },
    { value: "rating", label: "Rating: High to Low" },
    { value: "reviews", label: "Most Reviewed" },
  ];

  const filteredAndSortedRooms = dummyRooms
    .filter((room) => {
      const matchesType = selectedType === "all" || room.type === selectedType;
      const matchesSearch =
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return Number(b.featured) - Number(a.featured);
        case "price":
          return a.singleOccupancy - b.singleOccupancy;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20">
      {/* Enhanced Hero Header */}
      <div className="relative bg-white border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-4xl">
            <div className="fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 jakarta-font">
                Kanchenjunga Rooms
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Premium alumni accommodation with modern amenities and
                comfortable stays
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Flexible booking</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free cancellation</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>Alumni exclusive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Filters and Search */}
        <div className="glass-card rounded-xl shadow-soft border border-gray-200/50 p-6 mb-8 scale-in">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search rooms, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
              {/* Room Type Filter */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-gray-700 font-medium">
                  <Filter className="w-4 h-4 mr-2" />
                  <span className="hidden sm:block">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roomTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedType === type
                          ? "gradient-primary text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type === "all"
                        ? "All Rooms"
                        : type === "Both"
                          ? "AC/Non-AC"
                          : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort and View Options */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <SortDesc className="w-4 h-4 text-gray-700" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-white shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredAndSortedRooms.length}
            </span>{" "}
            rooms found
          </div>
        </div>

        {/* Enhanced Rooms Display */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
              : "space-y-6 mb-8"
          }
        >
          {filteredAndSortedRooms.map((room, index) => (
            <div
              key={room.id}
              className="fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <RoomCard {...room} />
            </div>
          ))}
        </div>

        {/* Enhanced Load More Section */}
        {filteredAndSortedRooms.length > 0 && (
          <div className="text-center space-y-6 py-8">
            <div className="text-gray-500 text-sm">
              You've viewed {filteredAndSortedRooms.length} of{" "}
              {dummyRooms.length} available rooms
            </div>
            <Button
              variant="outline"
              className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 hover-lift"
            >
              Load More Rooms
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredAndSortedRooms.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
              }}
              variant="outline"
              className="px-6 py-2"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
