import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from './Avatar';
import { ChatMock } from '../../mocks/mockData';

interface ChatItemProps {
    chat: ChatMock;
    onPress?: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, onPress }) => {
    const { user, lastMessage, unreadCount } = chat;

    const renderStatus = () => {
        if (unreadCount > 0) {
            return <View style={styles.unreadBadge} />;
        }

        if (lastMessage.senderId === 'current_user') {
            if (lastMessage.status === 'read') {
                return <Image source={{ uri: user.avatar }} style={styles.miniAvatar} />;
            }
            if (lastMessage.status === 'delivered') {
                return <Ionicons name="checkmark-circle" size={16} color="#8E8E93" />;
            }
            return <Ionicons name="checkmark-circle-outline" size={16} color="#8E8E93" />;
        }

        return null;
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            <Avatar url={user.avatar} size={60} isOnline={user.isOnline} />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={[styles.name, unreadCount > 0 ? styles.unreadText : null]} numberOfLines={1}>
                        {user.name}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.message, unreadCount > 0 ? styles.unreadMessage : null]} numberOfLines={1}>
                        {lastMessage.text}  ·  {lastMessage.timestamp}
                    </Text>
                </View>
            </View>

            <View style={styles.statusContainer}>
                {renderStatus()}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Виправлено з 'between' на 'space-between'
    },
    name: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000000',
        marginBottom: 3,
    },
    unreadText: {
        fontWeight: '700',
    },
    message: {
        fontSize: 14,
        color: '#8E8E93',
    },
    unreadMessage: {
        color: '#000000',
        fontWeight: '600',
    },
    statusContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
    },
    unreadBadge: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF',
    },
    miniAvatar: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#E5E5EA',
    },
});