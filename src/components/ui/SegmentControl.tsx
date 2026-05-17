import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface SegmentControlProps {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
}

export const SegmentControl: React.FC<SegmentControlProps> = ({ tabs, activeTab, onChange }) => {
    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = tab === activeTab;
                return (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, isActive && styles.activeTab]}
                        activeOpacity={0.8}
                        onPress={() => onChange(tab)}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        padding: 2,
        marginHorizontal: 16,
        marginVertical: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        // Легка тінь для активного перемикача в стилі iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 1,
        elevation: 1,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#8E8E93',
    },
    activeTabText: {
        color: '#000000',
    },
});