import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState, AppDispatch } from '../store';
import { logoutUserThunk } from '../store/authSlice';

import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileSection } from '../components/profile/ProfileSection';
import { ProfileRow } from '../components/profile/ProfileRow';
import { CustomModal } from '../components/ui/CustomModal';

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [darkMode, setDarkMode] = useState(false);
  const [isActiveStatus, setIsActiveStatus] = useState(true);
  const [username, setUsername] = useState('fbfan.jacob');
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const currentUserAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';
  const currentUserName = user?.name || 'Jacob West';

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('settings_dark_mode');
        const savedActiveStatus = await AsyncStorage.getItem('settings_active_status');
        const savedUsername = await AsyncStorage.getItem('settings_username');

        if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
        if (savedActiveStatus !== null) setIsActiveStatus(JSON.parse(savedActiveStatus));
        if (savedUsername !== null) setUsername(savedUsername);
      } catch (error) {
        console.error(error);
      }
    };

    loadSettings();
  }, []);

  const handleDarkModeChange = async (value: boolean) => {
    try {
      setDarkMode(value);
      await AsyncStorage.setItem('settings_dark_mode', JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleActiveStatus = async () => {
    try {
      const newValue = !isActiveStatus;
      setIsActiveStatus(newValue);
      await AsyncStorage.setItem('settings_active_status', JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLogoutModalVisible(false);
      await dispatch(logoutUserThunk());
      router.replace('/(auth)/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Me</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <ProfileHeader avatarUrl={currentUserAvatar} name={currentUserName} />

          <ProfileSection>
            <ProfileRow
                iconName="moon"
                iconBgColor="#000000"
                text="Dark Mode"
                hasSwitch
                switchValue={darkMode}
                onSwitchChange={handleDarkModeChange}
            />
            <ProfileRow
                iconName="ellipse"
                iconBgColor="#34C759"
                text="Active Status"
                rightText={isActiveStatus ? 'On' : 'Off'}
                onPress={toggleActiveStatus}
            />
            <ProfileRow
                iconName="at-sharp"
                iconBgColor="#FF9500"
                text="Username"
                rightText={username}
                isLast
                onPress={() => console.log('Username press')}
            />
          </ProfileSection>

          <ProfileSection>
            <ProfileRow
                iconName="notifications"
                iconBgColor="#007AFF"
                text="Preferences"
                onPress={() => console.log('Preferences pressed')}
            />
            <ProfileRow
                iconName="chatbubble-ellipses"
                iconBgColor="#5856D6"
                text="People"
                isLast
                onPress={() => console.log('People pressed')}
            />
          </ProfileSection>

          <ProfileSection>
            <ProfileRow
                iconName="log-out"
                iconBgColor="#FF3B30"
                text="Log Out"
                isDestructive
                isLast
                onPress={() => setIsLogoutModalVisible(true)}
            />
          </ProfileSection>
        </ScrollView>

        <CustomModal
            visible={isLogoutModalVisible}
            title="Log Out"
            description="Are you sure you want to log out of your account?"
            confirmText="Log Out"
            cancelText="Cancel"
            isDestructive
            onConfirm={handleConfirmLogout}
            onCancel={() => setIsLogoutModalVisible(false)}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 36,
  },
  scrollContent: {
    paddingBottom: 30,
  },
});