const { getDistance } = require('geolib');
const Technician = require('../models/Technician');

class MatchingService {
  /**
   * Find the nearest available technician based on GPS location
   * Target response time: < 2 hours
   * @param {Object} location - Customer location {coordinates: [longitude, latitude]}
   * @param {String} deviceType - Type of device (Mobile, Laptop, Appliances)
   * @param {Number} maxDistance - Maximum distance in meters (default: 10km)
   * @returns {Promise<Object>} Matched technician
   */
  async findNearestTechnician(location, deviceType, maxDistance = 10000) {
    try {
      // Find available technicians with matching specialization
      const technicians = await Technician.find({
        isAvailable: true,
        isVerified: true,
        specializations: deviceType
      });

      if (technicians.length === 0) {
        throw new Error('No available technicians found for this device type');
      }

      // Calculate distances and sort by proximity
      const techniciansWithDistance = technicians.map(tech => {
        const distance = getDistance(
          {
            latitude: location.coordinates[1],
            longitude: location.coordinates[0]
          },
          {
            latitude: tech.location.coordinates[1],
            longitude: tech.location.coordinates[0]
          }
        );

        return {
          technician: tech,
          distance: distance,
          estimatedResponseTime: this.calculateResponseTime(distance)
        };
      });

      // Filter by max distance and sort by distance, then rating
      const nearbyTechnicians = techniciansWithDistance
        .filter(t => t.distance <= maxDistance)
        .sort((a, b) => {
          // Prioritize distance, then rating
          if (a.distance !== b.distance) {
            return a.distance - b.distance;
          }
          return b.technician.rating - a.technician.rating;
        });

      if (nearbyTechnicians.length === 0) {
        throw new Error('No technicians available within the service area');
      }

      return nearbyTechnicians[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Calculate estimated response time based on distance
   * Target: < 2 hours
   * @param {Number} distance - Distance in meters
   * @returns {Number} Estimated response time in minutes
   */
  calculateResponseTime(distance) {
    // Assuming average speed of 20 km/h in urban areas
    const averageSpeed = 20000; // meters per hour
    const travelTime = (distance / averageSpeed) * 60; // in minutes
    const preparationTime = 15; // minutes for technician to prepare
    
    return Math.ceil(travelTime + preparationTime);
  }

  /**
   * Track live technician location
   * @param {String} technicianId - Technician ID
   * @param {Object} currentLocation - Current location {coordinates: [longitude, latitude]}
   * @param {Object} destinationLocation - Destination location
   * @returns {Promise<Object>} Tracking information
   */
  async trackTechnician(technicianId, currentLocation, destinationLocation) {
    try {
      const distance = getDistance(
        {
          latitude: currentLocation.coordinates[1],
          longitude: currentLocation.coordinates[0]
        },
        {
          latitude: destinationLocation.coordinates[1],
          longitude: destinationLocation.coordinates[0]
        }
      );

      const eta = this.calculateResponseTime(distance);

      return {
        technicianId,
        currentLocation,
        destinationLocation,
        distanceRemaining: distance,
        eta: eta,
        lastUpdated: new Date()
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MatchingService();
