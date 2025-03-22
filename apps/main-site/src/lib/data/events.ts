export type EventsData = {
  index?: number;
  id: string;
  title: string;
  themeTitle: string;
  description: string;
  image: string;
  participants: number | string;
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
    themeTitle: "Yonko Rumble",
    description: "Tech Marines vs. Pirates - Who Will Reign?",
    image:
      "https://media1.tenor.com/m/ZrJ2jtlA7tUAAAAC/nico-robin-one-piece.gif",
    participants: 2,
    color: "9134DB",
    heads: [
      {
        name: "Madhura Shenoy",
        contact: "8904385961",
      },
      {
        name: "Preksha",
        contact: "8431961242",
      },
    ],
    rules: [
      "The quiz will consist of 3 rounds.",
      "RULES OF EACH ROUND WILL BE CONVEYED AT THE TIME OF THE EVENT.",
      "ELECTRONIC GADGETS ARE NOT ALLOWED",
      "THE JUDGES DECISION WILL BE FINAL AND BINDING.",
    ],
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/toaeszhnt5v2w6xhxmhy",
  },
  {
    id: "franky",
    title: "Coding & Debugging",
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
      "Judges decision is final and binding.",
    ],
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/urksqhvj64hb2hjtzule",
  },
  {
    id: "zoro",
    title: "Mini Hackathon",
    themeTitle: "Seraphim",
    description: "Egghead Innovations Await!",
    image: "https://media1.tenor.com/m/kDkGTrLUIlMAAAAd/zoro-anime.gif",
    participants: 2,
    color: "176A1C",
    heads: [
      {
        name: "Shainil P S",
        contact: "9632348984",
      },
      {
        name: "SWASTHIK K",
        contact: "8123837856",
      },
    ],
    rules: [
      // TOPICS & GENERAL GUIDELINES ARE PRESENT HERE :
      // RULESET
      "Time limit: 3 hours (minimum).",
      "Any programming language is allowed.",
      "Participants can develop Websites, Mobile Apps, Tools, or Libraries.",
      "Bring your own laptops and gadgets.",
      "Usage of AI and the Internet is allowed.",
      "Unique Ideas and Innovation are prioritized.",
    ],
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/yxbsrhgn8gayazsr2lpu",
  },
  {
    id: "sanji",
    title: "IT Manager",
    themeTitle: "Agent CP9",
    description: "Be the Luffy of leadership!",
    image: "https://media1.tenor.com/m/0I8FD6kd8y4AAAAC/sanji-sanji-dip.gif",
    participants: 1,
    color: "276DF1",
    heads: [
      {
        name: "ANKUSH VS",
        contact: "8073098053",
      },
      {
        name: "Sudarshan K M",
        contact: "7676045748",
      },
    ],
    rules: [
      "There Will be 3 rounds.",
      "The details of each round will be disclosed on the spot.",
      "Participants should have a  copy of their  updated resume",
    ],
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/npidkskajp8upq1dxogy",
  },
  {
    id: "chopper",
    title: "Surprise Event",
    themeTitle: "Raftel Rush",
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
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/v1742443490/Surprise_Event_1_1_hd73o2.png",
  },
  {
    id: "usopp",
    title: "Gaming [BGMI]",
    themeTitle: "Warlords War",
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
      "Both android and ios devices are allowed.",
    ],
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/Event-Cards/ioin0dzhqcjwn8ugqhzj",
  },
  {
    id: "nami",
    title: "Group Dance",
    themeTitle: "Pirate Grooves",
    description: "Showcase your moves and sync with the rhythm as a team.",
    image:
      "https://media1.tenor.com/m/zGTLZEoesSsAAAAC/nami-nami-one-piece.gif",
    participants: "4-6",
    color: "ED9030",
    heads: [
      {
        name: "Sujan Poojary",
        contact: "9483695423",
      },
      {
        name: "K nisarga",
        contact: "7483835931",
      },
    ],
    rules: [
      "TIME LIMIT IS 4+1 MINUTE.",
      "THEME FOR DANCE IS 'HEARTBEAT'(PORTRAY LOVE,FRIENDSHIP OR HUMAN RELATIONSHIP).",
      "DANCE PERFORMANCE MUST NOT CONTAIN ANY VULGARITY.",
      "PARTICIPANTS MUST CARRY PENDRIVE FOR SONG SUBMISSION.",
      "JUDGES DECISION IS FINAL.",
    ],
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/v1742443600/Fashion_Show_2_1_1_dywoef.png",
  },
  {
    id: "brook",
    title: "Reel Making",
    themeTitle: "Kaizoku Eizō",
    description: "One Frame, One Piece of the Story!",
    image: "https://media1.tenor.com/m/1_E4qnfvZacAAAAd/one-piece-brook.gif",
    participants: 1,
    color: "4F4F4F",
    heads: [
      {
        name: "Arahantha Varma",
        contact: "9606165319",
      },
      {
        name: "Sanchitha",
        contact: "7019661792",
      },
    ],
    rules: [
      "Topic will be given on the spot",
      "Only mobiles are allowed",
      "You can use gimble",
      "judge decision is final decision.",
    ],
    wanted:
      "https://res.cloudinary.com/dvpaztqr9/image/upload/v1742443299/Videography_1_llrbgf.png",
  },
];
