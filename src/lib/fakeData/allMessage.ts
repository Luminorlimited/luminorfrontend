export interface Conversation {
  conversationId: number;
  participants: {
    sender: string;
    receiver: string;
  };
  messages: Message[];
}

export interface Message {
  id: number;
  content: string;
  sender: "sender" | "receiver";
  timestamp: Date;
}

export const conversations: Conversation[] = [
  {
    conversationId: 1,
    participants: {
      sender: "John Doe",
      receiver: "Shahed",
    },
    messages: [
      {
        id: 1,
        content: "Hi, I need help with my car.",
        sender: "sender",
        timestamp: new Date("2024-10-25T08:00:00"),
      },
      {
        id: 2,
        content: "Sure, what seems to be the problem?",
        sender: "receiver",
        timestamp: new Date("2024-10-25T08:01:00"),
      },
      {
        id: 3,
        content: "Sure, what seems to be the problem?",
        sender: "receiver",
        timestamp: new Date("2024-10-25T08:01:00"),
      },
      {
        id: 4,
        content: "Sure, what seems to be the problem?",
        sender: "receiver",
        timestamp: new Date("2024-10-25T08:01:00"),
      },
      {
        id: 4,
        content: "Sure, what seems to be the problem?",
        sender: "receiver",
        timestamp: new Date("2024-10-25T08:01:00"),
      },
      {
        id: 4,
        content: "Sure, what seems to be the problem?",
        sender: "receiver",
        timestamp: new Date("2024-10-25T08:01:00"),
      },
      {
        id: 4,
        content: "Sure, what seems to be the problem?",
        sender: "receiver",
        timestamp: new Date("2024-10-25T08:01:00"),
      },
      {
        id: 4,
        content: "Sure, what seems to be the problem?",
        sender: "receiver",
        timestamp: new Date("2024-10-25T08:01:00"),
      },
    ],
  },
  {
    conversationId: 2,
    participants: {
      sender: "Jane Smith",
      receiver: "Quick Repair Services",
    },
    messages: [
      {
        id: 1,
        content: "Hello, my tire is flat.",
        sender: "sender",
        timestamp: new Date("2024-10-25T09:00:00"),
      },
      {
        id: 2,
        content: "We can fix that. Bring it in.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T09:02:00"),
      },
    ],
  },
  {
    conversationId: 3,
    participants: {
      sender: "Alice Brown",
      receiver: "Super Auto Repairs",
    },
    messages: [
      {
        id: 1,
        content: "My engine is making noise.",
        sender: "sender",
        timestamp: new Date("2024-10-25T10:00:00"),
      },
      {
        id: 2,
        content: "Bring it to our shop for an inspection.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T10:05:00"),
      },
    ],
  },
  {
    conversationId: 4,
    participants: {
      sender: "Mike Johnson",
      receiver: "Auto Fix Mechanics",
    },
    messages: [
      {
        id: 1,
        content: "Can I get a price quote for engine repair?",
        sender: "sender",
        timestamp: new Date("2024-10-25T11:00:00"),
      },
      {
        id: 2,
        content: "Sure, let me check your car details.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T11:05:00"),
      },
    ],
  },
  {
    conversationId: 5,
    participants: {
      sender: "Sara White",
      receiver: "Quick Tune Garage",
    },
    messages: [
      {
        id: 1,
        content: "Do you have availability today for a tire change?",
        sender: "sender",
        timestamp: new Date("2024-10-25T12:00:00"),
      },
      {
        id: 2,
        content: "Yes, we have an open slot at 3 PM.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T12:05:00"),
      },
    ],
  },
  {
    conversationId: 6,
    participants: {
      sender: "Tom Wilson",
      receiver: "Fix My Car Garage",
    },
    messages: [
      {
        id: 1,
        content: "How much for a brake inspection?",
        sender: "sender",
        timestamp: new Date("2024-10-25T13:00:00"),
      },
      {
        id: 2,
        content: "It will cost around $50.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T13:10:00"),
      },
    ],
  },
  {
    conversationId: 7,
    participants: {
      sender: "Nancy Brown",
      receiver: "Total Car Care",
    },
    messages: [
      {
        id: 1,
        content: "Is there a discount for new customers?",
        sender: "sender",
        timestamp: new Date("2024-10-25T14:00:00"),
      },
      {
        id: 2,
        content: "Yes, you can get 10% off on your first service.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T14:05:00"),
      },
    ],
  },
  {
    conversationId: 8,
    participants: {
      sender: "Adam Green",
      receiver: "Auto Experts Garage",
    },
    messages: [
      {
        id: 1,
        content: "I need to replace my car’s AC compressor.",
        sender: "sender",
        timestamp: new Date("2024-10-25T15:00:00"),
      },
      {
        id: 2,
        content: "We can handle that. Bring your car in.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T15:10:00"),
      },
    ],
  },
  {
    conversationId: 9,
    participants: {
      sender: "Laura Black",
      receiver: "Professional Auto Garage",
    },
    messages: [
      {
        id: 1,
        content: "My car’s check engine light is on.",
        sender: "sender",
        timestamp: new Date("2024-10-25T16:00:00"),
      },
      {
        id: 2,
        content: "We will diagnose it for you. Come by anytime today.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T16:10:00"),
      },
    ],
  },
  {
    conversationId: 10,
    participants: {
      sender: "Daniel Adams",
      receiver: "Auto Pro Mechanics",
    },
    messages: [
      {
        id: 1,
        content: "Do you do wheel alignment?",
        sender: "sender",
        timestamp: new Date("2024-10-25T17:00:00"),
      },
      {
        id: 2,
        content: "Yes, we do. It costs $80 for a full alignment.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T17:10:00"),
      },
    ],
  },
  {
    conversationId: 11,
    participants: {
      sender: "Megan Turner",
      receiver: "Speedy Auto Service",
    },
    messages: [
      {
        id: 1,
        content: "Can you fix an oil leak?",
        sender: "sender",
        timestamp: new Date("2024-10-25T18:00:00"),
      },
      {
        id: 2,
        content: "Yes, we can take care of that for you.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T18:10:00"),
      },
    ],
  },
  {
    conversationId: 12,
    participants: {
      sender: "Chris Lee",
      receiver: "Master Auto Repair",
    },
    messages: [
      {
        id: 1,
        content: "I need to schedule a transmission fluid change.",
        sender: "sender",
        timestamp: new Date("2024-10-25T19:00:00"),
      },
      {
        id: 2,
        content: "We can schedule it for you tomorrow at 10 AM.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T19:05:00"),
      },
    ],
  },
  {
    conversationId: 13,
    participants: {
      sender: "Olivia Wright",
      receiver: "Fix-It Garage",
    },
    messages: [
      {
        id: 1,
        content: "Do you offer towing services?",
        sender: "sender",
        timestamp: new Date("2024-10-25T20:00:00"),
      },
      {
        id: 2,
        content: "Yes, we do. Our towing service is available 24/7.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T20:05:00"),
      },
    ],
  },
  {
    conversationId: 14,
    participants: {
      sender: "Ben Taylor",
      receiver: "Auto Repair Experts",
    },
    messages: [
      {
        id: 1,
        content: "Can I bring my car for a full inspection tomorrow?",
        sender: "sender",
        timestamp: new Date("2024-10-25T21:00:00"),
      },
      {
        id: 2,
        content: "Yes, we are available in the afternoon.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T21:10:00"),
      },
    ],
  },
  {
    conversationId: 15,
    participants: {
      sender: "Sophia Harris",
      receiver: "Reliable Auto Repair",
    },
    messages: [
      {
        id: 1,
        content: "I need new brake pads. Can you install them?",
        sender: "sender",
        timestamp: new Date("2024-10-25T22:00:00"),
      },
      {
        id: 2,
        content: "Yes, bring your car in anytime this week.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T22:10:00"),
      },
    ],
  },
  {
    conversationId: 16,
    participants: {
      sender: "Ethan Morgan",
      receiver: "The Auto Shop",
    },
    messages: [
      {
        id: 1,
        content: "Do you sell used tires?",
        sender: "sender",
        timestamp: new Date("2024-10-25T23:00:00"),
      },
      {
        id: 2,
        content: "Yes, we have used tires in good condition.",
        sender: "receiver",
        timestamp: new Date("2024-10-25T23:05:00"),
      },
    ],
  },
];
