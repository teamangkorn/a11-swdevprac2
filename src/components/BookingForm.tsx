"use client";

import DateReserve from "@/components/DateReserve";
import { addBooking } from "@/redux/features/bookSlice";
import { AppDispatch } from "@/redux/store";
import { Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BookingItem } from "../../interface";

type BookingFormProps = {
  displayName: string;
  vid: string;
  venueName: string;
};

export default function BookingForm({
  displayName,
  vid,
  venueName,
}: BookingFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>("BKK");
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [returnLocation, setReturnLocation] = useState<string>("BKK");
  const [venue, setVenue] = useState<string>(venueName);
  const [nameLastname, setNameLastname] = useState<string>(displayName);
  const [tel, setTel] = useState<string>("");

  const makeBooking = () => {
    if (venue) {
      const newBooking: BookingItem = {
        nameLastname,
        tel,
        venue,
        bookDate: pickupDate ? pickupDate.format("YYYY/MM/DD") : "",
      };
      dispatch(addBooking(newBooking));
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-lg text-gray-700">Welcome back, {displayName}</div>

      <div className="text-xl font-medium">Venue Booking</div>
      <div className="text-xl font-medium">
        Booking for venue: {venueName} (ID: {vid})
      </div>
      <div className="w-fit space-y-2">
        <div className="text-md text-left text-gray-600">
          {" "}
          Pick-up Date and Location
        </div>
        <DateReserve
          onDateChange={(value: Dayjs) => {
            setPickupDate(value);
          }}
          onLocationChange={(value: string) => setPickupLocation(value)}
        />

        <TextField
          id="outlined-basic"
          name="Name-Lastname"
          label="Name-Lastname"
          variant="standard"
          className="bg-white w-[200px]"
          value={nameLastname}
          onChange={(event) => setNameLastname(event.target.value)}
        />
        <TextField
          id="tel_num"
          name="Contact-Number"
          label="Contact-Number"
          variant="standard"
          className="bg-white w-[200px]"
          value={tel}
          onChange={(event) => setTel(event.target.value)}
        />
        <div className="text-md text-left text-gray-600">
          {" "}
          Return Date and Location
        </div>

        <Select
          variant="standard"
          name="venue"
          id="venue"
          value={venue}
          onChange={(event) => setVenue(event.target.value as string)}
        >
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
      </div>
      <button
        name="Book Venue"
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-small"
        onClick={makeBooking}
      >
        Book Venue
      </button>
    </main>
  );
}
