export type EventsData = {
    index?: number;
    id: string;
    title: string;
    themeTitle: string;
    description: string;
    image: string;
    participants: number;
    color: string;
    heads: EventHeads[];
    rules: string[];
    wanted?: string;
};

export type EventHeads = {
    name: string;
    contact: string;
};

export type EventDetailsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    themeTitle: string;
    color: string;
    rules: string[] | undefined;
    heads: EventHeads[] | undefined;
    description: string;
};

export const eventsData = [
    {
        id: "robin",
        title: "IT Quiz",
        themeTitle: "Quizomania",
        description: "Test your tech knowledge against the best minds.",
        image:
            "https://media1.tenor.com/m/ZrJ2jtlA7tUAAAAC/nico-robin-one-piece.gif",
        participants: 2,
        color: "9134DB",
        heads: [
            {
                name: "not added",
                contact: "93949494",
            },
            {
                name: "not added",
                contact: "93949494",
            },
        ],
        rules: [
            "The quiz will consist of 3 rounds.",
            "Each round will have a different set of questions.",
            "The team with the highest score wins.",
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/xapbibvsvpuwugsvarvw'
    },
    {
        id: "chopper",
        title: "Surprise Event",
        themeTitle: "Raftle Rush",
        description: "Whats Inside? Even Oda Wont Tell! 🤐🎁",
        image:
            "https://media1.tenor.com/m/MVFAsfv3wk0AAAAC/one-piece-one-piece-movie.gif",
        participants: 2,
        color: "F066BB",
        heads: [
            {
                name: "Bhavya N U",
                contact: "9481191651",
            },
            {
                name: "Poojitha N S",
                contact: "8088990570",
            },
        ],
        rules: [
            "Each team has 2 members.",
            "Teams complete a surprise challenge within a time limit.",
            "Tasks may require problem-solving, creativity, or other skills.",
            "The fastest and most accurate team wins.",
            "A tiebreaker will decide in case of a tie.",
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/dchwrxvua7wsjiay5dvh'
    },
    {
        id: "zoro",
        title: "Mini Hackathon",
        themeTitle: "Hackathon",
        description: "Code, innovate, and build solutions on the spot.",
        image: "https://media1.tenor.com/m/kDkGTrLUIlMAAAAd/zoro-anime.gif",
        participants: 2,
        color: "176A1C",
        heads: [
            {
                name: "not added",
                contact: "93949494",
            },
            {
                name: "not added",
                contact: "93949494",
            },
        ],
        rules: [
            "The hackathon will be 3 hours long.",
            "Teams can consist of 2 members.",
            "The team with the most innovative solution wins.",
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/xapbibvsvpuwugsvarvw'
    },
    {
        id: "franky",
        title: "Coding",
        themeTitle: "Rogue Code",
        description: "No Devil Fruits, Just Pure Coding Skills!",
        image: "https://media1.tenor.com/m/0Y_xLi0iSTwAAAAC/one-piece-franky.gif",
        participants: 2,
        color: "1AD1F9",
        heads: [
            {
                name: "Theerthananda",
                contact: "9353012405",
            },
            {
                name: "Krishnendhu E Nair",
                contact: "8921245658",
            },
        ],
        rules: [
            "Open to all with basic C knowledge.",
            "Only Turbo C or Dev C++ allowed.",
            "Plagiarism and code sharing lead to disqualification.",
            "Digital gadgets are strictly prohibited.",
            "Judges decision is final and binding."
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/urksqhvj64hb2hjtzule'
    },
    {
        id: "sanji",
        title: "IT Manager",
        themeTitle: "IT Manager",
        description: "Prove your leadership and problem-solving skills.",
        image: "https://media1.tenor.com/m/0I8FD6kd8y4AAAAC/sanji-sanji-dip.gif",
        participants: 1,
        color: "276DF1",
        heads: [
            {
                name: "not added",
                contact: "93949494",
            },
            {
                name: "not added",
                contact: "93949494",
            },
        ],
        rules: [
            "The event will consist of 3 rounds.",
            "Each round will have a different set of challenges.",
            "The participant with the highest score wins.",
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/xapbibvsvpuwugsvarvw'
    },
    {
        id: "usopp",
        title: "Gaming [BGMI]",
        themeTitle: "Warlords Conquest ",
        description: "Skypiea Battle Royale",
        image:
            "https://media1.tenor.com/m/QOoJjVrHhYsAAAAC/one-piece-one-piece-film-gold.gif",
        participants: 2,
        color: "E0A911",
        heads: [
            {
                name: "Sagar",
                contact: "7624910281",
            },
            {
                name: "Rakesh",
                contact: "8088482527",
            },
        ],
        rules: [
            "Participant's levels should be above 20.",
            "No gadgets will be provided for the event.",
            "Hacking or foul plays will lead to disqualification.",
            "Maps needed: Erangel,Miramar, Sanhok, Livik.",
            "Both android and ios devices are allowed."
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/xapbibvsvpuwugsvarvw'
    },
    {
        id: "nami",
        title: "Group Dance",
        themeTitle: "Dance",
        description: "Showcase your moves and sync with the rhythm as a team.",
        image:
            "https://media1.tenor.com/m/zGTLZEoesSsAAAAC/nami-nami-one-piece.gif",
        participants: 6,
        color: "ED9030",
        heads: [
            {
                name: "not added",
                contact: "93949494",
            },
            {
                name: "not added",
                contact: "93949494",
            },
        ],
        rules: [
            "The dance event will be 3 minutes long.",
            "Teams can consist of 6 members.",
            "The team with the most synchronized performance wins.",
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/xapbibvsvpuwugsvarvw'
    },
    {
        id: "brook",
        title: "Reel Making",
        themeTitle: "Reel Making",
        description: "Create engaging short videos and unleash your creativity.",
        image: "https://media1.tenor.com/m/1_E4qnfvZacAAAAd/one-piece-brook.gif",
        participants: 1,
        color: "4F4F4F",
        heads: [
            {
                name: "not added",
                contact: "93949494",
            },
            {
                name: "not added",
                contact: "93949494",
            },
        ],
        rules: [
            "The reel making event will be 2 hours long.",
            "Participants can use any editing software.",
            "The participant with the most creative reel wins.",
        ],
        wanted: 'https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/xapbibvsvpuwugsvarvw'
    },
];