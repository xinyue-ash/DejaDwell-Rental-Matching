import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import React, { useState, useRef, useEffect } from 'react'
import './Map.css'

// Define the location coordinates
const vancouver = {
  lat: 49.246292,
  lng: -123.116226,
}

const libraries = ['places']

function Map({ propertyAddresses }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBLFCLKvngrnl7PBEZczkzLJbObWvJDScM',
  })

  const [markers, setMarkers] = useState([])
  const mapRef = useRef()

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      markers.forEach((marker) => {
        new window.google.maps.Marker({
          map: mapRef.current,
          position: marker,
          title: 'Marker',
        })
      })
    }
  }, [markers])

  const onLoad = async (mapInstance) => {
    mapRef.current = mapInstance

    const geocoder = new window.google.maps.Geocoder()

    propertyAddresses.forEach((propertyAddress) => {
        console.log(propertyAddress)
      var { street, city, province } = propertyAddress
      if (!street) {
        street = ''
      }
      if (!city) {
        city = ''
      }
      if (!province) {
        province = ''
      }
      const address = `${street},  ${city}, ${province}`

      geocoder.geocode({ address: address }, (results, status) => {
        console.log("address" + address)
        if (status === 'OK') {
          const position = results[0].geometry.location
          const newMarker = { lat: position.lat(), lng: position.lng() }
          setMarkers((prevMarkers) => [...prevMarkers, newMarker])
        } else {
          console.log(
            'Geocode was not successful for the following reason: ' + status
          )
        }
      })
    })
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="map-container"
      center={vancouver}
      zoom={10}
      onLoad={onLoad}
      options={{
        mapId: 'id',
      }}
    >
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map
