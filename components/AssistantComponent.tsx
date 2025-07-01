'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from '@/constants/soundwaves.json'
import { cn } from '@/lib/utils'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

const AssistantComponent = () => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isMuted, setIsMuted] = useState(false)

    const lottieRef = useRef<LottieRefCurrentProps>(null)

    return (
        <section className='flex flex-col h-70vh'>
            <section className='flex gap-8 max-sm:flex-col'>
                <div className='flex flex-col justify-center items-center border-2 border-sky-300 rounded-lg w-2/3 max-sm:w-full'>
                    <div className='flex items-center justify-center rounded-lg mt-4 size-[300px] max-sm:size-[100[px]'>
                        <div className={
                            cn('absolute transition-opacity duration-1000',
                            callStatus === CallStatus.FINISHED ||
                            callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0',
                            callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')
                        }>
                            <Image 
                                src='/images/IELTSpeak.png'
                                alt='IELTSpeak'
                                width={150}
                                height={150}
                                className="max-sm:w-fit"
                            />
                        </div>

                        <div 
                            className={
                            cn('absolute transition-opacity duration-1000', 
                            callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')
                        }>
                            <Lottie 
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="size-[300px] max-sm:size-[100px]"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">IETLSpeak Assistant</p>
                </div>
                
                <div className='flex flex-col gap-4 w-1/3 max-sm:w-full max-sm:flex-row'>
                    <div className='flex flex-col gap-4 justify-center items-center border-2 border-black rounded-xl py-8 max-sm:hidden'>
                        <Image 
                            src='/images/IELTSpeak.png'
                            alt='IELTSpeak'
                            width={130}
                            height={130}
                            className="rounded-lg"
                        />
                        <p className="font-bold text-2xl">
                            mindang
                        </p>
                    </div>
                    <button 
                        className='border-2 border-black rounded-lg flex flex-col gap-2 items-center py-8 max-sm:py-2 cursor-pointer w-full'
                    >
                        <Image 
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                            alt="mic"
                            width={36}
                            height={36}
                        />
                        <p className="max-sm:hidden">
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </p>
                    </button>
                    <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
                        callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary',
                        callStatus === CallStatus.CONNECTING && 'animate-pulse')}
                        // onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {callStatus === CallStatus.ACTIVE
                        ? "End Session"
                        : callStatus === CallStatus.CONNECTING
                            ? 'Connecting'
                        : 'Start Session'
                        }
                    </button>
                </div>
            </section>
        </section>
    )
}

export default AssistantComponent