export type EventsData = {
    index?: number;
    id: string;
    title: string;
    themeTitle: string;
    description: string;
    image: string;
    participants: number;
    color: string;
    heads?: EventHeads[];
    rules?: string[];
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

export const eventsData: EventsData[] = [
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
    },
    {
        id: "chopper",
        title: "Surprise Event",
        themeTitle: "Surprise",
        description: "Expect the unexpected!",
        image:
            "https://media1.tenor.com/m/MVFAsfv3wk0AAAAC/one-piece-one-piece-movie.gif",
        participants: 1,
        color: "F066BB",
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
            "The event will be revealed on the spot.",
            "Prepare for a fun and exciting challenge.",
            "Expect the unexpected!",
        ],
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
    },
    {
        id: "franky",
        title: "Coding",
        themeTitle: "Coding",
        description: "Solve challenging problems and showcase your coding skills.",
        image: "https://media1.tenor.com/m/0Y_xLi0iSTwAAAAC/one-piece-franky.gif",
        participants: 1,
        color: "1AD1F9",
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
            "The coding challenge will be 1 hour long.",
            "Participants can choose any programming language.",
            "The participant with the most optimized solution wins.",
        ],
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
    },
    {
        id: "usopp",
        title: "Gaming",
        themeTitle: "Gaming",
        description: "Battle it out in the ultimate gaming showdown.",
        image:
            "https://media1.tenor.com/m/QOoJjVrHhYsAAAAC/one-piece-one-piece-film-gold.gif",
        participants: 1,
        color: "E0A911",
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
            "The gaming event will be 1 hour long.",
            "Participants can choose any game of their choice.",
            "The participant with the highest score wins.",
        ],
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
    },
];