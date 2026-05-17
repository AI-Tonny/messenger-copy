import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Animated,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Stop, Circle, Path } from 'react-native-svg';
import { AppDispatch } from '../../store';
import { registerUserThunk } from '../../store/authSlice';

// ─── Messenger Logo SVG ───────────────────────────────────────────────────────
const MessengerLogo: React.FC<{ size?: number }> = ({ size = 72 }) => (
    <Svg width={size} height={size} viewBox="0 0 72 72">
        <Defs>
            <RadialGradient id="grad" cx="19.59%" cy="100%" r="108.96%" fx="19.59%" fy="100%">
                <Stop offset="0%" stopColor="#0099FF" />
                <Stop offset="60.98%" stopColor="#A033FF" />
                <Stop offset="93.44%" stopColor="#FF5280" />
                <Stop offset="100%" stopColor="#FF7061" />
            </RadialGradient>
        </Defs>
        <Circle cx="36" cy="36" r="36" fill="url(#grad)" />
        <Path
            d="M36 13C23.85 13 14 22.28 14 33.78c0 6.49 3.19 12.28 8.18 16.09V58l7.49-4.12c2 .56 4.12.85 6.33.85 12.15 0 22-9.28 22-20.78S48.15 13 36 13zm2.19 27.97l-5.6-5.97-10.93 5.97 12.02-12.76 5.74 5.97 10.79-5.97-12.02 12.76z"
            fill="white"
        />
    </Svg>
);

// ─── Simple Centered Input ────────────────────────────────────────────────────
interface SimpleInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    icon: keyof typeof Ionicons.glyphMap;
    rightIcon?: React.ReactNode;
    delay?: number;
}

