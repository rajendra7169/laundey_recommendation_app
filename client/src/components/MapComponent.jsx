import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = ({ userLocation, shopLocation }) => {
  const mapRef = useRef(null); // Use a ref to store the map instance

  useEffect(() => {
    // Check if the map is already initialized to prevent re-initializing
    if (mapRef.current !== null) {
      return; // Do nothing if the map is already initialized
    }

    // Initialize the map
    const map = L.map("map").setView(userLocation, 13);
    mapRef.current = map; // Store the map instance in the ref

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for user and shop locations
    const userMarker = L.marker(userLocation, { icon: markerIcon }).addTo(map);
    userMarker.bindPopup("Your Location").openPopup();

    const shopMarker = L.marker(shopLocation, { icon: markerIcon }).addTo(map);
    shopMarker.bindPopup("Shop Location");

    // Add routing control for the path
    L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(shopLocation[0], shopLocation[1]),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      show: false, // Hide the input boxes
    }).addTo(map);

    // Cleanup the map on unmount
    return () => {
      if (mapRef.current !== null) {
        mapRef.current.remove(); // Properly remove the map instance
        mapRef.current = null;
      }
    };
  }, [userLocation, shopLocation]); // Re-run the effect only if user or shop locations change

  return <div id="map" style={{ height: "300px", width: "100%" }}></div>;
};

export default MapComponent;
