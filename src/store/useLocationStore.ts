import { create } from 'zustand'
import type { LocationSelection } from '@/types/location'

const LOCATION_STORAGE_KEY = 'selectedLocation'

interface LocationStoreState {
  location: LocationSelection | null
  setLocation: (location: LocationSelection) => void
  clearLocation: () => void
}

const readStoredLocation = (): LocationSelection | null => {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(LOCATION_STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored) as Partial<LocationSelection>
    if (!parsed.country || !parsed.city || !parsed.venue) return null

    return {
      country: parsed.country,
      city: parsed.city,
      venue: parsed.venue,
      countryId: parsed.countryId,
      cityId: parsed.cityId,
      cinemaId: parsed.cinemaId,
    }
  } catch {
    return null
  }
}

export const useLocationStore = create<LocationStoreState>((set) => ({
  location: readStoredLocation(),

  setLocation: (location) => {
    window.localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location))
    set({ location })
  },

  clearLocation: () => {
    window.localStorage.removeItem(LOCATION_STORAGE_KEY)
    set({ location: null })
  },
}))