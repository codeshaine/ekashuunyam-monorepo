export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  REGISTRATION = "REGISTRATION",
  QUIZ = "QUIZ",
  CODING = "CODING",
  HACKATHON = "HACKATHON",
  REEL = "REEL",
  DANCE = "DANCE",
  IT_MANAGER = "IT_MANAGER",
  GAMING = "GAMING",
  SURPIRZE_EVENT = "SURPIRZE_EVENT",
  ERROR = "ERROR",
}

export const allowedMembers = [
  //super admins
  {
    email: "axioznot05@gmail.com",
    role: Role.SUPER_ADMIN,
  },
  {
    email: "swasth319@gmail.com",
    role: Role.SUPER_ADMIN,
  },
  //registration
  {
    email: "karunyaacharya21@gmail.com",
    role: Role.REGISTRATION,
  },
  // {
  //   email: "220932@sdmcujire.in",
  //   role: Role.REGISTRATION,
  // },
  //quiz
  {
    email: "madhurashenoy58@gmail.com",
    role: Role.QUIZ,
  },
  {
    email: "prekshakp7@gmail.com",
    role: Role.QUIZ,
  },

  //coding
  {
    email: "theerthanandagowda@gmail.com",
    role: Role.CODING,
  },
  {
    email: "krishnendhue1777@gmail.com",
    role: Role.CODING,
  },

  //hackathon
  {
    email: "220931@sdmcujire.in",
    role: Role.HACKATHON,
  },
  {
    email: "220981@sdmcujire.in",
    role: Role.HACKATHON,
  },
  //reel
  {
    email: "arahanthavarma4@gmail.com",
    role: Role.REEL,
  },
  {
    email: "sanchithabcgowda@gmail.com",
    role: Role.REEL,
  },

  //dance
  {
    email: "sujanpoojary57@gmail.com",
    role: Role.DANCE,
  },
  {
    email: "nisargak2004@gmail.com",
    role: Role.DANCE,
  },
  //it manager
  {
    email: "kmragusudarshan@gmail.com",
    role: Role.IT_MANAGER,
  },
  {
    email: "aankushvskotian@gmail.com",
    role: Role.IT_MANAGER,
  },

  //gaming
  {
    email: "sagar.doyijode@gmail.com",
    role: Role.GAMING,
  },
  {
    email: "rakeshgavasker13@gmail.com",
    role: Role.GAMING,
  },
  //surprise event
  {
    email: "nubhavya44@gmail.com",
    role: Role.SURPIRZE_EVENT,
  },
  {
    email: "poojithans2004@gmail.com",
    role: Role.SURPIRZE_EVENT,
  },
];

export type EventRole = Exclude<
  Role,
  Role.SUPER_ADMIN | Role.REGISTRATION | Role.ERROR
>;

export const RoleToEvent: Record<EventRole, string> = {
  [Role.CODING]: "codingEvent",
  [Role.DANCE]: "groupDance",
  [Role.GAMING]: "gamingEvent",
  [Role.HACKATHON]: "miniHackathon",
  [Role.IT_MANAGER]: "itManager",
  [Role.QUIZ]: "quiz",
  [Role.REEL]: "reels",
  [Role.SURPIRZE_EVENT]: "surpriseEvent",
};
