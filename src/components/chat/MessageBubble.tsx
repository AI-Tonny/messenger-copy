import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MessageMock } from '../../mocks/mockData';

interface MessageBubbleProps {
    message: MessageMock;
    isMe: boolean;
    userAvatar: string;
    showAvatar?: boolean;
    isLastMessage?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
                                                                message,
                                                                isMe,
                                                                userAvatar,
                                                                showAvatar = true,
                                                                isLastMessage = false,
                                                            }) => {
    return (
        <View style={[styles.container, isMe ? styles.myContainer : styles.theirContainer]}>

            {!isMe && (
                <View style={styles.avatarSpace}>
                    {showAvatar ? (
                        <Image source={{ uri: userAvatar }} style={styles.senderAvatar} />
                    ) : null}
                </View>
            )}

            <View style={styles.bubbleWrapper}>
                {message.image ? (
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: message.image }} style={styles.messageImage} />
                    </View>
                ) : (
                    <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
                        <Text style={[styles.text, isMe ? styles.myText : styles.theirText]}>
                            {message.text}
                        </Text>
                    </View>
                )}

                {isMe && isLastMessage && message.status === 'read' && (
                    <View style={styles.statusRow}>
                        <Image source={{ uri: userAvatar }} style={styles.miniStatusAvatar} />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginVertical: 2,
        maxWidth: '85%',
    },
    myContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    theirContainer: {
        alignSelf: 'flex-start',
    },
    avatarSpace: {
        width: 32,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 8,
        marginBottom: 2,
    },
    senderAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E5E5EA',
    },
    bubbleWrapper: {
        alignItems: 'flex-end',
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    myBubble: {
        backgroundColor: '#007AFF',
    },
    theirBubble: {
        backgroundColor: '#F2F2F7',
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
    },
    myText: {
        color: '#FFFFFF',
    },
    theirText: {
        color: '#000000',
    },
    imageWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#F2F2F7',
        marginTop: 4,
    },
    messageImage: {
        width: 240,
        height: 180,
        resizeMode: 'cover',
    },
    statusRow: {
        marginTop: 2,
        marginRight: 4,
    },
    miniStatusAvatar: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
});