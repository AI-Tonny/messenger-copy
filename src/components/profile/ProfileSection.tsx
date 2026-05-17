import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProfileSectionProps {
    children: React.ReactNode;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ children }) => {
    return <View style={styles.section}>{children}</View>;
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#E5E5EA',
        paddingLeft: 16,
    },
});