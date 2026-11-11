'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'

type Message = { id: string; role: 'user' | 'assistant'; content: string }

const welcome: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Bonjour, je suis l’assistant virtuel PHARLOG. Je peux vous renseigner sur le WMS GCO, votre LGO, le déroulement d’un projet, les fournitures, les réalisations et toutes les pages du site. Que souhaitez-vous savoir ?',
}
const starters = [
  'Comment se déroule un projet PHARLOG ?',
  'Que peut améliorer le WMS dans mon dépôt ?',
  'Le WMS est-il compatible avec mon LGO ?',
  'Quelles fournitures proposez-vous ?',
]

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([welcome])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function send(text: string) {
    const content = text.trim().slice(0, 1500)
    if (!content || loading) return
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content }
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next
            .filter((message) => message.id !== 'welcome')
            .map(({ role, content: value }) => ({ role, content: value })),
        }),
      })
      const data = (await response.json()) as { answer?: string; error?: string }
      if (!response.ok || !data.answer) throw new Error(data.error || 'Réponse indisponible.')
      setMessages((items) => [
        ...items,
        { id: crypto.randomUUID(), role: 'assistant', content: data.answer as string },
      ])
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void send(input)
  }

  function reset() {
    setMessages([welcome])
    setError('')
    setInput('')
  }

  return (
    <div className="fixed bottom-3 right-3 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="Assistant conversationnel PHARLOG"
          className="mb-3 flex h-[min(700px,calc(100dvh-6rem))] w-[min(430px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-violet-950/10 bg-white shadow-[0_30px_90px_-25px_rgba(24,21,41,.55)]"
        >
          <header className="flex items-center gap-3 bg-[#30106f] p-4 text-white sm:p-5">
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#17b8c9] font-display text-lg font-extrabold text-[#092f34]">
              P
              <i className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#30106f] bg-emerald-400" />
            </span>
            <div className="min-w-0 flex-1">
              <b className="font-display">Assistant PHARLOG</b>
              <p className="truncate text-xs text-violet-200">
                Spécialisé en logistique officinale
              </p>
            </div>
            <button
              onClick={reset}
              className="rounded-full px-2 py-1 text-xs font-semibold text-violet-200 hover:bg-white/10"
              title="Nouvelle conversation"
            >
              Effacer
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-2xl"
              aria-label="Fermer le chatbot"
            >
              ×
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto bg-[#f7f7fb] p-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#30106f] text-xs font-extrabold text-white">
                    P
                  </span>
                )}
                <div
                  className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === 'assistant' ? 'rounded-bl-md bg-white text-[#403d4d]' : 'rounded-br-md bg-[#5b21c4] text-white'}`}
                >
                  {message.content.split('\n').map((line, index) => (
                    <span key={`${message.id}-${index}`} className="block empty:h-2">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="grid gap-2 pl-9">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    onClick={() => void send(starter)}
                    className="rounded-xl border border-violet-200 bg-white px-3 py-2.5 text-left text-xs font-semibold text-[#5b21c4] hover:border-[#5b21c4] hover:bg-violet-50"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="flex items-end gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#30106f] text-xs font-extrabold text-white">
                  P
                </span>
                <div
                  className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-4 shadow-sm"
                  aria-label="L’assistant écrit"
                >
                  <i className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-.2s]" />
                  <i className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-.1s]" />
                  <i className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-800">
                <p>{error}</p>
                <button
                  onClick={() => void send(messages.at(-1)?.content || '')}
                  className="mt-2 font-bold underline"
                >
                  Réessayer
                </button>
              </div>
            )}
          </div>

          <form onSubmit={submit} className="border-t border-violet-950/10 bg-white p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-violet-950/15 p-1.5 focus-within:border-[#5b21c4]">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    void send(input)
                  }
                }}
                rows={1}
                maxLength={1500}
                placeholder="Écrivez votre question…"
                aria-label="Votre question"
                className="max-h-28 min-h-11 flex-1 resize-none border-0 px-3 py-2 text-sm outline-none"
              />
              <button
                disabled={!input.trim() || loading}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#5b21c4] font-bold text-white disabled:opacity-40"
                aria-label="Envoyer"
              >
                ↑
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-[#777281]">
              <span>L’assistant peut se tromper. Vérifiez les informations importantes.</span>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="font-bold text-[#5b21c4]"
              >
                Parler à un expert
              </Link>
            </div>
          </form>
        </section>
      )}
      <button
        onClick={() => setOpen((value) => !value)}
        className="ml-auto flex h-15 items-center gap-2 rounded-full bg-[#30106f] px-4 font-bold text-white shadow-xl transition hover:-translate-y-1 sm:px-5"
        aria-expanded={open}
        aria-label="Ouvrir l’assistant PHARLOG"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[#17b8c9] text-[#092f34]">
          P
          <i className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#30106f] bg-emerald-400" />
        </span>
        <span className="hidden sm:inline">Assistant PHARLOG</span>
      </button>
    </div>
  )
}
