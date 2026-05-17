import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../store';
import { mockChats } from '../../mocks/mockData';

import { Avatar } from '../../components/ui/Avatar';
import { IconButton } from '../../components/ui/IconButton';
import { SearchBar } from '../../components/ui/SearchBar';
import { StoryItem } from '../../components/ui/StoryItem';
import { ChatItem } from '../../components/ui/ChatItem';
import { AdBanner } from '../../components/ui/AdBanner';

export default function ChatsTab() {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const currentUserAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';

    const renderHeader = () => (
        <View>
            <SearchBar />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storiesContainer}
            >
                <StoryItem name="Your story" isCurrentUser={true} />

                {mockChats.map((chat) => (
                    <StoryItem
                        key={chat.id}
                        name={chat.user.name.split(' ')[0]}
                        avatarUrl={chat.user.avatar}
                        isOnline={chat.user.isOnline}
                        onPress={() => {
                            router.push({
                                pathname: '/chat/[id]',
                                params: {
                                    id: chat.id,
                                    userName: chat.user.name,
                                    userAvatar: chat.user.avatar
                                }
                            } as any);
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('/settings')}
                    >
                        <Avatar url={currentUserAvatar} size={40} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Chats</Text>
                </View>

                <View style={styles.headerRight}>
                    <IconButton name="camera" onPress={() => console.log('Open camera')} />
                    <IconButton name="create-outline" onPress={() => console.log('Create new message')} />
                </View>
            </View>

            <FlatList
                data={mockChats}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <ChatItem
                        chat={item}
                        onPress={() => {
                            router.push({
                                pathname: '/chat/[id]',
                                params: {
                                    id: item.id,
                                    userName: item.user.name,
                                    userAvatar: item.user.avatar
                                }
                            } as any);
                        }}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <AdBanner />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000000',
        marginLeft: 12,
        letterSpacing: -0.5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    storiesContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexDirection: 'row',
    },
});