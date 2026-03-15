"use client";

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import LocationPickerMap from '../../../components/lost-found/LocationPickerMap';
import { geocodeLocation } from '@/hooks/useGeocode';

interface LostFoundDog {
  dogName: string;
  location: string;
  description: string;
  contact: string;
  type: 'lost' | 'found';
  lat?: number;
  lng?: number;
  status: string;
  image: string;
  createdAt: number;
}

export default function ReportDogForm() {
  const [dogName, setDogName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.076, 72.877]);

  const handleMapPosition = useCallback((position: { lat: number; lng: number }) => {
    console.log('Map position set:', position);
    setLat(position.lat);
    setLng(position.lng);
    setLocation(position.lat.toFixed(4) + ', ' + position.lng.toFixed(4));
  }, []);

  const geocodeAndUpdateMap = useCallback(async (query: string) => {
    if (query.length < 2) {
      setGeocoding(false);
      return;
    }

    setGeocoding(true);
    const result = await geocodeLocation(query);
    
    if (result) {
      setLat(result.lat);
      setLng(result.lon);
      setLocation(result.display_name);
      setMapCenter([result.lat, result.lon]);
    } else {
      setError('Location not found. Please try another name or click on map.');
    }
    
    setGeocoding(false);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      geocodeAndUpdateMap(location);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [location, geocodeAndUpdateMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'lost-found'), {
        dogName,
        location,
        description,
        contact,
        type,
        lat,
        lng,
        status: 'active',
        image: `https://placehold.co/600x400/orange/white?text=${encodeURIComponent(dogName || 'Dog')}`,
        createdAt: Date.now()
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto'>
      {success && (
        <div className='mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 text-center font-medium'>
          ✅ Report submitted successfully! It will appear in the list shortly.
        </div>
      )}
      {error && (
        <div className='mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 font-medium'>
          ❌ {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            📍 Pick Location on Map (click/tap to select) or type city/area name
          </label>
          <LocationPickerMap setPosition={handleMapPosition} center={mapCenter} />
        </div>

        {lat && lng && (
          <div className='bg-blue-50 p-4 rounded-xl border border-blue-200'>
            <p className='text-sm font-medium text-blue-800'>
              📍 Location set: {location}
            </p>
          </div>
        )}

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Location Name * 
            <span className='text-xs text-gray-500 ml-1'>
              {geocoding ? '🔍 Searching...' : '(Type city like "Nashik" or edit coords)'}
            </span>
          </label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            placeholder='Nashik, Mumbai, Pune...'
            required
            disabled={geocoding}
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Dog Name *
          </label>
          <input
            type='text'
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            placeholder='e.g., Buddy'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Description *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical'
            placeholder='Breed, color, size, distinctive features...'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Contact Phone/Email *
          </label>
          <input
            type='text'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            placeholder='Phone or email'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'lost' | 'found')}
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            disabled={loading}
          >
            <option value='lost'>Lost Dog</option>
            <option value='found'>Found Dog</option>
          </select>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2'
        >
          {loading ? (
            <>
              <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' strokeLinecap='round' strokeLinejoin='round' />
                <path fill='none' opacity='0.5' d='M12 2.8v4.4' stroke='currentColor' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            'Submit Report'
          )}
        </button>
      </form>
    </div>
  );
}
