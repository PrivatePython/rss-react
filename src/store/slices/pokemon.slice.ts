import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchPokemonData,
  fetchPokemonDataList,
  fetchPokemonResponseData,
  type IPokemonData,
} from '../../services/pokemon.service';

interface PokemonState {
  itemsList: IPokemonData[];
  isLoading: boolean;
  error: string | null;
  totalPageCount: number;
  currentPage: number;
  limit: number;
}

const initialState: PokemonState = {
  itemsList: [],
  isLoading: false,
  error: null,
  totalPageCount: 0,
  currentPage: 1,
  limit: 20,
};

export const loadPokemonListForPage = createAsyncThunk<
  {
    items: IPokemonData[];
    totalPageCount: number;
    page: number;
  },
  number,
  {
    state: { pokemon: PokemonState };
    rejectValue: string;
  }
>('pokemon/loadPokemonPage', async (page: number, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const { limit } = state.pokemon;
    const offset = page * limit;
    const response = await fetchPokemonResponseData(limit, offset);
    const items = await fetchPokemonDataList(response.results);
    const totalPageCount = Math.floor(response.count / limit);

    if (page < 1 || page > totalPageCount) {
      return rejectWithValue('Invalid page');
    }

    return {
      items,
      totalPageCount,
      page,
    };
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const searchPokemonByName = createAsyncThunk(
  'pokemon/searchPokemonByName',
  async (name: string, { rejectWithValue }) => {
    try {
      return await fetchPokemonData({
        name,
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
      });
    } catch {
      return rejectWithValue('Pokemon Not Found!');
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPokemonListForPage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadPokemonListForPage.fulfilled, (state, action) => {
        state.itemsList = action.payload.items;
        state.totalPageCount = action.payload.totalPageCount;
        state.currentPage = action.payload.page;
        state.isLoading = false;
      })
      .addCase(loadPokemonListForPage.rejected, (state, action) => {
        state.error = 'Error with load pokemon: ' + (action.payload as string);
        state.isLoading = false;
      })

      .addCase(searchPokemonByName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPokemonByName.fulfilled, (state, action: PayloadAction<IPokemonData>) => {
        state.itemsList = [action.payload];
        state.totalPageCount = 0;
        state.isLoading = false;
      })
      .addCase(searchPokemonByName.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export default pokemonSlice.reducer;
