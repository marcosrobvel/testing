const { Room, Booking } = require('./index');

describe('Room Class', () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  const testBooking = new Booking(
    "John Doe",
    "john@example.com",
    today,
    tomorrow,
    10,
    null
  );

  const testRoom = new Room(
    "Deluxe Suite",
    [testBooking],
    10000,
    5
  );

  describe('isOccupied() method', () => {
    test('Returns true if the room is occupied on the date', () => {
      expect(testRoom.isOccupied(today)).toBe(true);
    });

    test('Returns false if the room is not occupied on the date', () => {
      const pastDate = new Date(2020, 0, 1);
      expect(testRoom.isOccupied(pastDate)).toBe(false);
    });
  });

  describe('occupancyPercentage() method', () => {
    test('Correctly calculates occupancy percentage', () => {
      const startDate = new Date();
      startDate.setDate(today.getDate() - 1);
      const endDate = new Date();
      endDate.setDate(today.getDate() + 1);
      
      expect(testRoom.occupancyPercentage(startDate, endDate)).toBe(50);
    });
  });

  describe('static totalOccupancyPercentage()', () => {
    test('Calculates total occupancy across multiple rooms', () => {
      const room1 = new Room("Room 1", [testBooking], 10000, 0);
      const room2 = new Room("Room 2", [], 8000, 0);
      const rooms = [room1, room2];
      
      expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(25);
    });
  });

  describe('static availableRooms()', () => {
    test('Returns only available rooms', () => {
      const room1 = new Room("Room 1", [testBooking], 10000, 0);
      const room2 = new Room("Room 2", [], 8000, 0);
      const rooms = [room1, room2];
      
      const available = Room.availableRooms(rooms, today, tomorrow);
      expect(available.length).toBe(1);
      expect(available[0].name).toBe("Room 2");
    });
  });
});

describe('Booking Class', () => {
  describe('fee getter', () => {
    test('Correctly calculates fee with discounts', () => {
      const room = new Room("Standard", [], 10000, 10); 
      const booking = new Booking(
        "Jane Smith",
        "jane@example.com",
        new Date(),
        new Date(),
        5, 
        room
      );
      
      expect(booking.fee).toBe(8550);
    });

    test('Handles 0 discount correctly', () => {
      const room = new Room("Standard", [], 10000, 0);
      const booking = new Booking(
        "No Discount",
        "test@example.com",
        new Date(),
        new Date(),
        0,
        room
      );
      
      expect(booking.fee).toBe(10000);
    });
  });
});