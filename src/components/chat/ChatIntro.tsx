import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '../ui/Avatar';

interface ChatIntroProps {
    name: string;
    avatarUrl: string;
    onWavePress?: () => void;
}

export const ChatIntro: React.FC<ChatIntroProps> = ({ name, avatarUrl, onWavePress }) => {
    return (
        <View style={styles.container}>
            <Avatar url={avatarUrl} size={100} />

            <Text style={styles.name}>{name}</Text>

            <Text style={styles.facebookInfo}>You're friends on Facebook</Text>
            <Text style={styles.locationInfo}>Lives in Tokyo, Japan</Text>

            {/* Велика кнопка привітання "Wave" */}
            <TouchableOpacity style={styles.waveButton} activeOpacity={0.8} onPress={onWavePress}>
                <Text style={styles.waveEmoji}>👋</Text>
            </TouchableOpacity>
            <Text style={styles.waveHint}>Say hello to {name.split(' ')[0]} with a wave</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        marginTop: 16,
        letterSpacing: -0.3,
    },
    facebookInfo: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 8,
    },
    locationInfo: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 2,
    },
    waveButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF9E6',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 8,
        shadowColor: '#D1A100',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    waveEmoji: {
        fontSize: 32,
    },
    waveHint: {
        fontSize: 12,
        color: '#8E8E93',
        fontWeight: '500',
    },
});