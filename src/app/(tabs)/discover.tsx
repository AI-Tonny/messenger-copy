import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../store';
import { mockDiscoverItems } from '../../mocks/mockData';

import { Avatar } from '../../components/ui/Avatar';
import { SearchBar } from '../../components/ui/SearchBar';
import { SegmentControl } from '../../components/ui/SegmentControl';
import { DiscoverItem } from '../../components/ui/DiscoverItem';

export default function DiscoverTab() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('FOR YOU');

    const { user } = useSelector((state: RootState) => state.auth);
    const currentUserAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';

    const recentBrands = mockDiscoverItems.filter(item => item.isRecent);
    const moreCompanies = mockDiscoverItems.filter(item => !item.isRecent);

    const renderHeader = () => (
        <View>
            <SearchBar />

            <SegmentControl
                tabs={['FOR YOU', 'BUSINESSES']}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {recentBrands.length > 0 && (
                <View>
                    <Text style={styles.sectionTitle}>Recent</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.recentContainer}
                    >
                        {recentBrands.map((brand) => (
                            <TouchableOpacity key={brand.id} style={styles.brandItem} activeOpacity={0.7}>
                                <Image source={{ uri: brand.avatar }} style={styles.brandLogo} />
                                <Text style={styles.brandName} numberOfLines={1}>{brand.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>More</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push('/settings')}
                >
                    <Avatar url={currentUserAvatar} size={40} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Discover</Text>
            </View>

            <FlatList
                data={moreCompanies}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <DiscoverItem
                        title={item.title}
                        category={item.category}
                        description={item.description}
                        logoUrl={item.avatar}
                        onPress={() => console.log(`Open company: ${item.title}`)}
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000000',
        marginLeft: 12,
        letterSpacing: -0.5,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
        marginLeft: 16,
        marginVertical: 10,
    },
    recentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    brandItem: {
        alignItems: 'center',
        marginRight: 20,
        width: 60,
    },
    brandLogo: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F2F2F7',
        borderWidth: 0.5,
        borderColor: '#E5E5EA',
    },
    brandName: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 6,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
});