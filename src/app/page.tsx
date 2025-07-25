import { Button } from '@/components/ui/button'
import { Code } from 'lucide-react'
import HomeNav from '@/components/HomeNav'
import Slogan from '@/components/Slogan'
import StartButton from '@/app/start-button'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center text-center">
      <HomeNav />
      <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
        <span className="font-extrabold">知识库 AI</span>，智能写作 高效工作
      </h2>
      <Slogan />
      <section className="mt-10 flex justify-center space-x-4">
        <StartButton />
        <Button variant="secondary" className="text-base" size="lg">
          <Code className="h-4 w-4" />
          &nbsp;加入研发团队
        </Button>
      </section>
    </main>
  )
}
