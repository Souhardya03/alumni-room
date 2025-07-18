import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGetRoomsQuery } from '../../src/store/baseApi';

const { width } = Dimensions.get('window');

const featuredImages = [
  { id: 1, uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' },
  { id: 2, uri: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' },
  { id: 3, uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800' },
];

const reviews = [
  {
    id: 1,
    name: 'Shayan Kundu',
    department: 'Computer Science',
    year: '2020',
    rating: 5,
    review: 'Amazing experience! The room was clean, well-maintained, and the host was very responsive.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    department: 'Electronics',
    year: '2019',
    rating: 4,
    review: 'Great location and comfortable stay. Would definitely recommend to fellow alumni.',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState('1');
  const router = useRouter();

  const { data: rooms, isLoading } = useGetRoomsQuery({ page: 1, limit: 6 });

  const handleSearch = () => {
    router.push({
      pathname: '/search',
      params: { query: searchQuery, location, guests },
    });
  };

  const renderFeaturedImage = ({ item }: { item: any }) => (
    <Image source={{ uri: item.uri }} style={styles.carouselImage} />
  );

  const renderReview = ({ item }: { item: any }) => {
    const initials = item.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();

    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewName}>{item.name}</Text>
            <Text style={styles.reviewMeta}>
              {item.department} • Batch of {item.year}
            </Text>
          </View>
        </View>
        <View style={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name="star"
              size={16}
              color={i < item.rating ? '#fbbf24' : '#e5e7eb'}
            />
          ))}
        </View>
        <Text style={styles.reviewText}>{item.review}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Alumni Room</Text>
          <Text style={styles.subtitle}>Find your perfect stay</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchCard}>
            <View style={styles.searchRow}>
              <View style={styles.searchField}>
                <Ionicons name="search" size={20} color="#6b7280" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>
            <View style={styles.searchRow}>
              <View style={styles.searchField}>
                <Ionicons name="location" size={20} color="#6b7280" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Location"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
              <View style={styles.searchField}>
                <Ionicons name="people" size={20} color="#6b7280" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Guests"
                  value={guests}
                  onChangeText={setGuests}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search Rooms</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Images Carousel */}
        <View style={styles.carouselSection}>
          <FlatList
            data={featuredImages}
            renderItem={renderFeaturedImage}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.carousel}
          />
        </View>

        {/* Featured Rooms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Rooms</Text>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading rooms...</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {rooms?.slice(0, 3).map((room: any) => (
                <TouchableOpacity
                  key={room.id}
                  style={styles.roomCard}
                  onPress={() => router.push(`/room/${room.id}`)}
                >
                  <Image
                    source={{ uri: room.images?.[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' }}
                    style={styles.roomImage}
                  />
                  <View style={styles.roomInfo}>
                    <Text style={styles.roomTitle}>{room.title}</Text>
                    <Text style={styles.roomPrice}>₹{room.singleOccupancy}/night</Text>
                    <View style={styles.roomRating}>
                      <Ionicons name="star" size={14} color="#fbbf24" />
                      <Text style={styles.ratingText}>4.8</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Alumni Room?</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Ionicons name="shield-checkmark" size={24} color="#6366f1" />
              <Text style={styles.featureTitle}>Verified Alumni</Text>
              <Text style={styles.featureText}>All hosts are verified alumni from your network</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="home" size={24} color="#6366f1" />
              <Text style={styles.featureTitle}>Quality Stays</Text>
              <Text style={styles.featureText}>Carefully curated rooms with modern amenities</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="people" size={24} color="#6366f1" />
              <Text style={styles.featureTitle}>Community</Text>
              <Text style={styles.featureText}>Connect with fellow alumni during your stay</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="star" size={24} color="#6366f1" />
              <Text style={styles.featureTitle}>Top Rated</Text>
              <Text style={styles.featureText}>Highly rated by the alumni community</Text>
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Alumni Say</Text>
          <FlatList
            data={reviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewsList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  searchButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  carouselSection: {
    marginBottom: 20,
  },
  carousel: {
    height: 200,
  },
  carouselImage: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 20,
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 16,
    width: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roomImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  roomInfo: {
    padding: 16,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  roomPrice: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 8,
  },
  roomRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: (width - 56) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  reviewsList: {
    paddingRight: 20,
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewInfo: {
    marginLeft: 12,
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reviewMeta: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});