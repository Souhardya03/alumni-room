import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../src/store';
import { toggleFavorite } from '../../src/store/slices/roomsSlice';
import { useGetRoomsQuery } from '../../src/store/baseApi';

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.rooms.favorites);
  const { data: allRooms } = useGetRoomsQuery({ page: 1, limit: 100 });

  // Filter rooms to show only favorites
  const favoriteRooms = allRooms?.filter(room => 
    favorites.includes(room.id.toString())
  ) || [];

  const handleFavoriteToggle = (roomId: string) => {
    dispatch(toggleFavorite(roomId));
  };

  const renderFavoriteRoom = ({ item }: { item: any }) => (
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
          name="heart"
          size={24}
          color="#ef4444"
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

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="heart-outline" size={64} color="#d1d5db" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyDescription}>
        Start exploring and add rooms to your favorites to see them here.
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => router.push('/search')}
      >
        <Text style={styles.exploreButtonText}>Explore Rooms</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteRooms.length} {favoriteRooms.length === 1 ? 'room' : 'rooms'} saved
        </Text>
      </View>

      {favoriteRooms.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={favoriteRooms}
          renderItem={renderFavoriteRoom}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.roomsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});