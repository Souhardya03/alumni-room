import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api', // Replace with your actual API URL
  prepareHeaders: async (headers) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['User', 'Room', 'Review', 'Booking'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<
      { token: string; user: any },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<
      { token: string; user: any },
      { name: string; email: string; password: string; department: string; graduationYear: number }
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query<any, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    
    // Room endpoints
    getRooms: builder.query<any[], { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 10, search = '' }) => 
        `/rooms?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ['Room'],
    }),
    getRoomById: builder.query<any, string>({
      query: (id) => `/rooms/${id}`,
      providesTags: ['Room'],
    }),
    
    // Review endpoints
    createReview: builder.mutation<
      any,
      { roomId: string; rating: number; content: string }
    >({
      query: (review) => ({
        url: '/reviews',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Review', 'Room'],
    }),
    
    // Booking endpoints
    createBooking: builder.mutation<
      any,
      { roomId: string; checkIn: string; checkOut: string; guests: number }
    >({
      query: (booking) => ({
        url: '/bookings',
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: ['Booking'],
    }),
    getUserBookings: builder.query<any[], void>({
      query: () => '/bookings/user',
      providesTags: ['Booking'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateReviewMutation,
  useCreateBookingMutation,
  useGetUserBookingsQuery,
} = baseApi;