export type Sponsers = {
    name: string;
    category?: string;
    description?: string;
    phone: string;
    website?: string;
    email?: string;
    image: string;
    location: string;
    priority: SponsersPriority
}

export enum SponsersPriority {
    High = "high",
    Low = "low",
}

export const sponsersData: Sponsers[] = [

    {
        name: 'TechnoVision',
        category: 'Electronics',
        description: 'Leading electronics and gadgets store',
        phone: '1234567890',
        website: 'www.technovision.com',
        email: 'info@technovision.com',
        image: '',
        location: 'City Center',
        priority: SponsersPriority.High,
    },
    {
        name: 'Green Mart',
        category: 'Groceries',
        description: 'Fresh groceries and organic products',
        phone: '0987654321',
        website: 'www.greenmart.com',
        email: 'contact@greenmart.com',
        image: '',
        location: 'Main Street',
        priority: SponsersPriority.Low,
    },
    {
        name: 'Alpha Fitness',
        category: 'Fitness',
        description: 'Gym and fitness accessories',
        phone: '9876543210',
        website: 'www.alphafitness.com',
        email: 'support@alphafitness.com',
        image: '',
        location: 'West Park',
        priority: SponsersPriority.High,
    },
    {
        name: 'Bloom Cafe',
        category: 'Food & Beverages',
        description: 'Cozy cafe with fresh coffee and snacks',
        phone: '1231231234',
        website: 'www.bloomcafe.com',
        email: 'hello@bloomcafe.com',
        image: '',
        location: 'Downtown',
        priority: SponsersPriority.Low,
    },
    {
        name: 'Urban Styles',
        category: 'Fashion',
        description: 'Latest fashion trends',
        phone: '3213214321',
        website: 'www.urbanstyles.com',
        email: 'info@urbanstyles.com',
        image: '',
        location: 'City Mall',
        priority: SponsersPriority.Low,
    },
    {
        name: 'QuickFix',
        category: 'Automobile',
        description: 'Car repair and maintenance services',
        phone: '4564564567',
        website: 'www.quickfix.com',
        email: 'service@quickfix.com',
        image: '',
        location: 'Highway Road',
        priority: SponsersPriority.High,
    },
    {
        name: 'EduWorld',
        category: 'Education',
        description: 'Books, stationery, and learning materials',
        phone: '9871234567',
        website: 'www.eduworld.com',
        email: 'info@eduworld.com',
        image: '',
        location: 'Library Lane',
        priority: SponsersPriority.High,
    },
    {
        name: 'HealthFirst',
        category: 'Healthcare',
        description: 'Pharmacy and health products',
        phone: '4561237890',
        website: 'www.healthfirst.com',
        email: 'support@healthfirst.com',
        image: '',
        location: 'Green Valley',
        priority: SponsersPriority.Low,
    },
    {
        name: 'Pixel Studio',
        category: 'Photography',
        description: 'Professional photography services',
        phone: '7894561230',
        website: 'www.pixelstudio.com',
        email: 'contact@pixelstudio.com',
        image: '',
        location: 'Central Avenue',
        priority: SponsersPriority.Low,
    },
    {
        name: 'Pure Bliss',
        category: 'Beauty & Wellness',
        description: 'Spa and beauty treatments',
        phone: '7891234560',
        website: 'www.purebliss.com',
        email: 'support@purebliss.com',
        image: '',
        location: 'East Street',
        priority: SponsersPriority.High,
    },
    {
        name: 'Gadget Hub',
        category: 'Electronics',
        description: 'Smartphones and gadgets',
        phone: '1237894560',
        website: 'www.gadgethub.com',
        email: 'info@gadgethub.com',
        image: '',
        location: 'Tech Park',
        priority: SponsersPriority.High,
    },
    {
        name: 'Eco Wheels',
        category: 'Automobile',
        description: 'Electric bikes and accessories',
        phone: '3216549870',
        website: 'www.ecowheels.com',
        email: 'contact@ecowheels.com',
        image: '',
        location: 'Eco Street',
        priority: SponsersPriority.Low,
    },
    {
        name: 'Silver Spoon',
        category: 'Food & Beverages',
        description: 'Fine dining restaurant',
        phone: '6541237890',
        website: 'www.silverspoon.com',
        email: 'info@silverspoon.com',
        image: '',
        location: 'Luxury Avenue',
        priority: SponsersPriority.High,
    },
    {
        name: 'Blue Lagoon',
        category: 'Travel & Tourism',
        description: 'Travel agency and tour packages',
        phone: '1234567891',
        website: 'www.bluelagoon.com',
        email: 'travel@bluelagoon.com',
        image: '',
        location: 'Coastal Road',
        priority: SponsersPriority.Low,
    }
];

export const WhySponsor = [
    {
      title: "Massive Outreach –",
      description: "Engage with hundreds of talented students and professionals.",
    },
    {
      title: "Brand Recognition –",
      description:
        "Get your name hoisted high on all our digital & offline platforms.",
    },
    {
      title: "Exclusive Access –",
      description: "Connect with top-tier talent and future industry leaders.",
    },
    {
      title: "Customization –",
      description: "Tailor your sponsorship to align with your brand goals.",
    },
  ];