const SimpleInput: React.FC<SimpleInputProps> = ({
                                                     placeholder,
                                                     value,
                                                     onChangeText,
                                                     error,
                                                     secureTextEntry,
                                                     autoCapitalize = 'none',
                                                     autoCorrect = false,
                                                     icon,
                                                     rightIcon,
                                                     delay = 0,
                                                 }) => {
    const [isFocused, setIsFocused] = useState(false);
    const slideAnim = useRef(new Animated.Value(24)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 380,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 380,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const borderColor = error ? '#FF3B30' : isFocused ? '#0084FF' : '#E8ECF4';
    const bgColor = error ? '#FFF5F5' : isFocused ? '#F0F7FF' : '#F7F8FB';
    const iconColor = isFocused ? '#0084FF' : '#ABAFC4';

    return (
        <Animated.View
            style={[
                styles.inputWrapper,
                { transform: [{ translateY: slideAnim }], opacity: opacityAnim },
            ]}
        >
            <View style={[styles.inputRow, { borderColor, backgroundColor: bgColor }]}>
                <Ionicons name={icon} size={18} color={iconColor} style={styles.inputIconLeft} />
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor="#ABAFC4"
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                />
                {rightIcon && <View style={styles.inputIconRight}>{rightIcon}</View>}
            </View>
            {error ? (
                <View style={styles.errorRow}>
                    <Ionicons name="alert-circle" size={12} color="#FF3B30" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
        </Animated.View>
    );
};

// ─── Password Strength ────────────────────────────────────────────────────────
const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
    const getStrength = () => {
        if (!password) return { score: 0, label: '', color: '#E5E7EB' };
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        if (score <= 1) return { score: 1, label: 'Weak', color: '#FF3B30' };
        if (score <= 2) return { score: 2, label: 'Fair', color: '#FF9500' };
        if (score <= 3) return { score: 3, label: 'Good', color: '#34C759' };
        return { score: 4, label: 'Strong', color: '#0084FF' };
    };
    const { score, label, color } = getStrength();
    if (!password) return null;
    return (
        <View style={styles.strengthContainer}>
            <View style={styles.strengthBars}>
                {[1, 2, 3, 4].map((i) => (
                    <View
                        key={i}
                        style={[styles.strengthBar, { backgroundColor: i <= score ? color : '#E5E7EB' }]}
                    />
                ))}
            </View>
            <Text style={[styles.strengthLabel, { color }]}>{label}</Text>
        </View>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function RegisterScreen() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const logoScale = useRef(new Animated.Value(0.6)).current;
    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerSlide = useRef(new Animated.Value(16)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(logoScale, {
                toValue: 1,
                tension: 70,
                friction: 6,
                useNativeDriver: true,
                delay: 80,
            }),
            Animated.timing(headerOpacity, {
                toValue: 1,
                duration: 450,
                delay: 220,
                useNativeDriver: true,
            }),
            Animated.timing(headerSlide, {
                toValue: 0,
                duration: 450,
                delay: 220,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const validate = () => {
        let valid = true;
        const newErrors: { username?: string; password?: string } = {};
        if (!username.trim()) {
            newErrors.username = 'Username is required';
            valid = false;
        } else if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
            newErrors.username = 'Only letters, numbers, . or _';
            valid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'At least 6 characters';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleRegister = async () => {
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            const cleanUsername = username.trim().toLowerCase();
            await AsyncStorage.setItem(`@user_pwd_${cleanUsername}`, password);
            const userData = {
                name: username.trim(),
                username: cleanUsername,
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
            };
            await dispatch(registerUserThunk(userData));
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <LinearGradient
                colors={['#EEF4FF', '#F5F8FF', '#FFFFFF']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 0.45 }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Animated.View style={[styles.logoWrapper, { transform: [{ scale: logoScale }] }]}>
                            <View style={styles.logoGlow} />
                            <MessengerLogo size={72} />
                        </Animated.View>

                        <Animated.View
                            style={{
                                opacity: headerOpacity,
                                transform: [{ translateY: headerSlide }],
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>
                                Choose a username and a strong password{'\n'}to start messaging
                            </Text>
                        </Animated.View>
                    </View>

                    {/* Form card */}
                    <View style={styles.card}>
                        <SimpleInput
                            placeholder="Username"
                            value={username}
                            onChangeText={(t) => {
                                setUsername(t);
                                if (errors.username) setErrors({ ...errors, username: undefined });
                            }}
                            error={errors.username}
                            icon="at-outline"
                            delay={300}
                        />

                        <SimpleInput
                            placeholder="Password"
                            value={password}
                            onChangeText={(t) => {
                                setPassword(t);
                                if (errors.password) setErrors({ ...errors, password: undefined });
                            }}
                            error={errors.password}
                            secureTextEntry={secureTextEntry}
                            icon="lock-closed-outline"
                            delay={400}
                            rightIcon={
                                <TouchableOpacity
                                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                >
                                    <Ionicons
                                        name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                                        size={20}
                                        color="#ABAFC4"
                                    />
                                </TouchableOpacity>
                            }
                        />

                        <PasswordStrength password={password} />

                        <Text style={styles.termsText}>
                            By signing up, you agree to our{' '}
                            <Text style={styles.termsLink}>Terms of Service</Text>
                            {' '}and{' '}
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </Text>

                        <TouchableOpacity
                            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                            onPress={handleRegister}
                            activeOpacity={0.85}
                            disabled={isSubmitting}
                        >
                            <LinearGradient
                                colors={isSubmitting ? ['#93C5FD', '#93C5FD'] : ['#0099FF', '#A033FF']}
                                style={styles.submitGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {isSubmitting ? (
                                    <Text style={styles.submitText}>Creating account…</Text>
                                ) : (
                                    <>
                                        <Text style={styles.submitText}>Create Account</Text>
                                        <Ionicons
                                            name="arrow-forward"
                                            size={18}
                                            color="#FFFFFF"
                                            style={{ marginLeft: 8 }}
                                        />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>already have an account?</Text>
                            <View style={styles.divider} />
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => router.back()}
                            activeOpacity={0.75}
                        >
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 36,
        justifyContent: 'center',
    },

    // Header
    header: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 12,
    },
    logoWrapper: {
        marginBottom: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoGlow: {
        position: 'absolute',
        width: 104,
        height: 104,
        borderRadius: 52,
        backgroundColor: 'rgba(100, 100, 255, 0.10)',
        top: -16,
        left: -16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        textAlign: 'center',
        letterSpacing: -0.7,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#8A93A8',
        textAlign: 'center',
        lineHeight: 21,
    },

    // Card
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#1A237E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.07,
        shadowRadius: 24,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#EEF2F8',
        marginBottom: 20,
    },

    // Input — key fix: height + alignItems centers everything vertically
    inputWrapper: {
        marginBottom: 14,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',   // ← vertically centers icon, text and eye icon
        borderWidth: 1.5,
        borderRadius: 14,
        height: 54,             // ← fixed height so centering is predictable
        paddingHorizontal: 14,
    },
    inputIconLeft: {
        marginRight: 10,
    },
    inputIconRight: {
        marginLeft: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        color: '#0F172A',
        fontWeight: '500',
        letterSpacing: -0.2,
        paddingVertical: 0,     // ← removes default Android top/bottom padding that breaks centering
        height: '100%',
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 4,
        gap: 4,
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        fontWeight: '500',
    },

    // Strength
    strengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -2,
        marginBottom: 14,
        gap: 10,
    },
    strengthBars: {
        flex: 1,
        flexDirection: 'row',
        gap: 4,
    },
    strengthBar: {
        flex: 1,
        height: 3,
        borderRadius: 2,
    },
    strengthLabel: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
        minWidth: 46,
        textAlign: 'right',
    },

    // Terms
    termsText: {
        fontSize: 12,
        color: '#8A93A8',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    termsLink: {
        color: '#0084FF',
        fontWeight: '600',
    },

    // Submit
    submitButton: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#0084FF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 12,
        elevation: 6,
    },
    submitButtonDisabled: {
        shadowOpacity: 0,
        elevation: 0,
    },
    submitGradient: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.3,
    },

    // Footer
    footer: {
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        gap: 10,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEF2F8',
    },
    dividerText: {
        fontSize: 12,
        color: '#B0B8CC',
        fontWeight: '500',
    },
    loginButton: {
        width: '100%',
        height: 52,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#E2E8F4',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFBFE',
    },
    loginButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -0.3,
    },
});