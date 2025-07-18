import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const stats = [
  { number: "500+", label: "Happy Alumni" },
  { number: "4", label: "Comfortable Rooms" },
  { number: "4.8", label: "Average Rating" },
  { number: "24/7", label: "Support" },
];

const features = [
  {
    icon: "wifi",
    title: "Free Wi-Fi",
    description: "High-speed internet throughout",
  },
  {
    icon: "car",
    title: "Parking",
    description: "Complimentary parking space",
  },
  {
    icon: "cafe",
    title: "Dining",
    description: "On-campus dining facilities",
  },
  {
    icon: "shield-checkmark",
    title: "Security",
    description: "24/7 campus security",
  },
];

const reviews = [
  {
    name: "Shayan Kundu",
    department: "Computer Science",
    year: 2022,
    review:
      "Staying at the Alumni House brought back so many memories! The comfort, hospitality, and location were just perfect.",
    rating: 5,
  },
  {
    name: "Aarav Mehta",
    department: "Mechanical Engineering",
    year: 2020,
    review:
      "It felt amazing to be back on campus. The Alumni House was cozy and had everything I needed for a comfortable stay.",
    rating: 4,
  },
];

export default function HomeScreen() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name="star"
        size={16}
        color={index < rating ? "#fbbf24" : "#d1d5db"}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={["#1e3a8a", "#3730a3", "#581c87"]}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <Ionicons name="location" size={20} color="#93c5fd" />
              <Text style={styles.badgeText}>Return to Where It All Began</Text>
            </View>

            <Text style={styles.heroTitle}>
              Experience comfort,{" "}
              <Text style={styles.heroTitleGradient}>connection,</Text> and
              nostalgia
            </Text>

            <Text style={styles.heroSubtitle}>
              Your home away from home on campus. Book your stay and rekindle
              the memories at our Alumni House.
            </Text>

            <View style={styles.ctaButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/rooms")}
              >
                <Text style={styles.primaryButtonText}>Book Your Stay</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/about")}
              >
                <Text style={styles.secondaryButtonText}>Virtual Tour</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statNumber}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About Kanchenjunga</Text>
            <View style={styles.divider} />
          </View>

          <Text style={styles.aboutText}>
            Kanchenjunga is the brainchild of our own Alumni - the Engineers of
            JGEC, who drive the Industry today. It is meant to facilitate
            students and act as a convention centre.
          </Text>

          <Text style={styles.subHeading}>Purpose of Kanchenjunga</Text>

          <View style={styles.purposeList}>
            {[
              "Management & Technical Development programs, Seminars, Workshops",
              "Industry Achievers interaction with students",
              "Alumni lecture programs on specialized subjects",
              "Transit house facility during holidays",
            ].map((item, index) => (
              <View key={index} style={styles.purposeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.purposeText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Ionicons
                  name={feature.icon as any}
                  size={32}
                  color="#7c3aed"
                />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>What Our Guests Say</Text>
          <Text style={styles.sectionSubtitle}>
            Hear firsthand from alumni who've stayed with us — their stories of
            comfort, connection, and memorable experiences.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.reviewsScroll}
          >
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Text>
                  </View>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <Text style={styles.reviewerDetails}>
                      {review.department} • Batch of {review.year}
                    </Text>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  {renderStars(review.rating)}
                </View>

                <Text style={styles.reviewText}>{review.review}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  heroSection: {
    minHeight: 500,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  heroContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 20,
  },
  badgeText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  heroTitleGradient: {
    color: "#93c5fd",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#93c5fd",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaButtons: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 12,
    color: "#93c5fd",
    marginTop: 4,
  },
  aboutSection: {
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: "#7c3aed",
    borderRadius: 2,
  },
  aboutText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  purposeList: {
    marginBottom: 24,
  },
  purposeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  purposeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  featureCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    width: (width - 52) / 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  reviewsSection: {
    padding: 20,
    backgroundColor: "white",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  reviewsScroll: {
    marginTop: 12,
  },
  reviewCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginRight: 16,
    width: width * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewerInfo: {
    marginLeft: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  reviewerDetails: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
});
