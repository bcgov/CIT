from pipeline.models import (
    LocationDistance,
)


def generate_line_strings():
    line_strings = {"type": "FeatureCollection", "features": []}

    _map = {}
    for location_distance in LocationDistance.objects.select_related('community', 'hospital'):
        if location_distance.community.id not in _map:
            _map[location_distance.community.id] = location_distance
        if location_distance.distance < _map[location_distance.community.id].distance:
            _map[location_distance.community.id] = location_distance

    for k, location_distance in _map.items():
        line_strings["features"].append(
            {
                "type": "Feature",
                "properties": {"distance": float(location_distance.distance)},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [location_distance.community.longitude(), location_distance.community.latitude()],
                        [location_distance.location.longitude(), location_distance.location.latitude()],
                    ],
                },
            }
        )

    return line_strings
