
import {apiGetBookingUser} from "../../../apis/apiBooking.ts";
import { useState, useMemo, useEffect } from "react";//Dùng useMemo() giúp tránh tính toán lại khi các thông tin  không thay đổi.
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BookingUser } from "../../../interfaces/VaccineRegistration.ts";
import { apiCancelBooking, apiDeleteFeedBack, apiPostFeedBack, apiUpdateFeedback } from "../../../apis/apiBooking.ts";
import { useFeedBackDetailByBookingId } from "../../../hooks/useFeedBack.ts";


export const useBookingUser = () => {
    const [bookings, setBookings] = useState<BookingUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await apiGetBookingUser();
                setBookings(data.result || []);
            } catch (err) {
                console.error(err);
                setError("Lỗi khi tải dữ liệu đặt lịch.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return { bookings, loading, error };
};

export const STATUS_COLORS: Record<string, string> = {
    Pending: "#faad14",
    Confirmed: "#1890ff",
    Completed: "#52c41a",
    Cancelled: "#ff4d4f",
};

export const useBookingHistoryPage = (bookings: BookingUser[]) => {


    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [feedbackModalVisible, setFeedbackModalVisible] = useState<boolean>(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingUser | null>(null);
    const [calendarValue, setCalendarValue] = useState<Dayjs>(dayjs());
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [latestDate, setLatestDate] = useState<string | null>(null);

    const { feedbackBookingId } = useFeedBackDetailByBookingId(Number(selectedBooking?.bookingId));

    //sắp xếp lại mảng dựa vào BookingID lớn nhất ( cái này để người dùng hình dung là khi họ đăng kí đơn, naviaate tới trang lịch sử thì họ sẽ thấy đơn mình vừa đặt đầu tiên
    const latestBooking = useMemo(() => {
        if (bookings.length === 0) return null;
        return bookings.reduce(
            (max, booking) => (booking.bookingId > max.bookingId ? booking : max),
            bookings[0]
        );
    }, [bookings]);

    //cái này là cập nhật liên tục cho calendar về cái booking mới nhất thôi
    useEffect(() => {
        if (latestBooking && latestBooking.bookingDate !== latestDate) {
            setLatestDate(latestBooking.bookingDate);
        }
        if (latestDate) {
            setCalendarValue(dayjs(latestDate));
        }
    }, [latestBooking, latestDate]);

    //Modal đóng thì reset lại thông tin trống
    useEffect(() => {
        if (!feedbackModalVisible) {
            setComment("");
            setRating(0);
            setIsEditMode(false);
        }
    }, [feedbackModalVisible]);

    // cái này dùng để thẻ hiện dữ liệu để người dùng có thể dễ dàng update
    useEffect(() => {
        if (isEditMode && feedbackBookingId) {
            setComment(feedbackBookingId.comment || "");
            setRating(feedbackBookingId.rating || 0);
        }
    }, [isEditMode, feedbackBookingId]);

    //gọi cái này để không phải gọi lại api khi truy cập ( trừ trường hợp có thay đổi)
    const defaultSelectedDate = useMemo(() => {
        if (!latestBooking) return dayjs();
        return dayjs(latestBooking.bookingDate);
    }, [latestBooking]);


    const selectedYear = useMemo(
        () => (calendarValue ? calendarValue.year() : defaultSelectedDate.year()),
        [calendarValue, defaultSelectedDate]
    );

    const sortedBookings = useMemo(() => {
        return [...bookings].sort((a, b) => b.bookingId - a.bookingId);
    }, [bookings]);

    const bookingsByYear = useMemo(() => {
        return sortedBookings.filter(
            (booking) => dayjs(booking.bookingDate).year() === selectedYear
        );
    }, [sortedBookings, selectedYear]);

    // Create booking maps
    const bookingMap: Record<string, BookingUser[]> = useMemo(() => {
        const map: Record<string, BookingUser[]> = {};
        bookingsByYear.forEach((booking) => {
            const dateKey = dayjs(booking.bookingDate).format("YYYY-MM-DD");
            if (!map[dateKey]) {
                map[dateKey] = [];
            }
            map[dateKey].push(booking);
        });
        return map;
    }, [bookingsByYear]);

    //Tư
    const bookingsByMonth: Record<string, number> = useMemo(() => {
        const monthMap: Record<string, number> = {};
        bookingsByYear.forEach((booking) => {
            const monthKey = dayjs(booking.bookingDate).format("YYYY-MM");
            monthMap[monthKey] = (monthMap[monthKey] || 0) + 1;
        });
        return monthMap;
    }, [bookingsByYear]);

    // Biến này tạo ra một đối tượng (result) chứa số lượng đơn đặt lịch theo tháng và theo từng trạng thái (status)
    const statusCountByMonth = useMemo(() => {
        const result: Record<string, Record<string, number>> = {};

        bookingsByYear.forEach((booking) => {
            const monthKey = dayjs(booking.bookingDate).format("YYYY-MM");
            if (!result[monthKey]) {
                result[monthKey] = {};
            }
            result[monthKey][booking.status] = (result[monthKey][booking.status] || 0) + 1;
        });

        return result;
    }, [bookingsByYear]);


    const handleCancelBooking = async (bookingId: number) => {
        try {
            const response = await apiCancelBooking(bookingId);

            if (response.isSuccess) {
                toast.success("Hủy lịch thành công");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof AxiosError) {
                if (error.response && error.response.data && error.response.data.errorMessages) {
                    toast.error(`${error.response.data.errorMessages}`);
                } else {
                    toast.error("Lỗi không xác định");
                }
            } else {
                toast.error("Lỗi không xác định");
            }
        }
    };

    const handleSubmitFeedback = async () => {
        if (!selectedBooking) return;

        try {
            let response;

            if (isEditMode && feedbackBookingId) {

                const formatedDataUpdate = {
                    rating: Number(rating),
                    comment: comment,
                };

                response = await apiUpdateFeedback(feedbackBookingId.feedbackId, formatedDataUpdate);
                if (response.isSuccess) {
                    toast.success("Cập nhật Feedback thành công");
                }
            } else {
                // Add new feedback
                const formatedDataAdd = {
                    bookingId: selectedBooking.bookingId,
                    rating: Number(rating),
                    comment: comment,
                };

                response = await apiPostFeedBack(formatedDataAdd);
                if (response.isSuccess) {
                    toast.success("Đã thêm Feedback thành công");
                }
            }

            setFeedbackModalVisible(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error: unknown) {
            console.error("Error:", error);
            if (error instanceof AxiosError) {
                if (error.response && error.response.data && error.response.data.errorMessages) {
                    toast.error(`${error.response.data.errorMessages}`);
                } else {
                    toast.error("Lỗi không xác định");
                }
            } else {
                toast.error("Lỗi không xác định");
            }
        }
    };

    const handleDeleteFeedback = async (feedBackId: number) => {
        try {
            const response = await apiDeleteFeedBack(feedBackId);
            if (response.isSuccess) {
                toast.success("Xóa Feedback thành công")
            }
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(`${err.response?.data?.errorMessages}`)
            } else {
                toast.error("Lỗi không xác định")
            }
        }
    };

    const openFeedbackModal = (editMode = false) => {
        setIsEditMode(editMode);
        setFeedbackModalVisible(true);
    };

    return {
        // State
        selectedDate,
        setSelectedDate,
        visible,
        setVisible,
        feedbackModalVisible,
        setFeedbackModalVisible,
        selectedBooking,
        setSelectedBooking,
        calendarValue,
        setCalendarValue,
        comment,
        setComment,
        rating,
        setRating,
        isEditMode,
        feedbackBookingId,

        // Derived data
        bookingMap,
        bookingsByMonth,
        statusCountByMonth,
        defaultSelectedDate,
        selectedYear,

        // Actions
        handleCancelBooking,
        handleSubmitFeedback,
        handleDeleteFeedback,
        openFeedbackModal
    };
};




