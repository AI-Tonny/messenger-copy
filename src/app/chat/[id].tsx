import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { mockChats, MessageMock } from '../../mocks/mockData';

import { Avatar } from '../../components/ui/Avatar';
import { ChatIntro } from '../../components/chat/ChatIntro';
import { MessageBubble } from '../../components/chat/MessageBubble';
import { ChatInput } from '../../components/chat/ChatInput';

export default function ChatScreen() {
    const router = useRouter();
    const { id, userName, userAvatar } = useLocalSearchParams();

    const currentChat = mockChats.find((c) => c.id === id);

    const [messages, setMessages] = useState<MessageMock[]>(currentChat?.messages || []);

    const flatListRef = useRef<FlatList>(null);

    const handleSendMessage = (text: string) => {
        const newMessage: MessageMock = {
            id: Date.now().toString(),
            text: text,
            senderId: 'current_user',
            timestamp: 'Just now',
            status: 'sent',
        };

        setMessages((prev) => [...prev, newMessage]);

        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    const handleSendLike = () => {
        const newLikeMessage: MessageMock = {
            id: Date.now().toString(),
            text: '👍',
            senderId: 'current_user',
            timestamp: 'Just now',
            status: 'sent',
        };

        setMessages((prev) => [...prev, newLikeMessage]);
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="#007AFF" />
                    </TouchableOpacity>

                    <Avatar url={(userAvatar as string) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'} size={36} isOnline={true} />

                    <View style={styles.headerInfo}>
                        <Text style={styles.userName} numberOfLines={1}>{userName || 'User'}</Text>
                        <Text style={styles.userStatus}>Active now</Text>
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon}><Ionicons name="call" size={22} color="#007AFF" /></TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}><Ionicons name="videocam" size={22} color="#007AFF" /></TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}><Ionicons name="information-circle" size={24} color="#007AFF" /></TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                style={styles.chatContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => (
                        <ChatIntro
                            name={(userName as string) || 'User'}
                            avatarUrl={(userAvatar as string) || ''}
                            onWavePress={handleSendLike}
                        />
                    )}
                    renderItem={({ item, index }) => {
                        const isMe = item.senderId === 'current_user';
                        const isLastMessage = index === messages.length - 1;

                        const nextMessage = messages[index + 1];
                        const showAvatar = !isMe && (!nextMessage || nextMessage.senderId === 'current_user');

                        return (
                            <MessageBubble
                                message={item}
                                isMe={isMe}
                                userAvatar={(userAvatar as string) || ''}
                                showAvatar={showAvatar}
                                isLastMessage={isLastMessage}
                            />
                        );
                    }}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                />

                <ChatInput onSendMessage={handleSendMessage} onSendLike={handleSendLike} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
        backgroundColor: '#FFFFFF',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    backButton: {
        padding: 4,
        marginRight: 4,
    },
    headerInfo: {
        marginLeft: 10,
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    userStatus: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        padding: 8,
        marginLeft: 4,
    },
    chatContainer: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 16,
    },
});