import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AddStoryRow: React.FC = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
                <Ionicons name="add" size={24} color="#000000" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Your story</Text>
                <Text style={styles.subtitle}>Add to your story</Text>
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
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        marginLeft: 14,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    subtitle: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 2,
    },
});