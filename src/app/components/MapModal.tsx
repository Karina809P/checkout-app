'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCenter: [number, number];
  onConfirm: (coords: [number, number]) => void;
}

// Кастомна іконка з публічної папки /images/location.svg
const locationIcon = new L.Icon({
  iconUrl: '/images/location.svg',
  iconRetinaUrl: '/images/location.svg',
  iconSize: [32, 32],      // підлаштуй розмір під свій SVG
  iconAnchor: [16, 32],    // точка "прив’язки" іконки до координат (нижній центр)
  popupAnchor: [0, -32],
 
});

function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} icon={locationIcon} /> : null;
}

export default function MapModal({
  isOpen,
  onClose,
  initialCenter,
  onConfirm,
}: MapModalProps) {
  const [selectedPos, setSelectedPos] = useState<[number, number]>(initialCenter);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '700px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <MapContainer
          center={initialCenter}
          zoom={4}
          style={{ flexGrow: 1 }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          />
          <LocationMarker position={selectedPos} setPosition={setSelectedPos} />
        </MapContainer>

        <div
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button onClick={onClose} style={{ padding: '8px 16px' }}>
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedPos)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
