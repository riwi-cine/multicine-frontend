import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useLocationStore } from '@/store'
import { locationApi } from '@/features/theaters/api/location.api'

export default function SelectLocationPage() {
  const navigate = useNavigate()
  const setLocation = useLocationStore((state) => state.setLocation)
  const [countryId, setCountryId] = useState('')
  const [cityId, setCityId] = useState('')
  const [cinemaId, setCinemaId] = useState('')

  const countriesQuery = useQuery({ queryKey: ['countries'], queryFn: locationApi.getCountries })
  const departmentsQuery = useQuery({
    queryKey: ['departments', countryId],
    queryFn: () => locationApi.getDepartments(countryId),
    enabled: Boolean(countryId),
  })
  const citiesQuery = useQuery({
    queryKey: ['cities'],
    queryFn: () => locationApi.getCities(),
    enabled: Boolean(countryId),
  })
  const cinemasQuery = useQuery({
    queryKey: ['cinemas', cityId],
    queryFn: () => locationApi.getCinemas(cityId),
    enabled: Boolean(cityId),
  })

  const departmentIds = useMemo(
    () => new Set((departmentsQuery.data ?? []).map((department) => department.id)),
    [departmentsQuery.data],
  )
  const cities = useMemo(
    () => (citiesQuery.data ?? []).filter((city) => departmentIds.has(city.departmentId)),
    [citiesQuery.data, departmentIds],
  )
  const selectedCountry = countriesQuery.data?.find((country) => country.id === countryId)
  const selectedCity = cities.find((city) => city.id === cityId)
  const selectedCinema = cinemasQuery.data?.find((cinema) => cinema.id === cinemaId)

  function handleSave() {
    if (!selectedCountry || !selectedCity || !selectedCinema) return
    setLocation({
      country: selectedCountry.name,
      city: selectedCity.name,
      venue: selectedCinema.name,
      countryId,
      cityId,
      cinemaId,
    })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="w-full max-w-lg rounded-lg bg-popover p-6 shadow">
        <img src="/public/images/logo-Photoroom.png" alt="Logo" className="mx-auto mb-2 h-50 w-auto" />
        <h1 className="mb-2 text-2xl font-semibold text-center">Selecciona tu ubicación</h1>
        <p className="mb-4 text-sm text-muted-foreground">Selecciona:  país, ciudad y sede.</p>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col">
            <span className="mb-1 text-sm">País</span>
            <select className="rounded-md border px-3 py-2 text-sm" value={countryId} onChange={(e) => { setCountryId(e.target.value); setCityId(''); setCinemaId('') }}>
              <option value="">Selecciona un país</option>
              {(countriesQuery.data ?? []).map((countryOption) => (
                <option key={countryOption.id} value={countryOption.id}>{countryOption.name}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-sm">Ciudad</span>
            <select className="rounded-md border px-3 py-2 text-sm" value={cityId} onChange={(e) => { setCityId(e.target.value); setCinemaId('') }} disabled={!countryId}>
              <option value="">Selecciona una ciudad</option>
              {cities.map((cityOption) => (
                <option key={cityOption.id} value={cityOption.id}>{cityOption.name}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-sm">Sede</span>
            <select className="rounded-md border px-3 py-2 text-sm" value={cinemaId} onChange={(e) => setCinemaId(e.target.value)} disabled={!cityId}>
              <option value="">Selecciona una sede</option>
              {(cinemasQuery.data ?? []).map((cinema) => (
                <option key={cinema.id} value={cinema.id}>{cinema.name}</option>
              ))}
            </select>
          </label>

          <div className="mt-4 flex justify-end gap-3">
            <button className="rounded-md px-4 py-2 text-sm" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-sm text-white disabled:opacity-50" onClick={handleSave} disabled={!selectedCountry || !selectedCity || !selectedCinema}>
              Guardar y continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
