import { LngLat, SearchCustomerRouteRes } from '@/types'

export function haversineDistance(coord1: LngLat, coord2: LngLat) {
  const toRad = (deg: number) => (deg * Math.PI) / 180

  const R = 6371 // Earth's radius in km
  const lat1 = toRad(coord1.latitude)
  const lon1 = toRad(coord1.longitude)
  const lat2 = toRad(coord2.latitude)
  const lon2 = toRad(coord2.longitude)

  const dLat = lat2 - lat1
  const dLon = lon2 - lon1

  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in km
}

export function findNearestCoordinate(target: LngLat, coordinates: SearchCustomerRouteRes[]) {
  return coordinates.reduce(
    (nearest, coord) => {
      const distance = haversineDistance(target, {
        latitude: Number(coord.latitude),
        longitude: Number(coord.longitude),
      })
      return distance < nearest.distance ? { coord, distance } : nearest
    },
    { coord: null, distance: Infinity }
  ).coord
}

export function getDistanceByCoordinate(location1: LngLat, location2: LngLat): number | null {
  if (!location1?.latitude || !location1?.longitude || !location2?.latitude || !location2?.longitude) {
    return null
  }

  const R = 6371 // Radius of the Earth in kilometers
  const toRad = (angle: number) => (angle * Math.PI) / 180 // Convert degrees to radians

  const dLat = toRad(location2.latitude - location1.latitude)
  const dLon = toRad(location2.longitude - location1.longitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(location1.latitude)) * Math.cos(toRad(location2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c * 1000
}
