import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

interface AvatarProps {
    url: string;
    size?: number;
    isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ url, size = 52, isOnline = false }) => {
    // Пропорційно вираховуємо розмір індикатора онлайну
    const badgeSize = Math.max(12, size * 0.25);
    const badgeOffset = Math.max(0, size * 0.02);

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Image source={{ uri: url }} style={[styles.image, { borderRadius: size / 2 }]} />
            {isOnline && (
                <View
                    style={[
                        styles.onlineBadge,
                        {
                            width: badgeSize,
                            height: badgeSize,
                            borderRadius: badgeSize / 2,
                            bottom: badgeOffset,
                            right: badgeOffset,
                        }
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E5EA',
    },
    onlineBadge: {
        position: 'absolute',
        backgroundColor: '#34C759', // Зелений колір iOS
        borderWidth: 2,
        borderColor: '#FFFFFF', // Біла обводка, щоб відокремити від аватара
    },
});