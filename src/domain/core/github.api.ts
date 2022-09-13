import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUser, ServerResponse} from './models/models';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.github.com'}),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 20,
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
  }),
});

export const {useGetUsersQuery} = githubApi;
