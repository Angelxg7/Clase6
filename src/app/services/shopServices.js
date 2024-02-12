import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../../firebase/database'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes:["image","location","order","name"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}.json`,
    }),
    getCategories: builder.query({
        query: () => `categories.json`,
      }),
    postOrders: builder.mutation({
        query: ({localId, order}) => ({
          url:`orders/${localId}.json`,
          method:"POST",
          body:order
        }),
        invalidatesTags:["order"]
      }),
    getOrders: builder.query({
        query: (localId) => `orders/${localId}.json`,
        transformResponse:(response) => {
        if (!response) return []
        const data = Object.keys(response).map(key => ({id:key,...response[key]}))
        return data
      },
      providesTags:["order"]
    }),
    postProfileImage: builder.mutation({
        query: ({localId,image}) => ({
          url:`profileImage/${localId}.json`,
          method:"PUT",
          body:{image}
        }),
        invalidatesTags:["image"]
      }),
    getProfileImage: builder.query({
        query: (localId) => `profileImage/${localId}.json`,
        providesTags:["image"]
      }),
    postUserLocation: builder.mutation({
        query: ({localId,locationFormatted}) => ({
          url:`userLocation/${localId}.json`,
          method:"PUT",
          body:locationFormatted
        }),
        invalidatesTags:["location"]
      }),
    getUserLocation: builder.query({
        query: (localId) => `userLocation/${localId}.json`,
        providesTags:["location"]
      }),
  }),
})

export const { useGetProductsQuery, 
               useGetProductQuery, 
               useGetCategoriesQuery, 
               usePostOrdersMutation, 
               usePostProfileImageMutation, 
               useGetProfileImageQuery,
               usePostUserLocationMutation,
               useGetUserLocationQuery,
               useGetOrdersQuery
              } = shopApi