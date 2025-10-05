import Geolocation from 'react-native-geolocation-service';

export async function getCurrentCoords(): Promise<{lat: number; lon: number}> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => resolve({lat: pos.coords.latitude, lon: pos.coords.longitude}),
      err => reject(err),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
    );
  });
}
