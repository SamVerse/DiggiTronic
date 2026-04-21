export interface ServiceOffering {
  icon: string;
  title: string;
  desc: string;
}

export interface UseCase {
  title: string;
  desc: string;
  gradient: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  visualKey: "video" | "social" | "dev" | "marketing" | "seo" | "ai" | "graphics";
  overview: {
    headline: string;
    body: string;
    highlight: string;
  };
  offerings: ServiceOffering[];
  useCases: UseCase[];
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const SERVICES: ServiceData[] = [
  {
    slug: "video-production",
    title: "Video Production",
    tagline: "Stories that move audiences.",
    description:
      "We craft cinematic video content that stops the scroll, builds brand authority, and drives real engagement. From concept to final cut.",
    visualKey: "video",
    overview: {
      headline: "Content that earns attention in a world that's learned to ignore it.",
      body: "Video is no longer optional — it's the dominant medium for brand communication. We produce everything from brand films and explainer animations to social-first content, combining cinematic quality with strategic storytelling that converts viewers into customers.",
      highlight:
        "Every frame is intentional. Every second is earned. We don't just make videos — we craft visual stories that people actually watch.",
    },
    offerings: [
      { icon: "Film", title: "2D Animation", desc: "Flat and motion graphic animations that simplify complex ideas." },
      { icon: "Box", title: "3D Animation", desc: "Photorealistic 3D visuals for products, spaces, and brand worlds." },
      { icon: "Wand2", title: "Motion Graphics", desc: "Dynamic title sequences, kinetic text, and brand motion systems." },
      { icon: "Sparkles", title: "Logo Animation", desc: "Animated logo reveals that make your brand impossible to forget." },
    ],
    useCases: [
      {
        title: "Brand Commercials",
        desc: "Cinematic brand films that define your identity and drive emotional connection.",
        gradient: "linear-gradient(135deg, rgba(50,110,255,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Social Media Videos",
        desc: "Scroll-stopping short-form content engineered for reels, TikTok, and stories.",
        gradient: "linear-gradient(135deg, rgba(50,220,100,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Explainer Videos",
        desc: "Clear, compelling animations that communicate complex products in under 90 seconds.",
        gradient: "linear-gradient(135deg, rgba(160,50,220,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Product Launch Campaigns",
        desc: "Multi-format launch content that builds hype before day one and converts after.",
        gradient: "linear-gradient(135deg, rgba(0,160,180,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
    ],
    stat1: { value: 150, suffix: "+", label: "Videos Produced" },
    stat2: { value: 98, suffix: "%", label: "Client Satisfaction" },
    stat3: { value: 40, suffix: "+", label: "Brands Served" },
    testimonial: {
      quote: "DiggiTronic transformed our brand story into a visual masterpiece. Our video content now gets 3x the engagement it used to.",
      author: "Arjun Mehta",
      role: "Marketing Director",
    },
  },

  {
    slug: "social-media",
    title: "Social Media",
    tagline: "Content that creates community.",
    description:
      "We build social presences that grow audiences, spark conversations, and convert followers into loyal brand advocates.",
    visualKey: "social",
    overview: {
      headline: "Your audience is on social. The question is whether they're noticing you.",
      body: "Social media is a battlefield for attention. We help brands cut through the noise with platform-native strategies, scroll-stopping content, and community management that turns casual followers into committed fans. From Instagram to LinkedIn, we own the feed.",
      highlight:
        "We don't post to fill a calendar. We post with purpose — every piece of content is part of a larger strategy built to grow your brand.",
    },
    offerings: [
      { icon: "Megaphone", title: "Social Media Marketing", desc: "End-to-end social strategy, content creation, and community management." },
      { icon: "TrendingUp", title: "Social Media Optimisation", desc: "Profile audits, bio optimisation, and algorithmic tuning for maximum reach." },
    ],
    useCases: [
      {
        title: "Brand Growth Campaigns",
        desc: "Strategic follower acquisition campaigns that build real, engaged audiences.",
        gradient: "linear-gradient(135deg, rgba(50,110,255,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Influencer Collaboration",
        desc: "Identifying and partnering with niche influencers to amplify your brand reach.",
        gradient: "linear-gradient(135deg, rgba(50,220,100,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Community Building",
        desc: "Building active community ecosystems around your brand that keep audiences returning.",
        gradient: "linear-gradient(135deg, rgba(160,50,220,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Viral Campaigns",
        desc: "Architecting shareable moments designed to spread organically across platforms.",
        gradient: "linear-gradient(135deg, rgba(0,160,180,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
    ],
    stat1: { value: 5, suffix: "M+", label: "Impressions Generated" },
    stat2: { value: 40, suffix: "+", label: "Brands Managed" },
    stat3: { value: 3, suffix: "x", label: "Avg Engagement Lift" },
    testimonial: {
      quote: "Our Instagram went from 2k to 28k followers in 4 months. The content quality and strategy from DiggiTronic is unmatched.",
      author: "Sara Al-Rashidi",
      role: "Brand Manager",
    },
  },

  {
    slug: "development",
    title: "Development",
    tagline: "Engineered to perform.",
    description:
      "We build digital products that are fast, scalable, and beautiful — from handcrafted websites to full-stack web applications.",
    visualKey: "dev",
    overview: {
      headline: "Your digital presence is your most important salesperson.",
      body: "In a world where users judge brands in milliseconds, performance and aesthetics aren't optional — they're competitive advantages. We design and develop digital experiences that load fast, feel premium, and convert. Every project is built on modern tech with accessibility, SEO, and scalability at the core.",
      highlight:
        "We don't use templates. Every line of code and pixel of design is crafted for your brand's unique goals and audience.",
    },
    offerings: [
      { icon: "Code", title: "Website Development", desc: "Custom websites built on Next.js and modern stacks — fast, beautiful, and conversion-optimised." },
      { icon: "Layout", title: "UI/UX Design", desc: "User-centered design systems and high-fidelity prototypes that guide seamless experiences." },
      { icon: "Smartphone", title: "App Development", desc: "Cross-platform mobile applications with intuitive interfaces and robust backends." },
      { icon: "Gamepad2", title: "Game Development", desc: "Browser and mobile games with immersive mechanics built for engagement and retention." },
    ],
    useCases: [
      {
        title: "SaaS Platforms",
        desc: "Full-stack product development for B2B and B2C SaaS with complex user flows.",
        gradient: "linear-gradient(135deg, rgba(50,110,255,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "E-commerce",
        desc: "High-performance online stores that prioritise load speed, UX, and conversion rate.",
        gradient: "linear-gradient(135deg, rgba(50,220,100,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Landing Pages",
        desc: "Campaign-specific landing pages built to convert traffic into qualified leads.",
        gradient: "linear-gradient(135deg, rgba(160,50,220,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Mobile Applications",
        desc: "iOS and Android apps with native-quality experiences built on React Native.",
        gradient: "linear-gradient(135deg, rgba(0,160,180,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
    ],
    stat1: { value: 80, suffix: "+", label: "Products Launched" },
    stat2: { value: 99, suffix: "%", label: "Uptime (Avg)" },
    stat3: { value: 40, suffix: "+", label: "Happy Clients" },
    testimonial: {
      quote: "The website DiggiTronic built for us increased our demo bookings by 60% in the first month. Exceptional work.",
      author: "Liam Chen",
      role: "Founder, TechStartup",
    },
  },

  {
    slug: "marketing",
    title: "Marketing",
    tagline: "Campaigns built to convert.",
    description:
      "We run data-driven marketing campaigns across every channel — paid, organic, influencer, and email — to acquire, convert, and retain customers.",
    visualKey: "marketing",
    overview: {
      headline: "Marketing that pays for itself — and then some.",
      body: "Generic campaigns produce mediocre results. We build marketing strategies grounded in data, psychology, and creative excellence. Every campaign we run is obsessively tracked, continuously optimised, and built with clear ROI objectives. Whether you need leads, sales, or awareness, we have the playbook.",
      highlight:
        "We don't set campaigns and forget. We monitor, iterate, and scale what's working — every single day.",
    },
    offerings: [
      { icon: "MousePointer", title: "Paid Advertising", desc: "Google, Meta, and platform-native ad campaigns optimised for maximum ROAS." },
      { icon: "Users", title: "Influencer Marketing", desc: "End-to-end influencer partnerships from identification to performance tracking." },
      { icon: "Handshake", title: "Affiliate Marketing", desc: "Scalable affiliate programs that turn partners into your best growth channel." },
      { icon: "Mail", title: "Email Marketing", desc: "Automated email sequences and newsletters that nurture leads and drive repeat revenue." },
    ],
    useCases: [
      {
        title: "Lead Generation",
        desc: "Multi-channel campaigns designed to fill your pipeline with qualified, ready-to-buy prospects.",
        gradient: "linear-gradient(135deg, rgba(50,110,255,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Product Launches",
        desc: "Full-funnel launch campaigns that generate pre-launch buzz and day-one conversions.",
        gradient: "linear-gradient(135deg, rgba(50,220,100,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Brand Awareness",
        desc: "Top-of-funnel campaigns that build recognition and position you as a category leader.",
        gradient: "linear-gradient(135deg, rgba(160,50,220,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Customer Retention",
        desc: "Lifecycle campaigns, loyalty programs, and win-back sequences that maximise LTV.",
        gradient: "linear-gradient(135deg, rgba(0,160,180,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
    ],
    stat1: { value: 4, suffix: "x", label: "Avg ROAS Delivered" },
    stat2: { value: 60, suffix: "+", label: "Campaigns Run" },
    stat3: { value: 98, suffix: "%", label: "Client Retention" },
    testimonial: {
      quote: "Our paid campaigns with DiggiTronic delivered a 4.2x ROAS in the first quarter. They genuinely understand performance marketing.",
      author: "Nour Khalid",
      role: "CMO, E-commerce Brand",
    },
  },

  {
    slug: "seo",
    title: "SEO",
    tagline: "Visibility that compounds.",
    description:
      "We engineer organic visibility for ambitious brands — combining technical precision, content intelligence, and authority building to dominate search rankings.",
    visualKey: "seo",
    overview: {
      headline: "The best marketing you can invest in is ranking #1 when it matters.",
      body: "Search is intent-based — users who find you through organic search are already looking for what you offer. We build SEO strategies that improve rankings, drive qualified traffic, and compound over time. From deep technical audits to content programs, we own your search presence end-to-end.",
      highlight:
        "SEO is a long game, and we play it seriously. We don't chase hacks — we build authority that lasts.",
    },
    offerings: [
      { icon: "Trophy", title: "Website Ranking", desc: "Keyword research, on-page optimisation, and authority building to rank for high-intent terms." },
      { icon: "Hash", title: "Social Ranking", desc: "Platform-specific optimisation to rank content on YouTube, Pinterest, and social search." },
      { icon: "Search", title: "SEO Audit", desc: "Complete technical, on-page, and off-page analysis with a detailed remediation roadmap." },
    ],
    useCases: [
      {
        title: "E-commerce Growth",
        desc: "Category and product page optimisation to capture bottom-of-funnel search traffic.",
        gradient: "linear-gradient(135deg, rgba(50,110,255,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Local SEO",
        desc: "Dominate local search results and Google Maps for your service area.",
        gradient: "linear-gradient(135deg, rgba(50,220,100,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Content Authority",
        desc: "Topical authority programs that position your brand as the go-to resource in your niche.",
        gradient: "linear-gradient(135deg, rgba(160,50,220,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Technical Overhaul",
        desc: "Core Web Vitals, crawlability fixes, and site architecture improvements.",
        gradient: "linear-gradient(135deg, rgba(0,160,180,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
    ],
    stat1: { value: 300, suffix: "%", label: "Avg Organic Traffic Lift" },
    stat2: { value: 50, suffix: "+", label: "Sites Optimised" },
    stat3: { value: 12, suffix: "mo", label: "Avg Time to Rank #1" },
    testimonial: {
      quote: "We went from page 4 to position 1 for our main keyword in under 6 months. DiggiTronic's SEO team is the real deal.",
      author: "Priya Sharma",
      role: "Founder, HealthBrand",
    },
  },

  {
    slug: "ai-services",
    title: "AI Services",
    tagline: "Intelligence, automated.",
    description:
      "We build and deploy AI-powered solutions that scale your content, automate workflows, and create experiences that feel like the future.",
    visualKey: "ai",
    overview: {
      headline: "AI isn't replacing creativity — it's amplifying the brands smart enough to use it.",
      body: "From AI video generation to custom language models, we help brands harness the power of artificial intelligence to do more with less. Whether you're scaling content production, localising for global markets, or building intelligent products, we deploy AI solutions that are practical, powerful, and production-ready.",
      highlight:
        "We don't experiment with AI for the sake of it. Every implementation is chosen because it solves a real business problem, faster and at scale.",
    },
    offerings: [
      { icon: "Video", title: "AI Video Generation", desc: "Scalable video content at a fraction of traditional production time and cost." },
      { icon: "Languages", title: "AI Translation", desc: "Localise your content for global markets with AI-powered, culturally-aware translation." },
      { icon: "Mic", title: "AI Voice Over", desc: "Natural-sounding AI voice overs in multiple languages for any content format." },
      { icon: "Brain", title: "Custom AI Models", desc: "Fine-tuned AI models trained on your brand data for unique, on-brand outputs." },
    ],
    useCases: [
      {
        title: "Content Scaling",
        desc: "Produce 10x more content at the same quality using AI-assisted creation pipelines.",
        gradient: "linear-gradient(135deg, rgba(50,110,255,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Global Localisation",
        desc: "Translate and adapt your content for international markets with AI speed and precision.",
        gradient: "linear-gradient(135deg, rgba(50,220,100,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Brand Voice AI",
        desc: "Custom AI models fine-tuned to write, speak, and create in your unique brand voice.",
        gradient: "linear-gradient(135deg, rgba(160,50,220,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Workflow Automation",
        desc: "End-to-end AI automation for content review, distribution, and performance reporting.",
        gradient: "linear-gradient(135deg, rgba(0,160,180,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
    ],
    stat1: { value: 10, suffix: "x", label: "Content Output Increase" },
    stat2: { value: 70, suffix: "%", label: "Cost Reduction (Avg)" },
    stat3: { value: 30, suffix: "+", label: "AI Projects Deployed" },
    testimonial: {
      quote: "We produce 10x more content now with AI pipelines DiggiTronic built. It's completely changed how we operate.",
      author: "Omar Al-Farsi",
      role: "Head of Content",
    },
  },

  {
    slug: "graphics-animation",
    title: "Graphics & Animation",
    tagline: "Visual identity that commands attention.",
    description:
      "We design visual systems, brand identities, and animated assets that elevate every touchpoint of your brand — from logo to interface.",
    visualKey: "graphics",
    overview: {
      headline: "Great design is the silent salesperson working around the clock for your brand.",
      body: "Your visual identity is often the first impression your brand makes. We craft design systems that are distinctive, consistent, and built to scale — from brand identity and logo design to social media assets and UI/UX interfaces. Every pixel is intentional, every composition purposeful.",
      highlight:
        "We design brands that people recognise in a thumbnail, trust at first glance, and remember long after the scroll.",
    },
    offerings: [
      { icon: "Palette", title: "Brand Identity", desc: "Complete visual identity systems: logo, colours, typography, and brand guidelines." },
      { icon: "Image", title: "Social Media Graphics", desc: "Scroll-stopping social templates, post designs, and animated story assets." },
      { icon: "Monitor", title: "Website Design", desc: "High-fidelity UI/UX designs for websites that convert, delight, and perform." },
      { icon: "Smartphone", title: "App Design", desc: "Mobile app interfaces designed for intuitive user experience and visual excellence." },
      { icon: "Brush", title: "Logo Design", desc: "Iconic, versatile logos that capture your brand essence and stand the test of time." },
      { icon: "PieChart", title: "Infographics", desc: "Data-driven visual storytelling that makes complex information beautiful and shareable." },
    ],
    useCases: [
      {
        title: "Brand Launches",
        desc: "Complete brand identity development for new businesses and rebrands.",
        gradient: "linear-gradient(135deg, rgba(50,110,255,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Marketing Campaigns",
        desc: "Campaign-specific visual systems across print, digital, and social channels.",
        gradient: "linear-gradient(135deg, rgba(50,220,100,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "App Interfaces",
        desc: "Beautiful, functional app UIs designed from wireframe to polished prototype.",
        gradient: "linear-gradient(135deg, rgba(160,50,220,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
      {
        title: "Print Collateral",
        desc: "Business cards, brochures, banners, and packaging that carry your brand into the physical world.",
        gradient: "linear-gradient(135deg, rgba(0,160,180,0.15) 0%, rgba(0,21,36,0.85) 100%)",
      },
    ],
    stat1: { value: 200, suffix: "+", label: "Brands Designed" },
    stat2: { value: 98, suffix: "%", label: "Client Satisfaction" },
    stat3: { value: 5, suffix: "+", label: "Years of Craft" },
    testimonial: {
      quote: "Our rebrand by DiggiTronic completely transformed how customers perceive us. The attention to detail is extraordinary.",
      author: "Fatima Zahra",
      role: "CEO, Fashion Brand",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
