import time
import threading
from flask import Flask, jsonify, request

app = Flask(__name__)

# Simulated drone data
drones = [
    {"id": "Drone-001", "frequency": "2.4 GHz", "location": "Sector A", "owner": "Alice", "status": "active"},
    {"id": "Drone-002", "frequency": "5.8 GHz", "location": "Sector B", "owner": "Bob", "status": "active"},
    {"id": "Drone-003", "frequency": "2.4 GHz", "location": "Sector C", "owner": "Charlie", "status": "active"},
]

# Lock for thread-safe operations
drones_lock = threading.Lock()

@app.route('/drones', methods=['GET'])
def get_drones():
    with drones_lock:
        return jsonify(drones)

@app.route('/drones/<drone_id>/disconnect', methods=['POST'])
def disconnect_drone(drone_id):
    with drones_lock:
        for drone in drones:
            if drone['id'] == drone_id:
                drone['status'] = 'disconnected'
                return jsonify({"message": f"{drone_id} disconnected successfully."})
        return jsonify({"error": "Drone not found."}), 404

@app.route('/drones/<drone_id>/control', methods=['POST'])
def control_drone(drone_id):
    with drones_lock:
        for drone in drones:
            if drone['id'] == drone_id:
                # Simulate control command
                return jsonify({"message": f"Control command sent to {drone_id}."})
        return jsonify({"error": "Drone not found."}), 404

def run_flask():
    app.run(host='0.0.0.0', port=5001)

if __name__ == '__main__':
    run_flask()
