import random
import json


def generate_bike_coordinates():
    min_lat, max_lat = 40.83, 40.87  # Limiti approssimativi della latitudine della provincia di Napoli
    min_long, max_long = 14.195, 14.36737  # Limiti approssimativi della longitudine della provincia di Napoli

    new_data = []
    for i in range(100):
        new_entry = {
            "id": i + 1,
            "lastLat": round(random.uniform(min_lat, max_lat), 6),
            "lastLong": round(random.uniform(min_long, max_long), 6),
            # Altri campi dati casuali
            "battery": round(random.uniform(0.1, 1.0), 2),
            "isCharging": random.choice([True, False]),
            "isMoving": random.choice([True, False]),
            "isVisible": random.choice([True, False]),
            "isReserved": random.choice([True, False]),
            "isLocked": random.choice([True, False]),
            "attentionNeeded": random.choice([True, False])
        }
        new_data.append(new_entry)

    return new_data


coordinates_data = generate_bike_coordinates()
with open('biciclette.json', 'w') as outfile:
    json.dump(coordinates_data, outfile)

for entry in coordinates_data:
    print(entry)
