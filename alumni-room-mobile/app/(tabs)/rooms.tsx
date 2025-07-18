import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGetListingsQuery } from "../../store/features/rooms";
import { useAuth } from "../../store/AuthContext";

interface RoomCardProps {
  id: number;
  title: string;
  reviews: Array<{
    id: number;
    content: string;
    rating: number;
  }>;
  singleOccupancy: number;
  doubleOccupancy: number;
  images: Array<{
    id: number;
    url: string;
  }>;
  type: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  title,
  reviews,
  singleOccupancy,
  doubleOccupancy,
  images,
  type,
}) => {
  const { token } = useAuth();

  const amenities = ["Free Wi-Fi", "AC", "Breakfast", "Room Service"];

  const ratings = reviews.map((review) => review.rating);
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
      : "N/A";

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: string } = {
      "Free Wi-Fi": "wifi",
      AC: "snow",
      Breakfast: "cafe",
      "Room Service": "checkmark-circle",
    };
    return iconMap[amenity] || "checkmark-circle";
  };

  return (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => router.push(`/room/${id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: images[0]?.url
              ? `http://localhost:5000${images[0].url}`
              : "https://via.placeholder.com/300x200",
          }}
          style={styles.roomImage}
        />
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>
            {type === "Both" ? "AC/Non-AC" : type}
          </Text>
        </View>
      </View>

      <View style={styles.roomInfo}>
        <View style={styles.roomHeader}>
          <Text style={styles.roomTitle}>{title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={14} color="#6b7280" />
            <Text style={styles.locationText}>Kanchenjunga, JGEC</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="white" />
            <Text style={styles.ratingText}>{avgRating}</Text>
          </View>
          <Text style={styles.reviewsText}>({reviews.length} reviews)</Text>
        </View>

        <View style={styles.amenitiesContainer}>
          {amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={styles.amenityItem}>
              <Ionicons
                name={getAmenityIcon(amenity) as any}
                size={12}
                color="#6b7280"
              />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.price}>
              ₹{singleOccupancy.toLocaleString()}
            </Text>
            <Text style={styles.priceLabel}>per night</Text>
            <Text style={styles.doublePrice}>
              Double: ₹{doubleOccupancy.toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              if (token) {
                router.push(`/room/${id}`);
              } else {
                router.push("/auth");
              }
            }}
          >
            <Text style={styles.bookButtonText}>
              {token ? "Book Now" : "Sign In to Book"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function RoomsScreen() {
  const { data, isLoading } = useGetListingsQuery({ search: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const rooms = data?.data || [];
  const roomTypes = ["all", "AC", "NonAC", "Both"];

  const filteredRooms = rooms.filter((room) => {
    const matchesType = selectedType === "all" || room.type === selectedType;
    const matchesSearch = room.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading rooms...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kanchenjunga Rooms</Text>
        <Text style={styles.headerSubtitle}>
          Premium alumni accommodation with modern amenities
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.typeFilters}>
            {roomTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeFilter,
                  selectedType === type && styles.activeTypeFilter,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.typeFilterText,
                    selectedType === type && styles.activeTypeFilterText,
                  ]}
                >
                  {type === "all"
                    ? "All Rooms"
                    : type === "Both"
                      ? "AC/Non-AC"
                      : type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Rooms List */}
      <ScrollView style={styles.roomsList} showsVerticalScrollIndicator={false}>
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}

        {filteredRooms.length === 0 && (
          <View style={styles.noRoomsContainer}>
            <Ionicons name="bed-outline" size={64} color="#d1d5db" />
            <Text style={styles.noRoomsTitle}>No rooms found</Text>
            <Text style={styles.noRoomsText}>
              Try adjusting your search criteria
            </Text>
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={() => {
                setSearchQuery("");
                setSelectedType("all");
              }}
            >
              <Text style={styles.clearFiltersText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6b7280",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  filtersContainer: {
    backgroundColor: "white",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#1f2937",
  },
  typeFilters: {
    flexDirection: "row",
    gap: 8,
  },
  typeFilter: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTypeFilter: {
    backgroundColor: "#3b82f6",
  },
  typeFilterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4b5563",
  },
  activeTypeFilterText: {
    color: "white",
  },
  roomsList: {
    flex: 1,
    padding: 16,
  },
  roomCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  roomImage: {
    width: "100%",
    height: "100%",
  },
  typeBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
  },
  roomInfo: {
    padding: 16,
  },
  roomHeader: {
    marginBottom: 8,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  reviewsText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 8,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  amenityText: {
    fontSize: 12,
    color: "#6b7280",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  priceLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  doublePrice: {
    fontSize: 10,
    color: "#9ca3af",
  },
  bookButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  noRoomsContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noRoomsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  noRoomsText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  clearFiltersButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearFiltersText: {
    color: "#4b5563",
    fontSize: 14,
    fontWeight: "500",
  },
});
