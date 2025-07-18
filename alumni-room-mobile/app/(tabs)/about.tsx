import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const features = [
  {
    icon: "wifi",
    title: "Free Wi-Fi",
    description: "High-speed internet throughout the facility",
  },
  {
    icon: "car",
    title: "Parking",
    description: "Complimentary parking space for all guests",
  },
  {
    icon: "cafe",
    title: "Dining",
    description: "On-campus dining facilities with local cuisine",
  },
  {
    icon: "shield-checkmark",
    title: "Security",
    description: "24/7 campus security for your safety",
  },
  {
    icon: "business",
    title: "Conference Rooms",
    description: "Modern meeting spaces for events",
  },
  {
    icon: "library",
    title: "Study Areas",
    description: "Quiet spaces for work and study",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
  "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=400",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About Kanchenjunga</Text>
          <View style={styles.divider} />
        </View>

        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            }}
            style={styles.heroImage}
          />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.introText}>
            Kanchenjunga is the brainchild of our own Alumni - the Engineers of
            JGEC, who drive the Industry today. It is meant to facilitate
            students and act as a convention centre.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Purpose of Kanchenjunga</Text>
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
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities & Amenities</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons
                      name={feature.icon as any}
                      size={28}
                      color="#7c3aed"
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* History Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Heritage</Text>
            <View style={styles.historyCard}>
              <Text style={styles.historyText}>
                Named after the majestic Kanchenjunga mountain, our facility
                stands as a testament to the enduring spirit of JGEC alumni.
                Just as Kanchenjunga represents strength, beauty, and
                permanence, our alumni house embodies the lasting bonds between
                the institution and its graduates.
              </Text>

              <Text style={styles.historyText}>
                Since its establishment, Kanchenjunga has served as more than
                just accommodation - it's a bridge connecting past, present, and
                future generations of engineers who have walked these halls.
              </Text>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>By the Numbers</Text>
            <View style={styles.statsGrid}>
              {[
                { number: "500+", label: "Alumni Hosted" },
                { number: "4", label: "Comfortable Rooms" },
                { number: "15+", label: "Years of Service" },
                { number: "100+", label: "Events Organized" },
              ].map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Gallery Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.gallery}
            >
              {galleryImages.map((image, index) => (
                <View key={index} style={styles.galleryImageContainer}>
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Contact Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.contactCard}>
              <View style={styles.contactItem}>
                <Ionicons name="location" size={20} color="#7c3aed" />
                <View style={styles.contactText}>
                  <Text style={styles.contactLabel}>Address</Text>
                  <Text style={styles.contactValue}>
                    Kanchenjunga Alumni House{"\n"}
                    Jalpaiguri Government Engineering College{"\n"}
                    Jalpaiguri, West Bengal
                  </Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="call" size={20} color="#7c3aed" />
                <View style={styles.contactText}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>+91 XX XXXX XXXX</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="mail" size={20} color="#7c3aed" />
                <View style={styles.contactText}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>
                    kanchenjunga@jgec.ac.in
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
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
  heroImageContainer: {
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 20,
  },
  introText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  purposeList: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
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
  featureIconContainer: {
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 16,
  },
  historyCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: (width - 52) / 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7c3aed",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  gallery: {
    marginTop: 8,
  },
  galleryImageContainer: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  galleryImage: {
    width: 200,
    height: 150,
  },
  contactCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
});
