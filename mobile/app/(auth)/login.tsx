import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import useAuth from '@/hooks/useAuth'
import { validateEmail } from '@/lib/utils'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'

const Login = () => {
    const router = useRouter();
    const toast = useToast();
    const { loggingIn, login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = () => {
        if (!formData.email || !formData.password) {
            return toast.show("Please fill in all fields", {
                type: 'danger'
            });
        }
        if (!validateEmail(formData.email)) {
            return toast.show("Please enter a valid email", {
                type: 'danger'
            });
        }
        login(formData.email, formData.password);
    }
    return (
        <SafeAreaView>
            <View className='h-full  justify-center px-6'>
                <Text className='text-2xl font-semibold'>Login to your account</Text>
                <Text className='text-gray-500 text-base'>Enter your email and password below</Text>
                <View className='w-full mt-10'>
                    <CustomInput
                        label='Email'
                        value={formData.email}
                        onChangeText={(val) => setFormData({ ...formData, email: val })}
                    />
                    <CustomInput
                        label='Password'
                        secureTextEntry
                        onChangeText={(val) => setFormData({ ...formData, password: val })}
                        containerStyles='mt-3'
                    />
                </View>
                <CustomButton
                    title='Login'
                    handlePress={handleSubmit}
                    containerStyles='mt-8'
                    isLoading={loggingIn}
                />
                <View className='flex flex-row gap-1 mt-3'>
                    <Text className='text-base'>Don't have an account?</Text>
                    <Link href={'/signup'}>
                        <Text className='text-cyan-600 text-base'>signup</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login

