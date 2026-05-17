import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
    focusKey?: number; // змінюється щоразу при фокусі екрану → перезапускає анімацію
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
                                                     focusKey = 0,
                                                 }) => {
    const [isFocused, setIsFocused] = useState(false);
    const slideAnim = useRef(new Animated.Value(24)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        slideAnim.setValue(24);
        opacityAnim.setValue(0);
        Animated.parallel([
            Animated.timing(slideAnim, { toValue: 0, duration: 380, delay, useNativeDriver: true }),
            Animated.timing(opacityAnim, { toValue: 1, duration: 380, delay, useNativeDriver: true }),
        ]).start();
    }, [focusKey]); // ← перезапуск при кожному фокусі екрану

    const borderColor = error ? '#FF3B30' : isFocused ? '#0084FF' : '#E8ECF4';
    const bgColor = error ? '#FFF5F5' : isFocused ? '#F0F7FF' : '#F7F8FB';
    const iconColor = isFocused ? '#0084FF' : '#ABAFC4';

    return (
        <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: slideAnim }], opacity: opacityAnim }]}>
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

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusKey, setFocusKey] = useState(0); // інкрементується при кожному фокусі

    // Mount animations — identical to RegisterScreen
    const logoScale = useRef(new Animated.Value(0.6)).current;
    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerSlide = useRef(new Animated.Value(16)).current;

    // useFocusEffect запускає анімацію щоразу при переході на екран
    useFocusEffect(
        useCallback(() => {
            // Скидаємо значення перед кожним запуском
            logoScale.setValue(0.6);
            headerOpacity.setValue(0);
            headerSlide.setValue(16);
            setFocusKey(k => k + 1); // triggers input animations

            const anim = Animated.parallel([
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
            ]);

            anim.start();

            // Зупиняємо анімацію якщо екран втрачає фокус
            return () => anim.stop();
        }, [])
    );

    const validate = () => {
        const newErrors: { username?: string; password?: string } = {};
        let valid = true;
        if (!username.trim()) {
            newErrors.username = 'Username is required';
            valid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleLogin = () => {
        if (!validate()) return;
        setIsSubmitting(true);

        setTimeout(() => {
            const formattedName =
                username.trim().charAt(0).toUpperCase() + username.trim().slice(1);

            dispatch(registerUserThunk({
                name: formattedName,
                username: username.trim().toLowerCase(),
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
            }));

            setIsSubmitting(false);
            router.replace('/(tabs)');
        }, 800);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            {/* Background gradient */}
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
                    {/* ── Header ── */}
                    <View style={styles.header}>
                        {/* Logo */}
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
                            <Text style={styles.title}>Welcome back 👋</Text>
                            <Text style={styles.subtitle}>
                                Sign in to continue chatting{'\n'}with your friends
                            </Text>
                        </Animated.View>
                    </View>

                    {/* ── Form card ── */}
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
                            focusKey={focusKey}
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
                            focusKey={focusKey}
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

                        {/* Forgot password */}
                        <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>

                        {/* Submit */}
                        <TouchableOpacity
                            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                            onPress={handleLogin}
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
                                    <Text style={styles.submitText}>Signing in…</Text>
                                ) : (
                                    <>
                                        <Text style={styles.submitText}>Sign In</Text>
                                        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* ── Footer ── */}
                    <View style={styles.footer}>
                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>don't have an account?</Text>
                            <View style={styles.divider} />
                        </View>

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => router.push('/(auth)/register')}
                            activeOpacity={0.75}
                        >
                            <Text style={styles.registerButtonText}>Create Account</Text>
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
        marginBottom: 28,
    },
    logoWrapper: {
        marginBottom: 20,
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

    // Input
    inputWrapper: {
        marginBottom: 14,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        height: 54,
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
        paddingVertical: 0,
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

    // Forgot
    forgotRow: {
        alignSelf: 'flex-end',
        marginTop: -4,
        marginBottom: 20,
        paddingVertical: 4,
    },
    forgotText: {
        fontSize: 13,
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
    registerButton: {
        width: '100%',
        height: 52,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#E2E8F4',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFBFE',
    },
    registerButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -0.3,
    },
});