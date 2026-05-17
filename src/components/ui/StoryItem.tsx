import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from './Avatar';

interface StoryItemProps {
    name: string;
    avatarUrl?: string;
    isOnline?: boolean;
    hasUnread?: boolean;
    isCurrentUser?: boolean;
    onPress?: () => void;
}

export const StoryItem: React.FC<StoryItemProps> = ({
                                                        name,
                                                        avatarUrl,
                                                        isOnline = false,
                                                        hasUnread = false,
                                                        isCurrentUser = false,
                                                        onPress,
                                                    }) => {
    // Скорочуємо ім'я до першого слова для підпису під аватаркою
    const firstName = name.split(' ')[0];

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            {isCurrentUser ? (
                // Кнопка створення своєї сторіз з плюсиком
                <View style={styles.avatarWrapper}>
                    <View style={styles.addStoryButton}>
                        <Ionicons name="add" size={28} color="#000000" />
                    </View>
                </View>
            ) : (
                // Звичайна історія друга з перевіркою на "непрочитану" обводку
                <View style={[styles.avatarWrapper, hasUnread ? styles.unreadBorder : null]}>
                    <Avatar url={avatarUrl || ''} size={56} isOnline={isOnline} />
                </View>
            )}
            <Text style={styles.nameText} numberOfLines={1}>
                {isCurrentUser ? 'Your story' : firstName}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 68,
        marginRight: 10,
    },
    avatarWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    unreadBorder: {
        borderWidth: 2,
        borderColor: '#007AFF', // Синя рамка для нових сторіз
    },
    addStoryButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 13,
        color: '#8E8E93',
        textAlign: 'center',
    },
});