import React from 'react';
import { StyleSheet, TextInput, TextInputProps, Text, View } from 'react-native';

interface InputProps extends TextInputProps {
    error?: string;
    label?: string;
}

export const Input: React.FC<InputProps> = ({ error, label, style, ...props }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                placeholderTextColor="#8E8E93"
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 6,
        paddingLeft: 4,
    },
    input: {
        backgroundColor: '#F2F2F7',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 16,
        color: '#000000',
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#FF3B30',
        backgroundColor: '#FFEEEE',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        paddingLeft: 4,
    },
});