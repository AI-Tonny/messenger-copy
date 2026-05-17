import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../ui/Avatar';

interface ProfileHeaderProps {
    avatarUrl: string;
    name: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatarUrl, name }) => {
    return (
        <View style={styles.container}>
            <Avatar url={avatarUrl} size={92} />
            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 24,
        paddingBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        marginTop: 12,
        letterSpacing: -0.4,
    },
});