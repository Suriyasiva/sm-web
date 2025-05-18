import React, { useState, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  Libraries,
} from '@react-google-maps/api';
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import PrimaryInput from './PrimaryInput';

const { VITE_GOOGLE_MAP_API_KEY } = import.meta.env;

interface MapLocationPickerProps {
  lat: number;
  lng: number;
  onLocationChange: ({ lat, lng }: { lat: number; lng: number }) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const libraries: Libraries = ['places'];

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  lat,
  lng,
  onLocationChange,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    lat && lng ? { lat, lng } : null,
  );
  const [zoom, setZoom] = useState<number>(18);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback(() => {
    setZoom(18);
  }, []);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const { lat, lng } = place.geometry.location;
      const newPosition = { lat: lat(), lng: lng() };
      onLocationChange(newPosition);
      setPosition(newPosition);
    }
  };

  const onMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      onLocationChange(newPosition);
      setPosition(newPosition);
    }
  };

  if (!isLoaded && !position) {
    return <Skeleton h='400px' />;
  }

  return (
    isLoaded &&
    position && (
      <Flex flexDir='column' gap={1}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <PrimaryInput placeholder='Search location here' />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={zoom}
          onLoad={onLoad}
          options={{ streetViewControl: false, mapTypeControl: false }}
        >
          <Marker
            position={position}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        </GoogleMap>
        <Text fontSize='sm'>
          Latitude: {position.lat} | Longitude: {position.lng}
        </Text>
      </Flex>
    )
  );
};

export default MapLocationPicker;
