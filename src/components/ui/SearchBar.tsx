import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    value?: string;
    onChangeText?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={18} color="#8E8E93" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#8E8E93"
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F7', // Світло-сірий фон iOS
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 40,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        padding: 0, // Прибираємо дефолтні паддінги Android
    },
});