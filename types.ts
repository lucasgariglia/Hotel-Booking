export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  imageUrl: string;
  features: string[];
  category: 'room' | 'suite' | 'club';
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BookingForm {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  name: string;
  email: string;
  specialRequests: string;
}

export interface Booking extends BookingForm {
  id: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  dateCreated: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
}

// CMS Types
export interface HeroContent {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  backgroundImage: string;
  estDate: string;
}

export interface AboutContent {
  titleLine1: string;
  titleLine2: string;
  philosophyQuote: string;
  heritageText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface SiteContent {
  home: {
    hero: HeroContent;
  };
  about: AboutContent;
  services: {
    items: ServiceItem[];
  };
}