import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    onSendLike: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onSendLike }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim().length === 0) return;
        onSendMessage(text);
        setText(''); // Очищаємо поле після відправки
    };

    return (
        <View style={styles.container}>
            {/* Лівий блок: Системні кнопки дій */}
            <View style={styles.leftActions}>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                    <Ionicons name="apps" size={22} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                    <Ionicons name="camera" size={22} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                    <Ionicons name="images" size={22} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                    <Ionicons name="mic" size={22} color="#007AFF" />
                </TouchableOpacity>
            </View>

            {/* Центральний блок: Поле введення із вбудованою іконкою смайлика */}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Aa"
                    placeholderTextColor="#8E8E93"
                    value={text}
                    onChangeText={setText}
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity style={styles.emojiButton} activeOpacity={0.7}>
                    <Ionicons name="happy-outline" size={22} color="#007AFF" />
                </TouchableOpacity>
            </View>

            {/* Правий блок: Динамічна кнопка (Лайк або Надіслати) */}
            <View style={styles.rightAction}>
                {text.trim().length > 0 ? (
                    <TouchableOpacity style={styles.sendButton} activeOpacity={0.7} onPress={handleSend}>
                        <Ionicons name="send" size={22} color="#007AFF" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.sendButton} activeOpacity={0.7} onPress={onSendLike}>
                        {/* Рендеримо іконку руки/лайка згідно з оригінальним дизайном */}
                        <FontAwesome6 name="hand-back-fist" size={22} color="#007AFF" style={styles.waveIcon} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0.5,
        borderTopColor: '#E5E5EA',
    },
    leftActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 6,
        marginRight: 2,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 18,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        minHeight: 36,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        paddingVertical: 6,
        paddingRight: 30, // Залишаємо місце під іконку смайлика праворуч всередині інпута
    },
    emojiButton: {
        position: 'absolute',
        right: 8,
    },
    rightAction: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    sendButton: {
        padding: 6,
    },
    waveIcon: {
        transform: [{ rotate: '90deg' }], // Повертаємо кулак/долоню боком, як у Messenger
    },
});