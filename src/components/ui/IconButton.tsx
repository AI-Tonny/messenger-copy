import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

interface IconButtonProps {
    name: ComponentProps<typeof Ionicons>['name']; // Правильна типізація іконок Expo
    size?: number;
    onPress?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ name, size = 22, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
            <Ionicons name={name} size={size} color="#000000" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
});