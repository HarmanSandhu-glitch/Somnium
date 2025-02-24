const eventData = [
  {
    eventName: "Tech Innovators Conference",
    eventDate: "2024-11-15",
    eventTime: "09:00 AM",
    eventPrice: 49.99,
    eventLocation: "Silicon Valley Convention Center, CA",
    eventDescription:
      "Join leading innovators and tech enthusiasts for discussions on the latest trends in technology and innovation.",
    eventOrganizer: "TechWorld Inc.",
    eventType: "conference",
    eventImage:
      "https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "AI & Machine Learning Seminar",
    eventDate: "2024-10-10",
    eventTime: "11:00 AM",
    eventPrice: 39.99,
    eventLocation: "Boston Tech Park, MA",
    eventDescription:
      "An insightful seminar focusing on real-world applications of AI and machine learning in various industries.",
    eventOrganizer: "FutureTech Labs",
    eventType: "seminar",
    eventImage:
      "https://images.unsplash.com/photo-1726066012656-45d3ff23eaeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Full-Stack Web Development Workshop",
    eventDate: "2024-12-05",
    eventTime: "10:00 AM",
    eventPrice: 59.99,
    eventLocation: "DevHub, San Francisco, CA",
    eventDescription:
      "A hands-on workshop to learn full-stack web development with modern tools and frameworks.",
    eventOrganizer: "CodeCrafters",
    eventType: "workshop",
    eventImage:
      "https://images.unsplash.com/photo-1726137570589-4461351d1180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Startup Founders Meetup",
    eventDate: "2024-10-25",
    eventTime: "06:00 PM",
    eventPrice: 19.99,
    eventLocation: "The Startup Lounge, NYC",
    eventDescription:
      "Network with startup founders, investors, and entrepreneurs in this casual meetup for collaboration and growth.",
    eventOrganizer: "NYC Startups",
    eventType: "meetup",
    eventImage:
      "https://images.unsplash.com/photo-1726137570589-4461351d1180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Hackathon 2.0: Build the Future",
    eventDate: "2024-11-20",
    eventTime: "08:00 AM",
    eventPrice: 0.0,
    eventLocation: "TechBridge Arena, Austin, TX",
    eventDescription:
      "A 48-hour hackathon where developers, designers, and entrepreneurs come together to solve real-world problems.",
    eventOrganizer: "HackNation",
    eventType: "hackathon",
    eventImage:
      "https://images.unsplash.com/photo-1739796216188-2850dcab1230?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Frontend Frameworks Webinar",
    eventDate: "2024-09-30",
    eventTime: "04:00 PM",
    eventPrice: 14.99,
    eventLocation: "Online (Zoom)",
    eventDescription:
      "Discover the latest frontend frameworks and how to choose the best one for your next project.",
    eventOrganizer: "WebTalks",
    eventType: "webinar",
    eventImage:
      "https://images.unsplash.com/photo-1726137570589-4461351d1180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Global Coding Competition",
    eventDate: "2024-12-15",
    eventTime: "07:00 AM",
    eventPrice: 0.0,
    eventLocation: "Online",
    eventDescription:
      "Compete with coders from around the world in this global coding challenge designed to test your skills.",
    eventOrganizer: "CodeWarriors",
    eventType: "competition",
    eventImage:
      "https://images.unsplash.com/photo-1740257862940-66edfed66a6a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "International Tech Expo 2024",
    eventDate: "2024-10-18",
    eventTime: "10:00 AM",
    eventPrice: 24.99,
    eventLocation: "Las Vegas Convention Center, NV",
    eventDescription:
      "Experience cutting-edge technology, gadgets, and innovations at the largest tech expo of the year.",
    eventOrganizer: "TechGlobal",
    eventType: "expo",
    eventImage:
      "https://images.unsplash.com/photo-1726137570589-4461351d1180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Summer Beats Concert",
    eventDate: "2024-08-30",
    eventTime: "07:00 PM",
    eventPrice: 79.99,
    eventLocation: "Central Park, NYC",
    eventDescription:
      "Enjoy live performances from top artists and bands under the stars at this electrifying summer concert.",
    eventOrganizer: "LiveNation",
    eventType: "concert",
    eventImage:
      "https://images.unsplash.com/photo-1726137570589-4461351d1180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Cultural Festival of Lights",
    eventDate: "2024-11-05",
    eventTime: "05:00 PM",
    eventPrice: 29.99,
    eventLocation: "Riverfront Park, Chicago, IL",
    eventDescription:
      "Celebrate diverse cultures with food, music, and dance in this vibrant festival of lights and colors.",
    eventOrganizer: "CulturalConnect",
    eventType: "festival",
    eventImage:
      "https://images.unsplash.com/photo-1726137570589-4461351d1180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "New Year's Eve Party",
    eventDate: "2024-12-31",
    eventTime: "09:00 PM",
    eventPrice: 99.99,
    eventLocation: "Skyline Rooftop, LA",
    eventDescription:
      "Ring in the New Year with a spectacular rooftop party featuring DJs, drinks, and fireworks.",
    eventOrganizer: "PartyCentral",
    eventType: "party",
    eventImage:
      "https://images.unsplash.com/photo-1739184685124-d51952f4c550?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    eventName: "Charity Football Game",
    eventDate: "2024-10-12",
    eventTime: "03:00 PM",
    eventPrice: 9.99,
    eventLocation: "Greenfield Stadium, Miami, FL",
    eventDescription:
      "Watch your favorite teams compete for a cause at this charity football match, supporting local communities.",
    eventOrganizer: "Sports4All",
    eventType: "game",
    eventImage:
      "https://images.unsplash.com/photo-1726137570589-4461351d1180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default eventData;
