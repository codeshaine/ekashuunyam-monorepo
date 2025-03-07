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
  //registration

  //quiz

  //coding

  //hackathon

  //reel

  //dance

  //it manager

  //gaming

  //surprise event
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
