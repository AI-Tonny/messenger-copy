import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',   // Синій колір активного табу
                tabBarInactiveTintColor: '#8E8E93', // Сірий колір неактивного
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0.5,
                    borderTopColor: '#E5E5EA',
                    height: Platform.OS === 'ios' ? 88 : 64,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Chats',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "chatbubble-sharp" : "chatbubble-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="people"
                options={{
                    title: 'People',
                    tabBarBadge: 2, // Бейджик "2", як на твоєму макеті
                    tabBarBadgeStyle: {
                        backgroundColor: '#34C759', // Зелений колір онлайну
                        color: '#FFFFFF',
                        fontSize: 10,
                        lineHeight: 14,
                        height: 16,
                        minWidth: 16,
                    },
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "people-sharp" : "people-outline"}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="discover"
                options={{
                    title: 'Discover',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "compass-sharp" : "compass-outline"}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}