"use client"

import React, { useMemo, useState } from 'react'
import { LOCATIONS, COUNTRIES } from '../data/locations'
import { useNavigate } from 'react-router-dom'

export default function SelectLocationPage() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [venue, setVenue] = useState('')

  const cities = useMemo(() => (country ? Object.keys(LOCATIONS[country] || {}) : []), [country])
  const venues = useMemo(() => (country && city ? LOCATIONS[country]?.[city] || [] : []), [country, city])

  function handleSave() {
    const payload = { country, city, venue }
    localStorage.setItem('selectedLocation', JSON.stringify(payload))
    localStorage.setItem('locationSelected', '1')
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
            <select className="rounded-md border px-3 py-2 text-sm" value={country} onChange={(e) => { setCountry(e.target.value); setCity(''); setVenue('') }}>
              <option value="">Selecciona un país</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-sm">Ciudad</span>
            <select className="rounded-md border px-3 py-2 text-sm" value={city} onChange={(e) => { setCity(e.target.value); setVenue('') }} disabled={!country}>
              <option value="">Selecciona una ciudad</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-sm">Sede</span>
            <select className="rounded-md border px-3 py-2 text-sm" value={venue} onChange={(e) => setVenue(e.target.value)} disabled={!city}>
              <option value="">Selecciona una sede</option>
              {venues.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>

          <div className="mt-4 flex justify-end gap-3">
            <button className="rounded-md px-4 py-2 text-sm" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-sm text-white disabled:opacity-50" onClick={handleSave} disabled={!country || !city || !venue}>
              Guardar y continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
