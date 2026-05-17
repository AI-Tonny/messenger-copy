export interface MessageMock {
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
    status: 'sent' | 'read';
    image?: string;
}

export interface ChatMock {
    id: string;
    user: {
        name: string;
        avatar: string;
        isOnline: boolean;
        status?: string;
        statusText?: string;
    };
    lastMessage: {
        text: string;
        senderId: string;
        timestamp: string;
    };
    unreadCount: number;
    messages: MessageMock[];
}

export interface DiscoverItemMock {
    id: string;
    title: string;
    category: string;
    description: string;
    avatar: string;
    isRecent?: boolean;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';

export const mockChats: ChatMock[] = [
    {
        id: '1',
        user: {
            name: 'Martha Craig',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
            isOnline: true,
            statusText: 'Active now',
        },
        lastMessage: {
            text: 'Do you like it?',
            senderId: '1',
            timestamp: '11:40 AM',
        },
        unreadCount: 0,
        messages: [
            {
                id: 'm1',
                text: 'Hello, Jacob!',
                senderId: '1',
                timestamp: '16:44',
                status: 'read',
            },
            {
                id: 'm2',
                text: 'How are you doing?',
                senderId: '1',
                timestamp: '16:44',
                status: 'read',
            },
            {
                id: 'm3',
                text: "It's morning in Tokyo 😎",
                senderId: 'current_user',
                timestamp: '21:32',
                status: 'read',
            },
            {
                id: 'm4',
                text: 'What is the most popular meal in Japan?',
                senderId: '1',
                timestamp: '11:40',
                status: 'read',
            },
            {
                id: 'm5',
                text: 'Do you like it?',
                senderId: '1',
                timestamp: '11:40',
                status: 'read',
            },
            {
                id: 'm6',
                text: 'I think top two are:',
                senderId: 'current_user',
                timestamp: '11:42',
                status: 'read',
            },
            {
                id: 'm7',
                text: 'Sushi and Ramen!',
                senderId: 'current_user',
                timestamp: '11:42',
                status: 'read',
                image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
            },
        ],
    },
    {
        id: '2',
        user: {
            name: 'Martin Randolph',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            isOnline: true,
        },
        lastMessage: {
            text: "You: What's man! ",
            senderId: 'current_user',
            timestamp: '9:40 AM',
        },
        unreadCount: 0,
        messages: [
            {
                id: 'mr1',
                text: 'Hey dude, what are you up to?',
                senderId: '2',
                timestamp: '9:35 AM',
                status: 'read',
            },
            {
                id: 'mr2',
                text: "What's man!",
                senderId: 'current_user',
                timestamp: '9:40 AM',
                status: 'read',
            },
        ],
    },
    {
        id: '3',
        user: {
            name: 'Andrew Parker',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
            isOnline: false,
            statusText: '2h ago',
        },
        lastMessage: {
            text: 'You: Ok, thanks! ',
            senderId: 'current_user',
            timestamp: '9:25 AM',
        },
        unreadCount: 0,
        messages: [
            {
                id: 'ap1',
                text: 'I sent you the project files.',
                senderId: '3',
                timestamp: '9:20 AM',
                status: 'read',
            },
            {
                id: 'ap2',
                text: 'Ok, thanks!',
                senderId: 'current_user',
                timestamp: '9:25 AM',
                status: 'read',
            },
        ],
    },
    {
        id: '4',
        user: {
            name: 'Karen Castillo',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
            isOnline: true,
        },
        lastMessage: {
            text: 'You: Ok, See you in To... ',
            senderId: 'current_user',
            timestamp: 'Fri',
        },
        unreadCount: 0,
        messages: [],
    },
    {
        id: '5',
        user: {
            name: 'Maisy Humphrey',
            avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200',
            isOnline: false,
            statusText: '1d ago',
        },
        lastMessage: {
            text: 'Have a good day, Maisy! ',
            senderId: '5',
            timestamp: 'Fri',
        },
        unreadCount: 1,
        messages: [
            {
                id: 'mh1',
                text: 'Have a good day, Maisy!',
                senderId: '5',
                timestamp: 'Fri',
                status: 'sent',
            },
        ],
    },
    {
        id: '6',
        user: {
            name: 'Kieron Dotson',
            avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200',
            isOnline: false,
            statusText: '8 min.',
        },
        lastMessage: {
            text: 'The business plan loo... ',
            senderId: '6',
            timestamp: 'Thu',
        },
        unreadCount: 0,
        messages: [],
    },
];

export const mockDiscoverItems: DiscoverItemMock[] = [
    {
        id: 'd1',
        title: 'Apple',
        category: 'Science, Technology & Engineering',
        description: 'Think different.',
        avatar: 'https://logo.clearbit.com/apple.com',
        isRecent: true,
    },
    {
        id: 'd2',
        title: 'Samsung',
        category: 'Technology',
        description: 'Imagine the possibilities.',
        avatar: 'https://logo.clearbit.com/samsung.com',
        isRecent: true,
    },
    {
        id: 'd3',
        title: 'Airbnb',
        category: 'Travel & Lodging',
        description: 'Belong anywhere.',
        avatar: 'https://logo.clearbit.com/airbnb.com',
        isRecent: true,
    },
    {
        id: 'd4',
        title: 'Microsoft',
        category: 'Science, Technology & Engineering',
        description: 'Our mission is to empower every person...',
        avatar: 'https://logo.clearbit.com/microsoft.com',
        isRecent: false,
    },
    {
        id: 'd5',
        title: 'Instagram',
        category: 'Business',
        description: 'Bringing you closer to the people and thi...',
        avatar: 'https://logo.clearbit.com/instagram.com',
        isRecent: false,
    },
    {
        id: 'd6',
        title: 'Disney',
        category: 'Brand',
        description: 'Disney magic right at your fingertips',
        avatar: 'https://logo.clearbit.com/disney.com',
        isRecent: false,
    },
    {
        id: 'd7',
        title: 'Facebook',
        category: 'Website',
        description: 'Welcome to the Facebook chat bot. Use i...',
        avatar: 'https://logo.clearbit.com/facebook.com',
        isRecent: false,
    },
    {
        id: 'd8',
        title: "McDonald's",
        category: 'Burger Restaurant',
        description: "I'm lovin' it",
        avatar: 'https://logo.clearbit.com/mcdonalds.com',
        isRecent: false,
    },
];