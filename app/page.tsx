import HowCard from '@/components/HowCard'

const howItems = [
  {
    tag: 'Create an Account',
    details: 'Sign up or sign in to access your personalized Assistant.',
    image: '/icons/user-regular.svg'
  },
  {
    tag: 'Speak with Assistant',
    details: 'Have real conversations and improve your fluency effortlessly.',
    image: '/icons/comment-dots-regular.svg'
  },
  {
    tag: 'Receive your Band',
    details: 'See where you stand—Band estimate and tips included.',
    image: '/icons/check-solid.svg'
  },
]

export default function Home() {
  return (
    <main className='flex flex-col gap-12'>
      <section className='flex flex-col gap-6 justify-center items-center bg-sky-200 py-10 px-9 rounded-xl shadow-xl'>
        <h1 className='text-3xl font-bold'>Your Very Own IELTS Speaking Assistant</h1>
        <p className='text-lg'>Get real speaking practice and smart feedback — talk your way to Band 9 with ease.</p>
        <button className='px-4 py-2 bg-sky-400 hover:bg-sky-300 rounded-md cursor-pointer shadow-md'>Get Started</button>
      </section>

      <section className='flex flex-col gap-7'>
        <div className='flex justify-center items-center'>
          <h2 className='text-3xl font-bold'>How It Works</h2>
        </div>

        <div className='flex justify-between items-center gap-3'>
          {howItems.map(item => (
            <HowCard key={item.tag} { ... item }/>
          ))}
        </div>
      </section>
    </main>
  );
}
