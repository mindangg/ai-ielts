import AssistantComponent from '@/components/AssistantComponent'
import Image from 'next/image'

const Assistant = () => {
    return (
        <main>
            <article className='flex border border-black rounded-4xl justify-between p-6 max:md-flex-col'>
                <div className='flex items-center gap-2'>
                    <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden'>
                        <Image 
                            src='/images/IELTSpeak.png'
                            alt='IELTSpeak'
                            width={70}
                            height={70}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-xl font-bold'>Part 1</p>
                        <p>Topic opdasfaoifaifaifapofiapif</p>
                    </div>
                </div>
                <div className='flex items-center text-2xl max-md:hidden'>
                    15 minutes
                </div>
            </article>
            <AssistantComponent />
        </main>
    )
}

export default Assistant