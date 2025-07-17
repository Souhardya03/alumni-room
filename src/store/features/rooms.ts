import { get, METHODS } from "http";
import { baseApi } from "../baseApi";

interface IListing {
	error: boolean;
	message: string;
	success: boolean;
	data: [
		{
			bookings: [];
			description: string;
			id: number;
			images: [
				{
					id: number;
					url: string;
				}
			];
			reviews: [];
			title: string;
			type: string;
			user: {
				id: number;
				name: string;
				email: string;
			};
			doubleOccupancy: number;
			singleOccupancy: number;
		}
	];
}

interface IListingById {
	error: boolean;
	message: string;
	success: boolean;
	data: {
		bookings: [];
		description: string;
		id: number;
		images: [
			{
				id: number;
				url: string;
			}
		];
		reviews: [];
		title: string;
		type: string;
		user: {
			id: number;
			name: string;
			email: string;
		};
		doubleOccupancy: number;
		singleOccupancy: number;
	};
}

interface IResponse {
	error: boolean;
	message: string;
	success: boolean;
}

export const listingApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [
			"Listing",
			"getListingbyID",
			"check-availality",
			"create-booking",
			"delete-booking",
		],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			getListings: builder.query<IListing, { search?: string }>({
				query: ({ search = "" }) => ({
					url: "/rooms",
					method: "GET",
					credentials: "include",
				}),
				providesTags: ["Listing"],
			}),
			getListingById: builder.query<IListingById, { id: string }>({
				query: ({ id }) => ({
					url: `/rooms/${id}`,
					method: "GET",
					credentials: "include",
				}),
				providesTags: ["getListingbyID"],
			}),

			checkAvailability: builder.mutation<
				IResponse,
				{ id: string; startDate: string; endDate: string }
			>({
				query: ({ id, startDate, endDate }) => ({
					url: `/bookings/check-availability/${id}`,
					method: "POST",
					body: { startDate, endDate },
					credentials: "include",
				}),
				invalidatesTags: ["check-availality"],
			}),
			createBooking: builder.mutation<IResponse, { id: string; data: any }>({
				query: ({ id, data }) => ({
					url: `/bookings/create/${id}`,
					method: "POST",
					body: data,
					credentials: "include",
				}),
				invalidatesTags: ["create-booking"],
			}),
			deleteBooking: builder.mutation<IResponse, string>({
				query: (id) => ({
					url: `/bookings/delete/${id}`,
					method: "DELETE",
					credentials: "include",
				}),
				invalidatesTags: ["delete-booking"],
			}),
		}),
	});
export const {
	useGetListingsQuery,
	useGetListingByIdQuery,
	useCheckAvailabilityMutation,
	useCreateBookingMutation,
	useDeleteBookingMutation,
} = listingApi;
