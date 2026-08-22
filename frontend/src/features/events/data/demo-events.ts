import type { EventPreview } from "@/features/events/types/event";

export const featuredEvent: EventPreview = {
    id: 1,
    slug: "electric-nights",
    title: "Electric Nights",
    subtitle: "Open Air Music Festival",
    description:
        "Electronic music, immersive light installations and a summer night under the open sky.",
    startsAt: "2026-08-29T20:00:00+03:00",
    priceFrom: 25,
    imageUrl: "/images/events/electric-nights.jpeg",
    category: {
        id: 1,
        name: "Music",
        slug: "music",
    },
    venue: {
        id: 1,
        name: "Valea Morilor",
        city: "Chișinău",
    },
    isFeatured: true,
};

export const trendingEvents: EventPreview[] = [
    {
        id: 2,
        slug: "midnight-jazz-session",
        title: "Midnight Jazz Session",
        subtitle: "Live music after dark",
        description:
            "An intimate late-night jazz session with local and international musicians.",
        startsAt: "2026-08-28T21:30:00+03:00",
        priceFrom: 18,
        imageUrl: "/images/events/midnight-jazz.jpg",
        category: {
            id: 1,
            name: "Music",
            slug: "music",
        },
        venue: {
            id: 2,
            name: "Artcor",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 3,
        slug: "tech-future-2026",
        title: "Tech Future 2026",
        subtitle: "Ideas shaping tomorrow",
        description:
            "A day of talks, product showcases and conversations about technology and creativity.",
        startsAt: "2026-08-30T10:00:00+03:00",
        priceFrom: 25,
        imageUrl: "/images/events/tech-future.jpg",
        category: {
            id: 2,
            name: "Technology",
            slug: "technology",
        },
        venue: {
            id: 3,
            name: "Tekwill",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 4,
        slug: "urban-food-weekend",
        title: "Urban Food Weekend",
        subtitle: "Taste the city",
        description:
            "Independent kitchens, local chefs, music and a full weekend of street food.",
        startsAt: "2026-08-29T12:00:00+03:00",
        priceFrom: 0,
        imageUrl: "/images/events/urban-food.jpeg",
        category: {
            id: 3,
            name: "Food",
            slug: "food",
        },
        venue: {
            id: 4,
            name: "Digital Park",
            city: "Chișinău",
        },
        isFeatured: false,
    },
];

export const weekendEvents: EventPreview[] = [
    {
        id: 5,
        slug: "digital-art-immersion",
        title: "Digital Art Immersion",
        subtitle: "Light, sound and motion",
        description:
            "An audiovisual exhibition transforming a familiar space into something completely new.",
        startsAt: "2026-08-29T18:30:00+03:00",
        priceFrom: 16,
        imageUrl: "/images/events/digital-art.jpeg",
        category: {
            id: 4,
            name: "Art",
            slug: "art",
        },
        venue: {
            id: 5,
            name: "Mediacor",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 6,
        slug: "rooftop-cinema-night",
        title: "Rooftop Cinema Night",
        subtitle: "Movies above the city",
        description:
            "A late summer rooftop screening with drinks, city lights and open-air atmosphere.",
        startsAt: "2026-08-29T21:00:00+03:00",
        priceFrom: 12,
        imageUrl: "/images/events/rooftop-cinema.webp",
        category: {
            id: 4,
            name: "Art",
            slug: "art",
        },
        venue: {
            id: 6,
            name: "Rooftop 27",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 7,
        slug: "sunset-city-run",
        title: "Sunset City Run",
        subtitle: "Move through the city",
        description:
            "A relaxed evening run through the city followed by music and refreshments.",
        startsAt: "2026-08-30T18:00:00+03:00",
        priceFrom: 8,
        imageUrl: "/images/events/sunset-run.avif",
        category: {
            id: 5,
            name: "Sports",
            slug: "sports",
        },
        venue: {
            id: 7,
            name: "Valea Trandafirilor",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 8,
        slug: "ceramic-sunday",
        title: "Ceramic Sunday",
        subtitle: "Make something by hand",
        description:
            "A slow Sunday workshop for beginners with clay, coffee and a small creative group.",
        startsAt: "2026-08-30T13:00:00+03:00",
        priceFrom: 20,
        imageUrl: "/images/events/ceramic-sunday.jpg",
        category: {
            id: 6,
            name: "Workshops",
            slug: "workshops",
        },
        venue: {
            id: 8,
            name: "Forma Studio",
            city: "Chișinău",
        },
        isFeatured: false,
    },
];

export const popularEvents: EventPreview[] = [
    {
        id: 9,
        slug: "symphony-under-stars",
        title: "Symphony Under Stars",
        subtitle: "An orchestra beneath the summer sky",
        description:
            "An open-air evening of classical music, candlelight and late-summer atmosphere.",
        startsAt: "2026-09-04T20:00:00+03:00",
        priceFrom: 30,
        imageUrl: "/images/events/symphony-under-stars.jpg",
        category: {
            id: 1,
            name: "Music",
            slug: "music",
        },
        venue: {
            id: 9,
            name: "Grădina Botanică",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 10,
        slug: "wine-and-vinyl",
        title: "Wine & Vinyl",
        subtitle: "Slow records, good bottles, late hours",
        description:
            "A relaxed listening session pairing curated vinyl selections with local wines.",
        startsAt: "2026-09-05T19:30:00+03:00",
        priceFrom: 14,
        imageUrl: "/images/events/wine-and-vinyl.webp",
        category: {
            id: 7,
            name: "Nightlife",
            slug: "nightlife",
        },
        venue: {
            id: 10,
            name: "Casa Dacă",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 11,
        slug: "makers-market",
        title: "Makers Market",
        subtitle: "Independent design and local craft",
        description:
            "A weekend market featuring independent studios, small brands and local makers.",
        startsAt: "2026-09-06T11:00:00+03:00",
        priceFrom: 0,
        imageUrl: "/images/events/makers-market.webp",
        category: {
            id: 4,
            name: "Art",
            slug: "art",
        },
        venue: {
            id: 11,
            name: "Palatul Republicii",
            city: "Chișinău",
        },
        isFeatured: false,
    },
    {
        id: 12,
        slug: "standup-after-dark",
        title: "Stand-up After Dark",
        subtitle: "A small room and very bad decisions",
        description:
            "A late comedy show bringing together some of the city's sharpest emerging performers.",
        startsAt: "2026-09-06T21:00:00+03:00",
        priceFrom: 15,
        imageUrl: "/images/events/standup-after-dark.jpg",
        category: {
            id: 8,
            name: "Comedy",
            slug: "comedy",
        },
        venue: {
            id: 12,
            name: "Queer Cafe",
            city: "Chișinău",
        },
        isFeatured: false,
    },
];