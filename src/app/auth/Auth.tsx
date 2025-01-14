'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/Card';
import { Form } from '@/components/ui/form-elements/Form';
import { AuthFields } from './AuthFields';
import { Social } from './Social';
import { useAuthForm } from './useAuthForm';

export function Auth() {
    const [isReg, setIsReg] = useState(false);

    const { onSubmit, form, isPending } = useAuthForm(isReg);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-4 font-heebo">
            <div className="w-full max-w-lg">
                <CardHeader className="text-center leading-[1]">
                    <CardTitle className="text-[40px] font-semibold pb-4">
                        {isReg ? 'Create an account' : 'Login to your account'}
                    </CardTitle>    
                </CardHeader>
                <div className="flex justify-center border-b max-w-lg mx-auto">
                    <button
                        className={`flex-1 py-2 text-center font-semibold ${
                            !isReg ? 'border-b-2 border-[#1E1E1E]' : 'text-[#D1D1D1]'
                        }`}
                        onClick={() => setIsReg(false)}
                    >
                        SING IN
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-semibold ${
                            isReg ? 'border-b-2 border-[#1E1E1E]' : 'text-[#D1D1D1]'
                        }`}
                        onClick={() => setIsReg(true)}
                    >
                        CREATE ACCOUNT
                    </button>
                </div>
                

                <Card className="border-none">
                    <CardDescription className="text-[16px] text-[#424242] mt-10 mb-5 text-center">
                        Login or create an account to make purchases!
                    </CardDescription>
                    

                    <CardContent className="w-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <AuthFields form={form} isPending={isPending} isReg={isReg} />
                                <button className='mt-5 pb-5 underline w-full text-[14px] text-[#5D5D5D]'>
                                    Forgot your password?
                                </button>
                                <Button
                                    disabled={isPending}
                                    className="w-full bg-black text-[#FFFFFF] text-[16px] font-semibold hover:bg-gray-800 h-[48px] rounded-[10px]"
                                >
                                    {isReg ? 'Sign Up' : 'Sign In'}
                                </Button>
                            </form>
                        </Form>

                        <div className="flex items-center justify-center my-[10px]">
                            <span className="mx-2 text-[#5D5D5D] text-sm">OR</span>
                        </div>

						<Social />
                    </CardContent>

                </Card>
            </div>
        </div>
    );
}
