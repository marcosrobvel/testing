const { Room, Booking } = require('./index');

describe('Tests', () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  
  const testBooking = new Booking(
    "John Doe",
    "john@example.com",
    today,
    tomorrow,
    10,
    null
  );

  const testBooking2 = new Booking(
    "Jane Doe",
    "jane@example.com",
    yesterday,
    today,
    5,
    null
  );

  const testRoom = new Room(
    "Deluxe Suite",
    10000,
    5,
    [testBooking]
  );

  const testRoom2 = new Room(
    "Suite",
    20000,
    10,
    [testBooking2]
  );


  testBooking.room = testRoom; 
  testBooking2.room = testRoom2;

  describe('isOccupied() method', () => {
    test('Devuelve true si la habitación está ocupada en la fecha.', () => {

      expect(testRoom.isOccupied(today)).toBe(true);
    });

    test('Devuelve false si la habitación no está ocupada en la fecha.', () => {
      const pastDate = new Date(2020, 0, 1);
      expect(testRoom.isOccupied(pastDate)).toBe(false);
    });
  });

  describe('occupancyPercentage() method', () => {
    test('Calcula correctamente el porcentaje de ocupación.', () => {
      const startDate = new Date();
      startDate.setDate(today.getDate() - 1);
      const endDate = new Date();
      endDate.setDate(today.getDate() + 1);
      
      expect(testRoom.occupancyPercentage(startDate, endDate)).toBe(50);
    });
  });

  describe('static totalOccupancyPercentage()', () => {
    test('Calcula la ocupación total en varias habitaciones.', () => {
      const startDate = new Date();
      startDate.setDate(today.getDate() - 1);
      const endDate = new Date();
      endDate.setDate(today.getDate() + 1);
      const rooms = [testRoom, testRoom2];
      
      expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(50);
    });
  });

  describe('static availableRooms()', () => {
    test('Devuelve solo habitaciones disponibles', () => {
      
      const rooms = [testRoom, testRoom2];
      
      const available = Room.availableRooms(rooms, today, tomorrow);
      expect(available.length).toBe(1);
      expect(available[0].name).toBe("Suite");
    });
  });

  describe('fee getter', () => {
    test('Calcula correctamente la tarifa con descuentos', () => {
      const fee = testBooking.getFee()
      
      expect(fee).toBe(8500);
    });

    test('Maneja 0 descuentos correctamente', () => {
      const roomWithoutDiscount = new Room(
        "Standard Room",
        10000,
        0,
        []
      );

      const booking = new Booking(
        "No Discount",
        "test@example.com",
        new Date(),
        tomorrow,
        0,
        roomWithoutDiscount
      );

      roomWithoutDiscount.bookings.push(booking);

      
      expect(booking.getFee()).toBe(10000);
    });
  });
});
