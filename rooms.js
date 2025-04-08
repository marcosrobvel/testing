import { booking } from "./booking";

export const rooms = [
  {
    name: "Deluxe Suite",
    rate: 20000,
    discount: 10,
    booking: [
      {
        name: "John Doe",
        email: "johndoe@gmail.com",
        checkIn: "2023-10-01",
        checkOut: "2023-10-05",
        discount: 10,
      },
    ],
  },
  {
    name: "Suite",
    rate: 30000,
    discount: 20,
    booking: [
      {
        name: "Jane Smith",
        email: "janesmith@gmail.com",
        checkIn: "2024-10-01",
        checkOut: "2024-10-05",
        discount: 20,
      },
    ],
  },
  {
    name: "Double bed",
    rate: 10000,
    discount: 20,
    booking: [
      {
        name: "David Johnson",
        email: "davidjohnson@gmail.com",
        checkIn: "2022-10-01",
        checkOut: "2022-10-05",
        discount: 30,
      },
    ],
  },
];
