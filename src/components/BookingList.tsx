"use client"
import { removeBooking } from "@/redux/features/bookSlice";
import { useAppSelector, AppDispatch } from "@/redux/store"
import { BookingItem } from "../../interface"
import { useDispatch } from "react-redux";
export default function BookingList() {
    const bookings = useAppSelector((state) => state.bookSlice?.bookItems ?? []);
    const dispatch = useDispatch<AppDispatch>();
    
    if (bookings.length === 0) {
        return <div className="text-center text-lg text-gray-600">No Venue</div>;
    }

    return(
        <>
            {
                bookings.map((bookingItem:BookingItem ) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.venue+bookingItem.bookDate}>
                        <div className="text-lg font-medium"> Venue: {bookingItem.venue} </div>
                        <div> Name: {bookingItem.nameLastname} </div>
                        <div> Tel: {bookingItem.tel} </div>
                        <div> Booking Date: {bookingItem.bookDate} </div>

                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-small mt-2"
                        onClick={()=>{
                            dispatch(removeBooking(bookingItem));
                        }}> Cancel Booking </button>
                    </div>
                ))
            }
        </>
    )
}
