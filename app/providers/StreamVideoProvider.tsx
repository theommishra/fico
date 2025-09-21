"use client";
import { tokenProvider } from "@/app/actions/stream.actions";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useState, ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();

    const { user, isLoaded } = useUser();

    useEffect(() => {
        // If no API key is configured, skip Stream initialization
        if (!apiKey || apiKey === 'your_stream_api_key_here') {
            console.warn("Stream API key not configured. Skipping Stream initialization.");
            return;
        }

        if (!isLoaded || !user) return;
        if (!tokenProvider) return;
        
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.primaryEmailAddress?.emailAddress,
                image: user?.imageUrl,
            },
            tokenProvider,
        });

        setVideoClient(client);
    }, [user, isLoaded]);

    // If Stream is not configured or user not authenticated, render children directly
    if (!apiKey || apiKey === 'your_stream_api_key_here' || !user) {
        return <>{children}</>;
    }

    // Show loading only if we're waiting for Stream to initialize
    if (!videoClient) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};