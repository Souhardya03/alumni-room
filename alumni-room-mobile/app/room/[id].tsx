import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useGetListingByIdQuery } from "../../store/features/rooms";
import { useAuth } from "../../store/AuthContext";

const { width } = Dimensions.get("window");

export default function RoomDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetListingByIdQuery({ id: id as string });
  const { token } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const room = data?.data;

  const amenities = [
    { icon: "wifi", name: "Free Wi-Fi" },
    { icon: "snow", name: "Air Conditioning" },
    { icon: "cafe", name: "Breakfast" },
    { icon: "car", name: "Parking" },
    { icon: "tv", name: "Television" },
    { icon: "business", name: "Work Desk" },
  ];

  const handleBookNow = () => {
    if (!token) {
      router.push("/auth");
      return;
    }
    // Handle booking logic here
    Alert.alert("Booking", "Booking functionality will be implemented here");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading room details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!room) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#ef4444" />
          <Text style={styles.errorTitle}>Room Not Found</Text>
          <Text style={styles.errorText}>
            The room you're looking for doesn't exist or has been removed.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const ratings = room.reviews?.map((review: any) => review.rating) || [];
  const avgRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum: number, r: number) => sum + r, 0) /
          ratings.length
        ).toFixed(1)
      : "N/A";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Room Details</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setSelectedImageIndex(index);
            }}
          >
            {room.images?.map((image: any, index: number) => (
              <Image
                key={index}
                source={{
                  uri:
                    `http://localhost:5000${image.url}` ||
                    "https://via.placeholder.com/400x300",
                }}
                style={styles.roomImage}
              />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {room.images?.map((_: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === selectedImageIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Room Info */}
        <View style={styles.content}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <Text style={styles.roomTitle}>{room.title}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color="#6b7280" />
              <Text style={styles.locationText}>Kanchenjunga, JGEC</Text>
            </View>

            <View style={styles.ratingContainer}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color="white" />
                <Text style={styles.ratingText}>{avgRating}</Text>
              </View>
              <Text style={styles.reviewsText}>
                ({room.reviews?.length || 0} reviews)
              </Text>
            </View>
          </View>

          {/* Room Type Badge */}
          <View style={styles.typeBadgeContainer}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>
                {room.type === "Both"
                  ? "AC/Non-AC Available"
                  : `${room.type} Room`}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {room.description ||
                "Experience comfort and convenience in our well-appointed rooms. Perfect for alumni visiting the campus, each room is designed to provide a home away from home with modern amenities and a peaceful environment."}
            </Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons
                    name={amenity.icon as any}
                    size={24}
                    color="#3b82f6"
                  />
                  <Text style={styles.amenityText}>{amenity.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View style={styles.pricingContainer}>
              <View style={styles.priceCard}>
                <Text style={styles.priceLabel}>Single Occupancy</Text>
                <Text style={styles.price}>
                  ₹{room.singleOccupancy?.toLocaleString()}
                </Text>
                <Text style={styles.priceUnit}>per night</Text>
              </View>
              <View style={styles.priceCard}>
                <Text style={styles.priceLabel}>Double Occupancy</Text>
                <Text style={styles.price}>
                  ₹{room.doubleOccupancy?.toLocaleString()}
                </Text>
                <Text style={styles.priceUnit}>per night</Text>
              </View>
            </View>
          </View>

          {/* Reviews */}
          {room.reviews && room.reviews.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              {room.reviews.slice(0, 3).map((review: any, index: number) => (
                <View key={index} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.reviewAvatarText}>A</Text>
                    </View>
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewerName}>Anonymous</Text>
                      <View style={styles.reviewRating}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Ionicons
                            key={i}
                            name="star"
                            size={14}
                            color={i < review.rating ? "#fbbf24" : "#d1d5db"}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.content}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <Text style={styles.bottomPrice}>
            ₹{room.singleOccupancy?.toLocaleString()}
          </Text>
          <Text style={styles.bottomPriceLabel}>per night</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>
            {token ? "Book Now" : "Sign In to Book"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  imageGallery: {
    position: "relative",
    height: 300,
  },
  roomImage: {
    width,
    height: 300,
  },
  imageIndicators: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  activeIndicator: {
    backgroundColor: "white",
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 16,
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  reviewsText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 8,
  },
  typeBadgeContainer: {
    marginBottom: 24,
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ede9fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7c3aed",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  amenityItem: {
    alignItems: "center",
    width: (width - 80) / 3,
  },
  amenityText: {
    fontSize: 12,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 4,
  },
  pricingContainer: {
    flexDirection: "row",
    gap: 12,
  },
  priceCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  priceUnit: {
    fontSize: 12,
    color: "#6b7280",
  },
  reviewCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAvatarText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  reviewInfo: {
    marginLeft: 12,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  reviewRating: {
    flexDirection: "row",
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 18,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  priceInfo: {
    alignItems: "flex-start",
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  bookButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
