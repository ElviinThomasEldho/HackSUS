function extractLocationCoordinates(data) {
    try {
        if (data.status === 'OK' && data.results.length > 0) {
            const geometry = data.results[0].geometry;
            
            if (geometry && geometry.location) {
                const { lat, lng } = geometry.location;
                return { latitude: lat, longitude: lng };
            } else {
                throw new Error('Geometry location not found in the response.');
            }
        } else {
            throw new Error(`Error: ${data.status}`);
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        return null;
    }
}

const jsonData = {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "X9V5+96P",
                    "short_name": "X9V5+96P",
                    "types": [
                        "plus_code"
                    ]
                },
                {
                    "long_name": "Rajagiri Valley Road",
                    "short_name": "Rajagiri Valley Rd",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Rajagiri Valley",
                    "short_name": "Rajagiri Valley",
                    "types": [
                        "neighborhood",
                        "political"
                    ]
                },
                {
                    "long_name": "Kakkanad",
                    "short_name": "Kakkanad",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Ernakulam",
                    "short_name": "Ernakulam",
                    "types": [
                        "administrative_area_level_3",
                        "political"
                    ]
                },
                {
                    "long_name": "Kerala",
                    "short_name": "KL",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "India",
                    "short_name": "IN",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "682039",
                    "short_name": "682039",
                    "types": [
                        "postal_code"
                    ]
                }
            ],
            "formatted_address": "X9V5+96P, Rajagiri Valley Rd, Rajagiri Valley, Kakkanad, Kerala 682039, India",
            "geometry": {
                "location": {
                    "lat": 9.9934604,
                    "lng": 76.35809089999999
                },
                "location_type": "GEOMETRIC_CENTER",
                "viewport": {
                    "northeast": {
                        "lat": 9.995146180291501,
                        "lng": 76.3590627302915
                    },
                    "southwest": {
                        "lat": 9.992448219708496,
                        "lng": 76.35636476970849
                    }
                }
            },
            "partial_match": true,
            "place_id": "ChIJ9-CKuaYMCDsRdHdhQLuGF8g",
            "types": [
                "establishment",
                "point_of_interest",
                "university"
            ]
        }
    ],
    "status": "OK"
}

const locationCoordinates = extractLocationCoordinates(jsonData);
console.log(locationCoordinates.latitude,locationCoordinates.longitude)