import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useGetRoomByIdQuery, useCreateBookingMutation } from '../../src/store/baseApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../src/store';
import { toggleFavorite } from '../../src/store/slices/roomsSlice';
import { useAuth } from '../../src/store/AuthContext';

const { width } = Dimensions.get('window');

export default function RoomDetailsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const { data: room, isLoading } = useGetRoomByIdQuery(id as string);
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const favorites = useSelector((state: RootState) => state.rooms.favorites);

  const isFavorite = favorites.includes(id as string);

  const amenities = [
    { id: 'wifi', name: 'WiFi', icon: 'wifi' },
    { id: 'parking', name: 'Parking', icon: 'car' },
    { id: 'ac', name: 'Air Conditioning', icon: 'snow' },
    { id: 'kitchen', name: 'Kitchen', icon: 'restaurant' },
    { id: 'laundry', name: 'Laundry', icon: 'shirt' },
    { id: 'gym', name: 'Gym', icon: 'fitness' },
    { id: 'pool', name: 'Swimming Pool', icon: 'water' },
    { id: 'security', name: '24/7 Security', icon: 'shield' },
  ];

  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 6);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(id as string));
  };

  const handleBooking = () => {
    if (!token) {
      Alert.alert('Login Required', 'Please login to book this room.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => router.push('/auth/login') },
      ]);
      return;
    }

    Alert.alert(
      'Book Room',
      'Would you like to proceed with booking this room?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: confirmBooking },
      ]
    );
  };

  const confirmBooking = async () => {
    try {
      await createBooking({
        roomId: id as string,
        checkIn: new Date().toISOString(),
        checkOut: new Date(Date.now() + 86400000).toISOString(), // Next day
        guests: 1,
      }).unwrap();

      Alert.alert('Success', 'Room booked successfully!', [
        { text: 'OK', onPress: () => router.push('/profile') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to book room. Please try again.');
    }
  };

  const renderImage = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
      <Image
        source={{ uri: item.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' }}
        style={styles.galleryImage}
      />
    </TouchableOpacity>
  );

  const renderReview = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewAvatar}>
          <Text style={styles.reviewAvatarText}>
            {item.user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewName}>{item.user?.name || 'Anonymous'}</Text>
          <View style={styles.reviewRating}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={14}
                color={i < item.rating ? '#fbbf24' : '#e5e7eb'}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.content}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading room details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!room) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Room not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ 
              uri: room.images?.[selectedImageIndex]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' 
            }}
            style={styles.mainImage}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#ef4444' : 'white'}
            />
          </TouchableOpacity>
        </View>

        {/* Image Gallery */}
        {room.images && room.images.length > 1 && (
          <View style={styles.galleryContainer}>
            <FlatList
              data={room.images}
              renderItem={renderImage}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.gallery}
            />
          </View>
        )}

        {/* Room Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.roomTitle}>{room.title}</Text>
          <View style={styles.roomLocation}>
            <Ionicons name="location" size={16} color="#6b7280" />
            <Text style={styles.locationText}>{room.location || 'Location not specified'}</Text>
          </View>
          
          <View style={styles.hostInfo}>
            <View style={styles.hostAvatar}>
              <Text style={styles.hostAvatarText}>
                {room.user?.name?.charAt(0)?.toUpperCase() || 'H'}
              </Text>
            </View>
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>Hosted by {room.user?.name || 'Host'}</Text>
              <Text style={styles.hostMeta}>
                {room.user?.department || 'Department'} • Batch of {room.user?.graduationYear || '2020'}
              </Text>
            </View>
          </View>

          <View style={styles.roomFeatures}>
            <View style={styles.feature}>
              <Ionicons name="people" size={20} color="#6b7280" />
              <Text style={styles.featureText}>2 guests</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="bed" size={20} color="#6b7280" />
              <Text style={styles.featureText}>1 bedroom</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="home" size={20} color="#6b7280" />
              <Text style={styles.featureText}>Entire place</Text>
            </View>
          </View>

          <Text style={styles.roomDescription}>
            {room.description || 'A comfortable and well-equipped room perfect for your stay. Enjoy modern amenities and a convenient location.'}
          </Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {displayedAmenities.map((amenity) => (
              <View key={amenity.id} style={styles.amenityItem}>
                <Ionicons name={amenity.icon as any} size={24} color="#6b7280" />
                <Text style={styles.amenityText}>{amenity.name}</Text>
              </View>
            ))}
          </View>
          {amenities.length > 6 && (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => setShowAllAmenities(!showAllAmenities)}
            >
              <Text style={styles.showMoreText}>
                {showAllAmenities ? 'Show less' : `Show all ${amenities.length} amenities`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <View style={styles.overallRating}>
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text style={styles.ratingText}>4.8 • {room.reviews?.length || 0} reviews</Text>
            </View>
          </View>
          
          {room.reviews && room.reviews.length > 0 ? (
            <FlatList
              data={room.reviews.slice(0, 3)}
              renderItem={renderReview}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noReviewsText}>No reviews yet</Text>
          )}
        </View>

        {/* Pricing */}
        <View style={styles.pricingSection}>
          <View style={styles.pricingInfo}>
            <Text style={styles.priceLabel}>Single Occupancy</Text>
            <Text style={styles.priceValue}>₹{room.singleOccupancy}/night</Text>
          </View>
          <View style={styles.pricingInfo}>
            <Text style={styles.priceLabel}>Double Occupancy</Text>
            <Text style={styles.priceValue}>₹{room.doubleOccupancy}/night</Text>
          </View>
        </View>
      </ScrollView>

      {/* Booking Footer */}
      <View style={styles.bookingFooter}>
        <View style={styles.priceInfo}>
          <Text style={styles.footerPrice}>₹{room.singleOccupancy}</Text>
          <Text style={styles.footerPriceUnit}>/night</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, isBooking && styles.bookButtonDisabled]}
          onPress={handleBooking}
          disabled={isBooking}
        >
          <Text style={styles.bookButtonText}>
            {isBooking ? 'Booking...' : 'Book Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  galleryContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  gallery: {
    paddingHorizontal: 20,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  roomLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#6b7280',
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hostDetails: {
    marginLeft: 12,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  hostMeta: {
    fontSize: 14,
    color: '#6b7280',
  },
  roomFeatures: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
  },
  roomDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: (width - 72) / 2,
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 16,
    color: '#374151',
  },
  showMoreButton: {
    marginTop: 8,
  },
  showMoreText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    color: '#374151',
  },
  reviewCard: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewInfo: {
    marginLeft: 12,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 20,
  },
  pricingSection: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  pricingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#374151',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  bookingFooter: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  footerPriceUnit: {
    fontSize: 16,
    color: '#6b7280',
  },
  bookButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});