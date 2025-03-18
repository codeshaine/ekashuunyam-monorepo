export type Sponsers = {
    name: string;
    brandName: string;
    location: string;
    priority: SponsersPriority
}

export enum SponsersPriority {
    High = "high",
    Low = "low",
}

export const sponsersData: Sponsers[] = [

    {
        name: 'Shashidhar Shetty',
        location: 'Guruvayanakere',
        brandName: 'Navashakthi Baroda',
        priority: SponsersPriority.High,
    },
    {
        name: 'Jaison Dsouza',
        location: 'Church Road, Belthangady',
        brandName: 'KVL View Hotel',
        priority: SponsersPriority.High,
    },
    {
        name: 'Mohan',
        location: 'Ujire',
        brandName: 'Kanasina Mane',
        priority: SponsersPriority.High,
    },
    {
        name: 'Devi Prasad Shetty',
        location: 'Ujire',
        brandName: 'Lassi Plus',
        priority: SponsersPriority.High,
    },
    {
        name: 'Rajesh Pai',
        location: 'Ujire',
        brandName: 'Sandhya Trades',
        priority: SponsersPriority.High,
    },
    {
        name: 'EV-MLC,Lawyer & Rotary',
        location: 'Belthangady',
        brandName: 'Prathap Simha Nayak',
        priority: SponsersPriority.High,
    },
    {
        name: 'Akshay Rao',
        location: 'Ujire',
        brandName: 'Disha Food Corner',
        priority: SponsersPriority.High,
    },
    {
        name: 'Ravi R M',
        location: 'Ujire',
        brandName: 'Raghavendra Metals',
        priority: SponsersPriority.Low,
    },
    {
        name: 'Vijay Deonha',
        location: 'Guruvayanakere',
        brandName: 'Hotel Rays Inn',
        priority: SponsersPriority.Low,
    },
    {
        name: '',
        location: 'Belthangady',
        brandName: 'Shrungar Jewellers',
        priority: SponsersPriority.Low,
    },
    {
        name: 'Shashidhar Pai',
        location: 'Laila,Ujire',
        brandName: 'Pai Cares',
        priority: SponsersPriority.Low,
    },
    {
        name: '',
        location: 'Ujire',
        brandName: 'Pals Mobile Zone',
        priority: SponsersPriority.Low,
    },
    {
        name: '',
        location: 'Ujire',
        brandName: 'Prabhu Clinic',
        priority: SponsersPriority.Low,
    },
];

export const WhySponsor = [
    {
        title: "Massive Outreach -",
        description: "Engage with hundreds of talented students and professionals.",
    },
    {
        title: "Brand Recognition -",
        description:
            "Get your name hoisted high on all our digital & offline platforms.",
    },
    {
        title: "Exclusive Access -",
        description: "Connect with top-tier talent and future industry leaders.",
    },
    {
        title: "Customization -",
        description: "Tailor your sponsorship to align with your brand goals.",
    },
];