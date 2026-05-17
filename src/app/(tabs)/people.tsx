import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../store';
import { mockChats } from '../../mocks/mockData';

import { Avatar } from '../../components/ui/Avatar';
import { IconButton } from '../../components/ui/IconButton';
import { SearchBar } from '../../components/ui/SearchBar';
import { AddStoryRow } from '../../components/ui/AddStoryRow';
import { PeopleItem } from '../../components/ui/PeopleItem';

export default function PeopleTab() {
    const router = useRouter();

    const { user } = useSelector((state: RootState) => state.auth);
    const currentUserAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';

    const recentlyActivePeople = mockChats
        .filter((c) => c.user.name.toLowerCase().includes('albert') || c.id === 'albert')
        .map((c) => c.user);

    const mainPeople = mockChats
        .filter((c) => !c.user.name.toLowerCase().includes('albert') && c.id !== 'albert')
        .map((c) => c.user);

    const renderHeader = () => (
        <View>
            <SearchBar />
            <AddStoryRow />
        </View>
    );

    const renderFooter = () => {
        if (recentlyActivePeople.length === 0) return null;
        return (
            <View style={styles.footerSection}>
                <Text style={styles.sectionTitle}>RECENTLY ACTIVE</Text>
                {recentlyActivePeople.map((item, index) => (
                    <PeopleItem
                        key={index}
                        user={item}
                        onWavePress={() => console.log(`Waved to ${item.name}`)}
                    />
                ))}
            </View>
        );
    };

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
                    <Text style={styles.headerTitle}>People</Text>
                </View>

                <View style={styles.headerRight}>
                    <IconButton name="chatbubble-sharp" onPress={() => console.log('Open active chats list')} />
                    <IconButton name="person-add-sharp" onPress={() => console.log('Add new contact')} />
                </View>
            </View>

            <FlatList
                data={mainPeople}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                renderItem={({ item }) => (
                    <PeopleItem
                        user={item}
                        onWavePress={() => console.log(`Waved to ${item.name}`)}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
    footerSection: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#8E8E93',
        marginLeft: 16,
        marginBottom: 8,
        letterSpacing: -0.1,
    },
});