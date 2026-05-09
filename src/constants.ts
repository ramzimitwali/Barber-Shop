import { Service, Barber, Review } from "@/src/types";

export const SERVICES: Service[] = [
  {
    id: "h1",
    name: "Classic Haircut",
    description: "A precision cut tailored to your head shape and desired style. Includes hair wash and styling.",
    price: 45,
    duration: 45,
    category: "hair",
    popular: true,
  },
  {
    id: "h2",
    name: "Skin Fade",
    description: "The cleanest gradients. Tapered from skin to your desired length. Sharp and precise.",
    price: 55,
    duration: 60,
    category: "hair",
    popular: true,
  },
  {
    id: "b1",
    name: "Beard Trim & Sculpt",
    description: "Professional beard grooming with straight razor line-up and conditioning oil.",
    price: 30,
    duration: 30,
    category: "beard",
  },
  {
    id: "c1",
    name: "The Full Lounge Experience",
    description: "Our signature combo: Skin fade, beard sculpt, hot towel shave, and charcoal mask.",
    price: 110,
    duration: 120,
    category: "vip",
    popular: true,
  },
  {
    id: "s1",
    name: "Hot Towel Shave",
    description: "Traditional straight razor shave with essential oils and hot towels.",
    price: 40,
    duration: 45,
    category: "beard",
  }
];

export const BARBERS: Barber[] = [
  {
    id: "b1",
    name: "Marcus Vane",
    role: "Master Barber & Founder",
    bio: "Over 15 years of experience in luxury grooming. Specialist in classic scissoring and precision tapers.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=500",
    specialties: ["Classic Cuts", "Scissor Work", "Grooming Consultation"],
    instagram: "marcus_vane",
    rating: 5.0,
    yearsExperience: 15,
  },
  {
    id: "b2",
    name: "Leo 'The Blade' Santos",
    role: "Senior Groomer",
    bio: "The king of skin fades and sharp line-ups. Leo brings urban edge with high-fashion finish.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500",
    specialties: ["Skin Fades", "Beard Sculpting", "Line-ups"],
    instagram: "leo_blade",
    rating: 4.9,
    yearsExperience: 8,
  },
  {
    id: "b3",
    name: "James Chen",
    role: "Grooming Specialist",
    bio: "Master of texture and modern styling. James knows exactly how to work with every hair type.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=500",
    specialties: ["Modern Styles", "Hard Parts", "Asian Hair Specialist"],
    instagram: "jameschencutz",
    rating: 4.8,
    yearsExperience: 6,
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "David Thompson",
    rating: 5,
    comment: "Best skin fade I've ever had. The attention to detail is insane. Marcus is a true artist.",
    date: "2 days ago",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "r2",
    userName: "Sarah Jenkins",
    rating: 5,
    comment: "Brought my husband here for the VIP package. He looked incredible and really enjoyed the experience.",
    date: "1 week ago",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: "r3",
    userName: "Michael Ross",
    rating: 5,
    comment: "Finally found a barber who listens. The vibe is chill and the coffee is actually good. 10/10.",
    date: "3 days ago",
    avatar: "https://i.pravatar.cc/150?u=michael"
  }
];
