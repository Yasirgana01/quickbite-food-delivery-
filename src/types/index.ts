export interface Restaurant {
  id: number
  name: string
  image: string
  tags: string[]
  rating: number
  reviews: string
  time: number
  distance: number
  deliveryFee: number
  open: boolean
  discount: string | null
  wishlisted: boolean
}

export interface MenuItem {
  id: number
  name: string
  desc: string
  price: number
  cal: number
  spicy: boolean
  veg: boolean
  image: string
  category: string
}

export interface CartItem extends MenuItem {
  qty: number
  restaurantName: string
}

export interface CheckoutForm {
  name: string
  phone: string
  address: string
  city: string
  state: string
  landmark: string
  notes: string
}

export interface PaymentMethod {
  id: string
  icon: string
  name: string
  desc: string
}

export interface TrackingStep {
  icon: string
  label: string
  desc: string
  done: boolean
  active: boolean
  time: string
}

export interface Order {
  id: string
  restaurant: string
  items: string
  total: number
  date: string
  status: string
  image: string
}

export interface SavedAddress {
  id: number
  icon: string
  label: string
  address: string
}

export interface Coupon {
  code: string
  desc: string
  active: boolean
  expiry: string
}

export interface Category {
  icon: string
  name: string
}

export interface TrendingDish {
  name: string
  price: number
  image: string
}

export interface Feature {
  icon: string
  title: string
  desc: string
  bg: string
}

export interface FooterCol {
  title: string
  items: string[]
}

export interface Stat {
  value: string
  label: string
}
