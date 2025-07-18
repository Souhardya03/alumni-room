import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../store/AuthContext";
import { useLogoutMutation } from "../../store/baseApi";

export default function ProfileScreen() {
  const { token, data, refreshTokenFromCookie } = useAuth();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            refreshTokenFromCookie();
            router.replace("/");
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  const profileSections = [
    {
      title: "Account",
      items: [
        {
          icon: "person-outline",
          label: "Edit Profile",
          onPress: () => console.log("Edit Profile"),
        },
        {
          icon: "notifications-outline",
          label: "Notifications",
          onPress: () => console.log("Notifications"),
        },
        {
          icon: "lock-closed-outline",
          label: "Privacy & Security",
          onPress: () => console.log("Privacy"),
        },
      ],
    },
    {
      title: "Bookings",
      items: [
        {
          icon: "calendar-outline",
          label: "My Bookings",
          onPress: () => console.log("My Bookings"),
        },
        {
          icon: "heart-outline",
          label: "Favorites",
          onPress: () => console.log("Favorites"),
        },
        {
          icon: "star-outline",
          label: "Reviews",
          onPress: () => console.log("Reviews"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "help-circle-outline",
          label: "Help Center",
          onPress: () => console.log("Help"),
        },
        {
          icon: "call-outline",
          label: "Contact Us",
          onPress: () => console.log("Contact"),
        },
        {
          icon: "information-circle-outline",
          label: "About",
          onPress: () => router.push("/about"),
        },
      ],
    },
  ];

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <Ionicons name="person-circle-outline" size={120} color="#d1d5db" />
          <Text style={styles.notLoggedInTitle}>Welcome to Alumni Room</Text>
          <Text style={styles.notLoggedInSubtitle}>
            Sign in to access your profile and manage your bookings
          </Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push("/auth")}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {data?.data?.name?.charAt(0) || "U"}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{data?.data?.name || "User"}</Text>
          <Text style={styles.userEmail}>{data?.data?.email || ""}</Text>
        </View>

        {/* Profile Sections */}
        <View style={styles.content}>
          {profileSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.menuItem,
                      itemIndex === section.items.length - 1 &&
                        styles.lastMenuItem,
                    ]}
                    onPress={item.onPress}
                  >
                    <View style={styles.menuItemLeft}>
                      <Ionicons
                        name={item.icon as any}
                        size={24}
                        color="#6b7280"
                      />
                      <Text style={styles.menuItemLabel}>{item.label}</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#d1d5db"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutItem]}
                onPress={handleLogout}
                disabled={isLoading}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name={isLoading ? "reload" : "log-out-outline"}
                    size={24}
                    color="#ef4444"
                  />
                  <Text style={styles.logoutText}>
                    {isLoading ? "Logging out..." : "Logout"}
                  </Text>
                </View>
              </TouchableOpacity>
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
  notLoggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 20,
    marginBottom: 8,
  },
  notLoggedInSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  signInButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  profileHeader: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#6b7280",
  },
  content: {
    padding: 20,
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
  sectionContent: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemLabel: {
    fontSize: 16,
    color: "#1f2937",
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    fontSize: 16,
    color: "#ef4444",
    marginLeft: 12,
  },
});
