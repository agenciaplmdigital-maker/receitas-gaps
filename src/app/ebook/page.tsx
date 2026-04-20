'use client'

export default function EbookPage() {
  return (
    <main className="w-full h-screen bg-beige">
      <iframe
        src="/downloads/protocolo-gaps.html"
        title="E-book Protocolo GAPS"
        className="w-full h-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </main>
  )
}
