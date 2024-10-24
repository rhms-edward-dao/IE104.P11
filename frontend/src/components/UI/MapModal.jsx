import React from "react";
import { useModal } from "../../contexts/ModalState";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapModal = () => {
  const { show, closeModal, lng, lat } = useModal();

  const blueMarkerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <>
      {show && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
        >
          <div className="relative p-4 w-full max-w-4xl max-h-4xl bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Bản đồ</h1>
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div>
              <MapContainer
                center={[lat, lng]}
                zoom={17}
                scrollWheelZoom={true}
                style={{ height: "750px", width: "full" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  // url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=8KQfWi9cZRTUxL6bxBmb"
                  url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=8KQfWi9cZRTUxL6bxBmb"
                />
                {lng && lat && (
                  <Marker position={[lat, lng]} icon={blueMarkerIcon}>
                    <Popup>
                      <p className="text-lg">Ở đây</p>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapModal;
