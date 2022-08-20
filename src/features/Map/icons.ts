import L from 'leaflet';

import icon from 'src/assets/marker-icon--yellow.png';
import shadow from 'src/assets/marker-shadow.png';

export const mapIcon = L.icon({
  iconUrl: icon,
  shadowUrl: shadow,
});
