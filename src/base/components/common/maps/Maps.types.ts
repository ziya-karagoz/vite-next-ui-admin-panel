export interface Waypoint {
    lat: number;
    lng: number;
  }
  
export interface SimpleMapProps {
    isRoute: boolean; // true ise waypointlere göre rota ekler. false ise location bilgisindeki konuma tek bir marker işareti ekler.
    location?: Waypoint;
    waypoints?: Waypoint[];
    size?: { width: string; height: string };
    additionalMarkers?: {
      location?: Waypoint;
      icon: {
        url: string;
        scaledSize: number;
      };
      title?: string;
    }[];
  }