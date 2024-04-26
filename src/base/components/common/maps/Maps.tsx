/* eslint-disable @typescript-eslint/no-explicit-any */
// SimpleMap.tsx
import React from "react";
import GoogleMapReact from "google-map-react";
import { mapStyle } from "./core/style/data";
import { SimpleMapProps } from "./Maps.types";



const SimpleMap: React.FC<SimpleMapProps> = ({
  isRoute,
  location,
  waypoints,
  size,
  additionalMarkers,
}) => {
  const renderRoute = (map: any, maps: any) => {
    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer({
      suppressMarkers: true, // Suppress default markers
    });

    directionsRenderer.setMap(map);

    const waypointsFormatted = waypoints!.map((waypoint) => ({
      location: waypoint,
      stopover: true,
    }));

    const request = {
      origin: waypointsFormatted.shift()?.location,
      destination: waypointsFormatted.pop()?.location,
      waypoints: waypointsFormatted,
      travelMode: "DRIVING",
    };

    directionsService.route(request, function (result: any, status: any) {
      if (status === "OK") {
        directionsRenderer.setDirections(result);

        // Custom markers for origin, destination, and waypoints
        const leg = result.routes[0].legs[0];
        new maps.Marker({
          position: leg.start_location,
          map,
          icon: {
            url: "/media/maps/markers/start.svg",
            scaledSize: new maps.Size(30, 30),
          },
          title: "Start",
        });
        waypointsFormatted.forEach((waypoint) => {
          new maps.Marker({
            position: waypoint.location,
            map,
            icon: {
              url: "/media/maps/markers/default.svg",
              scaledSize: new maps.Size(30, 30),
            },
          });
        });
        new maps.Marker({
          position: leg.end_location,
          map,
          icon: {
            url: "/media/maps/markers/end.svg",
            scaledSize: new maps.Size(30, 30),
          },
          title: "End",
        });

        // Additional markers
        if (additionalMarkers && additionalMarkers.length > 0) {
          additionalMarkers.forEach((marker) => {
            new maps.Marker({
              position: marker.location,
              map,
              icon: {
                url: marker.icon.url,
                scaledSize: new maps.Size(marker.icon.scaledSize, marker.icon.scaledSize),
              },
              title: marker.title,
            });
          });
        }


      } else {
        console.error("Directions request failed due to " + status);
      }
    });
  };

  const renderLocation = (map: any, maps: any) => {
    new maps.Marker({
      position: location!,
      map,
      title: "Location",
    });
  };

  return (
    <div
      style={{ height: size?.height ?? "100vh", width: size?.width ?? "100%" }}
    >
      <GoogleMapReact
        options={{
          styles: mapStyle,
        }}
        bootstrapURLKeys={{ key: import.meta.env.VITE_APP_MAP_API_KEY }} // Google Maps API anahtarınızı buraya ekleyin
        defaultCenter={isRoute && waypoints ? waypoints[0] : location} // İstanbul'un koordinatlarını başlangıç noktası olarak belirleyin
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          if (isRoute && waypoints) {
            renderRoute(map, maps);
          } else if (!isRoute && location) {
            renderLocation(map, maps);
          }
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
