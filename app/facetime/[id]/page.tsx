"use client";
import { useGetCallById } from "@/app/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import {
    StreamCall,
    StreamTheme,
    PaginatedGridLayout,
    CallControls,
} from "@stream-io/video-react-sdk";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FaceTimePage() {
    const { id } = useParams<{ id: string }>();
    const [confirmJoin, setConfirmJoin] = useState<boolean>(false);
    const [camMicEnabled, setCamMicEnabled] = useState<boolean>(false);
    const router = useRouter();
    //👇🏻 gets call details by ID
    const { call, isCallLoading } = useGetCallById(id);

    useEffect(() => {
        if (camMicEnabled) {
            call?.camera.enable();
            call?.microphone.enable();
        } else {
            call?.camera.disable();
            call?.microphone.disable();
        }
    }, [call, camMicEnabled]);

    //👇🏻 enable users to join calls
    const handleJoin = () => {
        call?.join();
        setConfirmJoin(true);
    };

    if (isCallLoading) return <p>Loading...</p>;

    if (!call) {
        return (
            <main className='min-h-screen w-full flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-red-600 mb-4'>Call Not Found</h1>
                    <p className='text-lg mb-6'>The meeting you're trying to join doesn't exist or has expired.</p>
                    <div className='space-y-4'>
                        <p className='text-sm text-gray-600'>
                            This might happen because:
                        </p>
                        <ul className='text-sm text-gray-600 text-left max-w-md mx-auto'>
                            <li>• The meeting ID is incorrect</li>
                            <li>• The meeting hasn't been created yet</li>
                            <li>• You need to sign in to create/join meetings</li>
                        </ul>
                        <button
                            onClick={() => router.push("/")}
                            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='min-h-screen w-full items-center justify-center'>
            <StreamCall call={call}>
                <StreamTheme>
                    {confirmJoin ? (
                        <MeetingRoom />
                    ) : (
                        <div className='flex flex-col items-center justify-center gap-5'>
                            <h1 className='text-3xl font-bold'>Join Call</h1>
                            <p className='text-lg'>
                                Are you sure you want to join this call?
                            </p>
                            <div className='flex gap-5'>
                                <button
                                    onClick={handleJoin}
                                    className='px-4 py-3 bg-green-600 text-green-50'
                                >
                                    Join
                                </button>
                                <button
                                    onClick={() => router.push("/")}
                                    className='px-4 py-3 bg-red-600 text-red-50'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    );
}
const MeetingRoom = () => {
    const router = useRouter();

    const handleLeave = () => {
        confirm("Are you sure you want to leave the call?") && router.push("/");
    };

    return (
        <section className='relative min-h-screen w-full overflow-hidden pt-4'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <PaginatedGridLayout />
                </div>
                <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
                    <CallControls onLeave={handleLeave} />
                </div>
            </div>
        </section>
    );
};