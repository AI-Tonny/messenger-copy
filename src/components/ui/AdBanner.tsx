import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export const AdBanner: React.FC = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9}>
            {/* Логотип рекламодавця з лівого боку макету */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Px</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Pixsellz</Text>
                    <View style={styles.adBadge}>
                        <Text style={styles.adText}>Ad</Text>
                    </View>
                </View>
                <Text style={styles.subtitle} numberOfLines={1}>Make design process easier...</Text>
                <Text style={styles.viewMore}>View More</Text>
            </View>

            {/* Фіолетова кастомна іконка / картинка з правого боку макету */}
            <View style={styles.imageContainer}>
                <View style={styles.purpleBox}>
                    <View style={styles.innerWhiteBox} />
                </View>
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
        borderTopWidth: 0.5,
        borderTopColor: '#E5E5EA',
    },
    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
    },
    adBadge: {
        backgroundColor: '#E5E5EA',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4,
        marginLeft: 6,
    },
    adText: {
        fontSize: 10,
        color: '#8E8E93',
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        color: '#8E8E93',
    },
    viewMore: {
        fontSize: 13,
        color: '#007AFF',
        fontWeight: '500',
        marginTop: 2,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    purpleBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#7F3DFF', // Фіолетовий колір з макету
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerWhiteBox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
});