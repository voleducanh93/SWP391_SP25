export interface BookingResponse {
  bookingId: string | number;
  childName: string;
  bookingDate: string;
  bookingType: string;
  totalPrice: string;
  note: string;
  status: string;
}

export interface FeedbackDetailByBookingIdResponse {
    feedbackId: number;
    bookingId: number;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    dateSubmitted : string;
}

export interface UpdateFeedback {
    comment: string;
    rating: number;
}