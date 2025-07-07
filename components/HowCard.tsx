import Image from "next/image"


const HowCard = ({ tag, details, image} : HowCardProps) => {
    return (
        <div className='max-md:w-full flex flex-col justify-center items-center text-center gap-4 shadow-xl rounded-lg p-4'>
            <div>
                <Image 
                    src={image}
                    alt={tag}
                    width={40}
                    height={40}
                />
            </div>
            <p className='text-2xl font-medium'>{tag}</p>
            <p className='text-md'>{details}</p>
        </div>
    )
}

export default HowCard