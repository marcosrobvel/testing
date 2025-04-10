const { Room, Booking } = require('./index');

describe('Tests', () => {
  describe('isOccupied() method', () => {
    test('Devuelve true si la habitación está ocupada en la fecha', () => {
      const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
      const testBooking = new Booking("John Doe", "john@example.com", today, tomorrow, 10, null);
      const testRoom = new Room("Deluxe Suite", 10000, 5, [testBooking]);
      testBooking.room = testRoom;
      expect(testRoom.isOccupied(today)).toBe(true);
    });

    test('Devuelve false si la habitación no está ocupada en la fecha', () => {
      const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1); const pastDate = new Date(2020, 0, 1);
      const testBooking = new Booking("John Doe", "john@example.com", today, tomorrow, 10, null);
      const testRoom = new Room("Deluxe Suite", 10000, 5, [testBooking]);
      testBooking.room = testRoom;
      expect(testRoom.isOccupied(pastDate)).toBe(false);
    });
  });

  describe('occupancyPercentage() method', () => {
    test('Calcula correctamente el porcentaje de ocupación', () => {
      const today = new Date(); const yesterday = new Date(); yesterday.setDate(today.getDate() - 1); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
      const testBooking = new Booking("John Doe", "john@example.com", today, tomorrow, 10, null);
      const testRoom = new Room("Deluxe Suite", 10000, 5, [testBooking]);
      testBooking.room = testRoom;
      expect(testRoom.occupancyPercentage(yesterday, tomorrow)).toBe(50);
    });
  });

  describe('static totalOccupancyPercentage()', () => {
    test('Calcula la ocupación total en varias habitaciones', () => {
      const today = new Date(); const yesterday = new Date(); yesterday.setDate(today.getDate() - 1); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
      const testBooking1 = new Booking("John Doe", "john@example.com", today, tomorrow, 10, null);
      const testRoom1 = new Room("Deluxe Suite", 10000, 5, [testBooking1]); testBooking1.room = testRoom1;
      const testBooking2 = new Booking("Jane Doe", "jane@example.com", yesterday, today, 5, null);
      const testRoom2 = new Room("Suite", 20000, 10, [testBooking2]); testBooking2.room = testRoom2;
      expect(Room.totalOccupancyPercentage([testRoom1, testRoom2], yesterday, tomorrow)).toBe(50);
    });
  });

  describe('static availableRooms()', () => {
    test('Devuelve solo habitaciones disponibles', () => {
      const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1); const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
      const testBooking1 = new Booking("John Doe", "john@example.com", today, tomorrow, 10, null);
      const testRoom1 = new Room("Deluxe Suite", 10000, 5, [testBooking1]); testBooking1.room = testRoom1;
      const testBooking2 = new Booking("Jane Doe", "jane@example.com", yesterday, today, 5, null);
      const testRoom2 = new Room("Suite", 20000, 10, [testBooking2]); testBooking2.room = testRoom2;
      const available = Room.availableRooms([testRoom1, testRoom2], today, tomorrow);
      expect(available.length).toBe(1);
    });

    test('Devuelve habitación disponible con el precio correcto', () => {
      const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1); const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
      const testBooking1 = new Booking("John Doe", "john@example.com", today, tomorrow, 10, null);
      const testRoom1 = new Room("Deluxe Suite", 10000, 5, [testBooking1]); testBooking1.room = testRoom1;
      const testBooking2 = new Booking("Jane Doe", "jane@example.com", yesterday, today, 5, null);
      const testRoom2 = new Room("Suite", 20000, 10, [testBooking2]); testBooking2.room = testRoom2;
      const available = Room.availableRooms([testRoom1, testRoom2], today, tomorrow);
      expect(available[0].rate).toBe(20000);
    });
  });

  describe('getFee() method', () => {
    test('Calcula correctamente la tarifa con descuentos', () => {
      const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
      const testRoom = new Room("Deluxe Suite", 10000, 10, []);
      const testBooking = new Booking("John Doe", "john@example.com", today, tomorrow, 10, testRoom);
      testRoom.bookings.push(testBooking);
      expect(testBooking.getFee()).toBe(8100);
    });

    test('Maneja 0 descuentos correctamente', () => {
      const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
      const testRoom = new Room("Standard Room", 10000, 0, []);
      const testBooking = new Booking("No Discount", "test@example.com", today, tomorrow, 0, testRoom);
      testRoom.bookings.push(testBooking);
      expect(testBooking.getFee()).toBe(10000);
    });
  });
});