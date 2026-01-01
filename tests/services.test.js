const pricingService = require('../src/services/pricingService');
const matchingService = require('../src/services/matchingService');

describe('TechCare Core Services', () => {
  describe('Pricing Service', () => {
    test('should calculate standard mobile repair price', () => {
      const price = pricingService.calculateEstimate('Mobile', 'Screen Replacement');
      expect(price).toBe(1500);
    });

    test('should calculate urgent repair with surcharge', () => {
      const price = pricingService.calculateEstimate('Mobile', 'Screen Replacement', true);
      expect(price).toBe(2250); // 1500 * 1.5
    });

    test('should calculate laptop repair price', () => {
      const price = pricingService.calculateEstimate('Laptop', 'Battery Replacement');
      expect(price).toBe(2500);
    });

    test('should calculate total cost with parts and labor', () => {
      const parts = [
        { name: 'Screen', quantity: 1, price: 1000 },
        { name: 'Battery', quantity: 1, price: 500 }
      ];
      const laborCost = 300;
      const total = pricingService.calculateTotalCost(parts, laborCost);
      expect(total).toBe(2100); // (1000 + 500) * 1.2 + 300
    });
  });

  describe('Matching Service', () => {
    test('should calculate response time correctly', () => {
      const distance = 5000; // 5 km in meters
      const responseTime = matchingService.calculateResponseTime(distance);
      // 5000 / 20000 * 60 + 15 = 30 minutes
      expect(responseTime).toBe(30);
    });

    test('should calculate response time for nearby location', () => {
      const distance = 1000; // 1 km in meters
      const responseTime = matchingService.calculateResponseTime(distance);
      // 1000 / 20000 * 60 + 15 = 18 minutes
      expect(responseTime).toBe(18);
    });
  });
});
