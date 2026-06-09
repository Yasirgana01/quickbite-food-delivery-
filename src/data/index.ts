import type {
  Restaurant, MenuItem, Category, TrendingDish,
  Feature, FooterCol, Stat, PaymentMethod, TrackingStep,
  Order, SavedAddress, Coupon
} from '@/types'

export const RESTAURANTS: Restaurant[] = [
  { id:1, name:'The Burger Palace',   image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&fit=crop', tags:['Burgers','American'],   rating:4.8, reviews:'2.1k', time:20, distance:1.2, deliveryFee:500, open:true,  discount:'20% OFF',      wishlisted:false },
  { id:2, name:'Pizza Royale',         image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&fit=crop', tags:['Pizza','Italian'],     rating:4.7, reviews:'1.8k', time:25, distance:2.1, deliveryFee:400, open:true,  discount:'Free Delivery',wishlisted:true  },
  { id:3, name:"Mama's Kitchen",       image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&fit=crop', tags:['Nigerian','Local'],     rating:4.9, reviews:'3.2k', time:30, distance:0.8, deliveryFee:300, open:true,  discount:null,           wishlisted:false },
  { id:4, name:'Sushi Garden',         image:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&fit=crop', tags:['Japanese','Sushi'],   rating:4.6, reviews:'890',  time:35, distance:3.5, deliveryFee:600, open:true,  discount:'15% OFF',      wishlisted:false },
  { id:5, name:'The Shawarma Spot',    image:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&fit=crop', tags:['Shawarma','Wraps'],  rating:4.5, reviews:'1.4k', time:15, distance:0.5, deliveryFee:200, open:false, discount:null,           wishlisted:true  },
  { id:6, name:'Green Bowl',           image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&fit=crop', tags:['Healthy','Vegan'],   rating:4.7, reviews:'760',  time:20, distance:1.8, deliveryFee:400, open:true,  discount:'New',          wishlisted:false },
  { id:7, name:'Pasta Paradise',       image:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&fit=crop', tags:['Italian','Pasta'],   rating:4.8, reviews:'1.1k', time:28, distance:2.4, deliveryFee:500, open:true,  discount:'10% OFF',      wishlisted:false },
  { id:8, name:'Chicken Republic',     image:'https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=600&fit=crop', tags:['Chicken','Nigerian'],rating:4.4, reviews:'4.5k', time:18, distance:1.0, deliveryFee:350, open:true,  discount:null,           wishlisted:false },
  { id:9, name:'Lagos Grill House',    image:'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&fit=crop', tags:['BBQ','Grills'],        rating:4.9, reviews:'2.8k', time:40, distance:4.2, deliveryFee:700, open:true,  discount:'Weekend Deal', wishlisted:false },
]

export const MENU_ITEMS: MenuItem[] = [
  { id:101, name:'Classic Smash Burger',      desc:'Double smash patties, American cheese, special sauce, brioche bun', price:4500, cal:850,  spicy:false, veg:false, image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&fit=crop', category:'Burgers'  },
  { id:102, name:'BBQ Bacon Burger',           desc:'Crispy bacon, cheddar, BBQ sauce, caramelized onions',              price:5200, cal:920,  spicy:false, veg:false, image:'https://images.unsplash.com/photo-1553979459-d2229ba7433?w=200&fit=crop', category:'Burgers'  },
  { id:103, name:'Spicy Jalapeño Burger',      desc:'Fresh jalapeños, pepper jack, sriracha mayo, pickles',              price:4800, cal:800,  spicy:true,  veg:false, image:'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=200&fit=crop', category:'Burgers'  },
  { id:104, name:'Veggie Supreme',             desc:'Black bean patty, avocado, lettuce, tomato, vegan mayo',            price:4000, cal:620,  spicy:false, veg:true,  image:'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200&fit=crop', category:'Burgers'  },
  { id:105, name:'Crispy Chicken Sandwich',    desc:'Buttermilk fried chicken, coleslaw, honey mustard',                 price:4200, cal:780,  spicy:false, veg:false, image:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&fit=crop', category:'Chicken'  },
  { id:106, name:'Buffalo Wings (12pc)',        desc:'Crispy wings tossed in buffalo sauce, ranch dipping sauce',         price:6500, cal:1050, spicy:true,  veg:false, image:'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200&fit=crop', category:'Chicken'  },
  { id:107, name:'Loaded Fries',               desc:'Thick-cut fries, cheese sauce, bacon bits, jalapeños, sour cream',  price:2800, cal:680,  spicy:false, veg:false, image:'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=200&fit=crop', category:'Sides'    },
  { id:108, name:'Onion Rings',                desc:'Beer-battered golden onion rings with dipping sauce',               price:2200, cal:420,  spicy:false, veg:true,  image:'https://images.unsplash.com/photo-1639024471283-03518883512d?w=200&fit=crop', category:'Sides'    },
  { id:109, name:'Chocolate Milkshake',        desc:'Rich creamy chocolate shake with whipped cream',                    price:2500, cal:580,  spicy:false, veg:true,  image:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&fit=crop', category:'Drinks'   },
  { id:110, name:'Fresh Lemonade',             desc:'Freshly squeezed lemonade with mint and honey',                     price:1500, cal:120,  spicy:false, veg:true,  image:'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&fit=crop', category:'Drinks'   },
  { id:111, name:'Cookies & Cream Sundae',     desc:'Vanilla ice cream, crushed Oreos, hot fudge drizzle',              price:3200, cal:720,  spicy:false, veg:true,  image:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&fit=crop', category:'Desserts' },
  { id:112, name:'Brownie Overload',           desc:'Warm fudge brownie, vanilla ice cream, chocolate sauce',            price:3500, cal:890,  spicy:false, veg:true,  image:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&fit=crop', category:'Desserts' },
]

export const CATEGORIES: Category[] = [
  { icon:'🍕', name:'Pizza'     }, { icon:'🍔', name:'Burgers'   }, { icon:'🌯', name:'Shawarma' },
  { icon:'🍚', name:'Rice'      }, { icon:'🍝', name:'Pasta'     }, { icon:'🍰', name:'Desserts' },
  { icon:'🥤', name:'Drinks'    }, { icon:'🍳', name:'Breakfast' }, { icon:'🫕', name:'Local'    },
  { icon:'🥗', name:'Healthy'   },
]

export const TRENDING_DISHES: TrendingDish[] = [
  { name:'Smash Burger',    price:4500,  image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&fit=crop' },
  { name:'Pepperoni Pizza', price:8500,  image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&fit=crop' },
  { name:'Chicken Shawarma',price:3500,  image:'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&fit=crop' },
  { name:'Jollof Rice',     price:3000,  image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&fit=crop' },
  { name:'Sushi Platter',   price:12000, image:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&fit=crop' },
  { name:'Acai Bowl',       price:5500,  image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&fit=crop' },
]

export const FEATURES: Feature[] = [
  { icon:'⚡', title:'Lightning Fast',  desc:'Order to delivery in under 30 minutes, without compromising quality.',                           bg:'bg-amber-50' },
  { icon:'🍳', title:'Fresh Quality',   desc:'Only restaurants with top hygiene ratings. Every meal prepared fresh when you order.',          bg:'bg-green-50'  },
  { icon:'🔒', title:'Safe & Secure',   desc:'Encrypted payments, verified riders, and real-time tracking for total peace of mind.',          bg:'bg-blue-50'   },
]

export const STATS: Stat[] = [
  { value:'500+',  label:'Restaurants'      },
  { value:'50K+',  label:'Happy Customers'  },
  { value:'30min', label:'Avg Delivery'     },
  { value:'4.9★',  label:'App Rating'       },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id:'card',     icon:'💳', name:'Debit/Credit Card', desc:'Visa, Mastercard, Verve'   },
  { id:'transfer', icon:'🏦', name:'Bank Transfer',     desc:'Instant bank transfer'     },
  { id:'cash',     icon:'💵', name:'Cash on Delivery',  desc:'Pay when order arrives'    },
  { id:'wallet',   icon:'👝', name:'QuickBite Wallet',  desc:'Balance: ₦12,500'          },
]

export const TRACKING_STEPS: TrackingStep[] = [
  { icon:'✅', label:'Order Confirmed',   desc:'Your order has been confirmed by the restaurant', done:true,  active:false, time:'2:15 PM' },
  { icon:'👨‍🍳', label:'Preparing Food',   desc:'Chef is preparing your delicious meal',           done:true,  active:false, time:'2:20 PM' },
  { icon:'🏍️', label:'Rider Picked Up',  desc:'Kwame has picked up your order',                  done:true,  active:false, time:'2:38 PM' },
  { icon:'📍', label:'On The Way',        desc:'Kwame is 1.2km away — arriving soon!',            done:false, active:true,  time:''        },
  { icon:'🎉', label:'Delivered',         desc:'Enjoy your meal!',                                done:false, active:false, time:''        },
]

export const PAST_ORDERS: Order[] = [
  { id:'QB-2847', restaurant:'The Burger Palace', items:'Classic Smash Burger × 2, Fries × 1', total:11800, date:'Today, 1:30 PM',      status:'Delivered', image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&fit=crop' },
  { id:'QB-2791', restaurant:'Pizza Royale',       items:'Pepperoni Pizza × 1, Wings × 1',     total:14500, date:'Yesterday, 7:45 PM',  status:'Delivered', image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&fit=crop' },
  { id:'QB-2654', restaurant:"Mama's Kitchen",     items:'Jollof Rice × 2, Puff Puff × 1',     total:8200,  date:'Dec 28, 12:15 PM',    status:'Delivered', image:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&fit=crop' },
]

export const SAVED_ADDRESSES: SavedAddress[] = [
  { id:1, icon:'🏠', label:'Home',        address:'24 Lekki Phase 1, Lagos Island, Lagos'              },
  { id:2, icon:'💼', label:'Office',      address:'Victoria Island Business Hub, Block B, Floor 5'    },
  { id:3, icon:'📍', label:"Mom's Place", address:'15 Allen Avenue, Ikeja, Lagos'                      },
]

export const COUPONS: Coupon[] = [
  { code:'WELCOME50', desc:'50% off first order (up to ₦5,000)', active:true,  expiry:'Jan 31, 2025'  },
  { code:'FRIDAY20',  desc:'20% off on Fridays',                  active:true,  expiry:'Dec 31, 2024' },
  { code:'NEWUSER',   desc:'Free delivery on 5 orders',           active:false, expiry:'Dec 1, 2024'  },
]

export const FOOTER_COLS: FooterCol[] = [
  { title:'Company',        items:['About Us','Careers','Blog','Press']                         },
  { title:'For Customers',  items:['How it Works','Safety','Deals','Corporate Orders']          },
  { title:'For Partners',   items:['Restaurant Partners','Rider Sign-Up','Partner Portal','Support'] },
]

export const FILTERS = ['All','Fast Delivery','Top Rated','Budget','Healthy','Offers','Open Now'] as const
export type FilterType = typeof FILTERS[number]
