import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from './Avatar';
import { UserMock } from '../../mocks/mockData';

interface PeopleItemProps {
    user: UserMock;
    onWavePress?: () => void;
}

export const PeopleItem: React.FC<PeopleItemProps> = ({ user, onWavePress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar url={user.avatar} size={52} isOnline={user.isOnline} />

                {/* Показуємо бейдж часу, якщо користувач не прямо зараз в мережі */}
                {!user.isOnline && user.lastActive && !user.lastActive.includes('Active now') && (
                    <View style={styles.timeBadge}>
                        <Text style={styles.timeText}>{user.lastActive.replace('Active ', '')}</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>
                    {user.name}
                </Text>
            </View>

            {/* Кнопка "Помахати рукою" (Wave) в стилі Messenger */}
            <TouchableOpacity style={styles.waveButton} activeOpacity={0.7} onPress={onWavePress}>
                <Text style={styles.waveEmoji}>👋</Text>
            </TouchableOpacity>
        </View>
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
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    timeBadge: {
        position: 'absolute',
        bottom: -4,
        backgroundColor: '#E5E5EA',
        paddingHorizontal: 5,
        paddingVertical: 1.5,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        minWidth: 32,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#34C759', // Зелений текст для часу в стилі макета
    },
    content: {
        flex: 1,
        marginLeft: 14,
    },
    name: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000000',
    },
    waveButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    waveEmoji: {
        fontSize: 16,
    },
});