import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated } from 'react-native';

interface CustomModalProps {
    visible: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDestructive?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
                                                            visible,
                                                            title,
                                                            description,
                                                            confirmText,
                                                            cancelText,
                                                            onConfirm,
                                                            onCancel,
                                                            isDestructive = false,
                                                        }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.cancelText}>{cancelText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                isDestructive ? styles.destructiveButton : styles.confirmButton
                            ]}
                            onPress={onConfirm}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingTop: 20,
        paddingBottom: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: -0.2,
    },
    description: {
        fontSize: 14,
        color: '#8E8E93',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        flex: 1,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F2F2F7',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
    },
    destructiveButton: {
        backgroundColor: '#FF3B30',
    },
    cancelText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
    },
    confirmText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});