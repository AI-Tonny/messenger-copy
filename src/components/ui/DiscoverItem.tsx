import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

interface DiscoverItemProps {
    title: string;
    category: string;
    description: string;
    logoUrl: string;
    onPress?: () => void;
}

export const DiscoverItem: React.FC<DiscoverItemProps> = ({
                                                              title,
                                                              category,
                                                              description,
                                                              logoUrl,
                                                              onPress,
                                                          }) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            <Image source={{ uri: logoUrl }} style={styles.logo} />

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.category} numberOfLines={1}>{category}</Text>
                <Text style={styles.description} numberOfLines={1}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 52,
        height: 52,
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: '#E5E5EA',
        backgroundColor: '#F2F2F7',
    },
    content: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 2,
    },
    category: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 2,
    },
    description: {
        fontSize: 13,
        color: '#8E8E93',
    },
});