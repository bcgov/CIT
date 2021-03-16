import { useMap } from "react-leaflet";

export default function ChangeView({ center, zoom }) {
  if (center[0] !== 54.1722) {
    const map = useMap();
    map.setView(center, zoom);
  }
  return null;
}
