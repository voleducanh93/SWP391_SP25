// Kiểu dữ liệu cho thông tin trẻ
export interface Child {
  childId: string;
  fullName: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  medicalHistory: string;
  relationToUser: string;
  height: number;
  weight: number;
  imageUrl: string | null;
  userId: string;
}

// Kiểu dữ liệu cho thông tin phụ huynh
export interface Parent {
  customerCode: string;
  parentName: string;
  children: Child[];
}


// Kiểu dữ liệu cho vắc xin
export interface Vaccine {
  vaccineId: string;
  name: string;
  description: string;
  manufacturer: string;
  sideEffect: string;
  diseasePrevented: string;
  price: string;
  status: string;
  isNecessary: boolean;
  lotNumber: string;
  image: string;
  reminder: string;
  reminderDate: string;
  injectionSite: string;
  notes: string;
  dose: string;
  vaccineInteractions: string;
  undesirableEffects: string;
  preserve: string;
  injectionsCount: number;
}

// Kiểu dữ liệu cho gói vắc xin
export interface VaccinePackage {
  comboId: string;
  comboName: string;
  description: string;
  totalPrice: string;
  isActive: boolean;
  vaccines: [Vaccine];
}

export interface Booking {
  childId: string;
  bookingDate: string;
  notes: string;
  bookingDetails: BookingDetail[];
}

export interface BookingDetail {
  vaccineId: number | null;
  comboVaccineId: number | null;
}


export interface BookingUser {
  bookingId: number;
  userId: string;
  childId: number;
  childName: string;
  bookingType: string;
  bookingDate: string;
  totalPrice: number;
  notes: string;
  status: string;
  bookingDetails: BookingDetail[];
}

export interface BookingResponse {
  bookingId: string | number;
  childName: string;
  bookingDate: string;
  bookingType: string;
  totalPrice: string;
  note: string;
  status: string;
}


export interface Feedback {
  bookingId: number;
  rating : number;
  comment: string;
}

export interface BookingResult {
  bookingId: number;
  userId: string;
  childId: number;
  childName: string;
  bookingType: string;
  bookingDate: string;
  totalPrice: number;
  notes: string;
  status: string;
  bookingDetails: BookingDetail[];
}