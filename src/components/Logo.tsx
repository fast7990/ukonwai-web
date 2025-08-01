import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block w-auto overflow-hidden">
      <h1 className="font-bold text-xl bg-muted w-auto">
        &nbsp;知识库&nbsp;
        <span className="text-background bg-foreground">&nbsp;AI&nbsp;</span>
      </h1>
    </Link>
  )
}
