export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'hair' | 'beard' | 'combo' | 'vip';
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  instagram?: string;
  rating: number;
  yearsExperience: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  barberId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
}
