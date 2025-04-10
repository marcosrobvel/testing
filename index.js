class Room {
  constructor(name, rate, discount = 0, bookings = []) {
    this.name = name;
    this.rate = rate;
    this.discount = discount;
    this.bookings = bookings;
  }

  isOccupied(date) {
    const checkDate = date instanceof Date ? date : new Date(date);

    return this.bookings.some((booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      return checkDate >= checkIn && checkDate < checkOut;
    });
  }

  occupancyPercentage(startDate, endDate) {
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (totalDays <= 0) return 0;

    let occupiedDays = 0;
    const currentDate = new Date(start);

    while (currentDate < end) {
      if (this.isOccupied(currentDate)) {
        occupiedDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (occupiedDays / totalDays) * 100;
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    const totalOccupancy = rooms.reduce((total, room) => {
      return total + room.occupancyPercentage(startDate, endDate);
    }, 0);

    return totalOccupancy / rooms.length;
  }

  static availableRooms(rooms, startDate, endDate) {
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);

    return rooms.filter((room) => {
      const currentDate = new Date(start);
      while (currentDate < end) {
        if (room.isOccupied(currentDate)) {
          return false;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return true;
    });
  }
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount = 0, room) {
    this.name = name;
    this.email = email;
    this.checkIn = new Date(checkIn);
    this.checkOut = new Date(checkOut);
    this.discount = discount;
    this.room = room;
  }

  get days() {
    console.log(this.checkIn, this.checkOut);
    if (this.checkOut <= this.checkIn) {
      return 1;
    }
    return Math.ceil((this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24));
  }

  getFee() {
    const baseFee = this.room.rate * this.days;
    console.log(this.days);
    console.log(this.room.rate);

    let finalFee = baseFee;
    console.log(`Base fee: ${baseFee}`);
    if (this.room.discount) finalFee -= (finalFee * this.room.discount) / 100; // Usa finalFee, no baseFee
    if (this.discount) finalFee -= (finalFee * this.discount) / 100;

    return finalFee;
  }
}

module.exports = { Room, Booking };
