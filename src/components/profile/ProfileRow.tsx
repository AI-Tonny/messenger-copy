import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileRowProps {
    iconName: keyof typeof Ionicons.glyphMap;
    iconBgColor: string;
    text: string;
    rightText?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    isDestructive?: boolean;
    isLast?: boolean;
}

export const ProfileRow: React.FC<ProfileRowProps> = ({
                                                          iconName,
                                                          iconBgColor,
                                                          text,
                                                          rightText,
                                                          hasSwitch = false,
                                                          switchValue = false,
                                                          onSwitchChange,
                                                          onPress,
                                                          isDestructive = false,
                                                          isLast = false,
                                                      }) => {
    const RowComponent = hasSwitch ? View : TouchableOpacity;

    return (
        <RowComponent
            style={[styles.row, isLast && styles.lastRow]}
            activeOpacity={0.7}
            onPress={hasSwitch ? undefined : onPress}
        >
            <View style={styles.rowLeft}>
                <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
                    <Ionicons name={iconName} size={20} color="#FFFFFF" />
                </View>
                <Text style={[styles.rowText, isDestructive && styles.destructiveText]}>
                    {text}
                </Text>
            </View>

            {hasSwitch ? (
                <Switch
                    value={switchValue}
                    onValueChange={onSwitchChange}
                    trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                    ios_backgroundColor="#E5E5EA"
                />
            ) : (
                <View style={styles.rowRight}>
                    {rightText && <Text style={styles.rowRightText}>{rightText}</Text>}
                    <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
                </View>
            )}
        </RowComponent>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingRight: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    rowText: {
        fontSize: 16,
        color: '#000000',
    },
    destructiveText: {
        color: '#FF3B30',
        fontWeight: '600',
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowRightText: {
        fontSize: 16,
        color: '#8E8E93',
        marginRight: 6,
    },
});