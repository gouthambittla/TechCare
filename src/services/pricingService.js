const ServiceRequest = require('../models/ServiceRequest');
const JobCard = require('../models/JobCard');

class PricingService {
  /**
   * Get standardized pricing for device repairs
   * Ensures transparency and trust
   */
  constructor() {
    this.basePrices = {
      Mobile: {
        'Screen Replacement': 1500,
        'Battery Replacement': 800,
        'Charging Port Repair': 500,
        'Water Damage': 2000,
        'Software Issues': 300,
        'General Diagnosis': 200
      },
      Laptop: {
        'Screen Replacement': 3500,
        'Battery Replacement': 2500,
        'Keyboard Replacement': 1500,
        'Hard Drive Replacement': 2000,
        'RAM Upgrade': 1000,
        'Software Installation': 500,
        'General Diagnosis': 300
      },
      Appliances: {
        'Washing Machine Repair': 1500,
        'Refrigerator Repair': 2000,
        'AC Service': 800,
        'Microwave Repair': 1000,
        'General Diagnosis': 400
      }
    };

    this.partsMarkup = 1.2; // 20% markup on parts
    this.urgentSurcharge = 1.5; // 50% surcharge for urgent repairs
  }

  /**
   * Calculate estimated price for a service request
   * @param {String} deviceType - Type of device
   * @param {String} serviceType - Type of service/repair
   * @param {Boolean} isUrgent - Whether it's an urgent request
   * @returns {Number} Estimated price
   */
  calculateEstimate(deviceType, serviceType = 'General Diagnosis', isUrgent = false) {
    const basePrice = this.basePrices[deviceType]?.[serviceType] || 
                     this.basePrices[deviceType]?.['General Diagnosis'] || 
                     500;

    const finalPrice = isUrgent ? basePrice * this.urgentSurcharge : basePrice;

    return Math.round(finalPrice);
  }

  /**
   * Calculate total cost including parts and labor
   * @param {Array} parts - Array of parts used
   * @param {Number} laborCost - Labor cost
   * @returns {Number} Total cost
   */
  calculateTotalCost(parts = [], laborCost = 0) {
    const partsCost = parts.reduce((total, part) => {
      return total + (part.price * part.quantity * this.partsMarkup);
    }, 0);

    return Math.round(partsCost + laborCost);
  }

  /**
   * Get price breakdown for transparency
   * @param {String} jobCardId - Job card ID
   * @returns {Promise<Object>} Price breakdown
   */
  async getPriceBreakdown(jobCardId) {
    try {
      const jobCard = await JobCard.findById(jobCardId);
      
      if (!jobCard) {
        throw new Error('Job card not found');
      }

      const partsCost = jobCard.partsUsed.reduce((total, part) => {
        return total + (part.price * part.quantity);
      }, 0);

      const partsMarkupAmount = partsCost * (this.partsMarkup - 1);

      return {
        laborCost: jobCard.laborCost,
        partsCost: partsCost,
        partsMarkup: partsMarkupAmount,
        totalCost: jobCard.totalCost,
        breakdown: jobCard.partsUsed.map(part => ({
          name: part.name,
          quantity: part.quantity,
          unitPrice: part.price,
          totalPrice: part.price * part.quantity
        }))
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PricingService();
