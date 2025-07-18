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
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useGetRoomsQuery } from '../../src/store/baseApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../src/store';
import { toggleFavorite } from '../../src/store/slices/roomsSlice';

export default function SearchScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((params.query as string) || '');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const { data: rooms, isLoading } = useGetRoomsQuery({ 
    page: 1, 
    limit: 20, 
    search: searchQuery 
  });

  const favorites = useSelector((state: RootState) => state.rooms.favorites);

  const amenities = [
    { id: 'wifi', name: 'WiFi', icon: 'wifi' },
    { id: 'parking', name: 'Parking', icon: 'car' },
    { id: 'ac', name: 'AC', icon: 'snow' },
    { id: 'kitchen', name: 'Kitchen', icon: 'restaurant' },
    { id: 'laundry', name: 'Laundry', icon: 'shirt' },
    { id: 'gym', name: 'Gym', icon: 'fitness' },
  ];

  const handleFavoriteToggle = (roomId: string) => {
    dispatch(toggleFavorite(roomId));
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const renderRoomCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => router.push(`/room/${item.id}`)}
    >
      <Image
        source={{ 
          uri: item.images?.[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' 
        }}
        style={styles.roomImage}
      />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => handleFavoriteToggle(item.id.toString())}
      >
        <Ionicons
          name={favorites.includes(item.id.toString()) ? 'heart' : 'heart-outline'}
          size={24}
          color={favorites.includes(item.id.toString()) ? '#ef4444' : '#6b7280'}
        />
      </TouchableOpacity>
      <View style={styles.roomInfo}>
        <Text style={styles.roomTitle}>{item.title}</Text>
        <View style={styles.roomLocation}>
          <Ionicons name="location" size={16} color="#6b7280" />
          <Text style={styles.locationText}>{item.location || 'Location not specified'}</Text>
        </View>
        <View style={styles.roomFeatures}>
          <View style={styles.feature}>
            <Ionicons name="people" size={16} color="#6b7280" />
            <Text style={styles.featureText}>2 guests</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="bed" size={16} color="#6b7280" />
            <Text style={styles.featureText}>1 bed</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text style={styles.featureText}>4.8</Text>
          </View>
        </View>
        <View style={styles.roomPricing}>
          <Text style={styles.roomPrice}>₹{item.singleOccupancy}</Text>
          <Text style={styles.priceUnit}>/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text style={styles.applyButton}>Apply</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Price Range</Text>
            <View style={styles.priceRange}>
              <Text style={styles.priceText}>₹{priceRange[0]} - ₹{priceRange[1]}</Text>
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenities.map((amenity) => (
                <TouchableOpacity
                  key={amenity.id}
                  style={[
                    styles.amenityChip,
                    selectedAmenities.includes(amenity.id) && styles.amenityChipSelected
                  ]}
                  onPress={() => toggleAmenity(amenity.id)}
                >
                  <Ionicons
                    name={amenity.icon as any}
                    size={20}
                    color={selectedAmenities.includes(amenity.id) ? '#6366f1' : '#6b7280'}
                  />
                  <Text style={[
                    styles.amenityText,
                    selectedAmenities.includes(amenity.id) && styles.amenityTextSelected
                  ]}>
                    {amenity.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options" size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {rooms?.length || 0} rooms found
        </Text>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={16} color="#6b7280" />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading rooms...</Text>
        </View>
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderRoomCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.roomsList}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FilterModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
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
  filterButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 14,
    color: '#6b7280',
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
  roomsList: {
    padding: 20,
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roomImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  roomInfo: {
    padding: 16,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  roomLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  roomFeatures: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
  },
  roomPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  roomPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  priceUnit: {
    fontSize: 14,
    color: '#6b7280',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  applyButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  priceRange: {
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  priceText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  amenityChipSelected: {
    backgroundColor: '#ede9fe',
    borderColor: '#6366f1',
  },
  amenityText: {
    fontSize: 14,
    color: '#6b7280',
  },
  amenityTextSelected: {
    color: '#6366f1',
  },
});