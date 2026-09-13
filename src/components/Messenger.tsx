'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMessages } from '@/hooks/useMessages'
import { getPropertyById } from '@/lib/api'
import Icon from '@/components/Icon'
import Picture from '@/components/Picture'

export default function Messenger() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('propertyId')
  const { conversations, startConversation, sendMessage, deleteConversation } = useMessages()

  const [authChecked, setAuthChecked] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [showList, setShowList] = useState(true) // mobile : liste ou fil de discussion
  const bottomRef = useRef<HTMLDivElement>(null)

  // Garde d'authentification côté client : renvoie vers /login si aucun token
  useEffect(() => {
    function checkAuth() {
      const token = localStorage.getItem('kasa_token')
      if (!token) {
        const target = propertyId ? `/messages?propertyId=${propertyId}` : '/messages'
        router.replace(`/login?redirect=${encodeURIComponent(target)}`)
        return
      }
      setAuthChecked(true)
    }
    checkAuth()
  }, [router, propertyId])

  // Arrivée depuis le bouton "Contacter l'hôte" : ouvre (ou crée) la conversation avec ce logement
  useEffect(() => {
    if (!propertyId) return
    getPropertyById(propertyId)
      .then(property => {
        startConversation(property.id, property.host.name, property.host.picture, property.title)
        setActiveId(property.id)
        setShowList(false)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId])

  const list = Object.values(conversations).sort((a, b) => {
    const lastA = a.messages.at(-1)?.sentAt ?? 0
    const lastB = b.messages.at(-1)?.sentAt ?? 0
    return lastB - lastA
  })

  const active = activeId ? conversations[activeId] : undefined

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active?.messages.length])

  if (!authChecked) return null

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!activeId || !draft.trim()) return
    sendMessage(activeId, draft.trim())
    setDraft('')
  }

  function openConversation(id: string) {
    setActiveId(id)
    setShowList(false)
  }

  function handleDelete() {
    if (!active) return
    deleteConversation(active.id)
    setActiveId(null)
    setShowList(true)
  }

  return (
    <div className="px-4 md:px-8 lg:px-0 pt-6 md:pt-16 pb-10 max-w-5xl mx-auto">
      <h1 className="text-title text-red-main text-center mb-8">Messagerie</h1>

      <div className="bg-white rounded-[10px] border border-grey-light flex h-[70vh] min-h-[420px] overflow-hidden">
        {/* Liste des conversations */}
        <aside className={`w-full md:w-[320px] shrink-0 border-r border-grey-light overflow-y-auto ${showList ? 'block' : 'hidden'} md:block`}>
          {list.length === 0 ? (
            <p className="text-body-sm text-grey-dark p-6">
              Vous n&apos;avez pas encore de conversation. Contactez un hôte depuis une annonce pour démarrer une discussion.
            </p>
          ) : (
            list.map(conversation => {
              const last = conversation.messages.at(-1)
              return (
                <button
                  key={conversation.id}
                  onClick={() => openConversation(conversation.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-grey-light hover:bg-grey-light/60 cursor-pointer ${activeId === conversation.id ? 'bg-grey-light' : ''}`}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Picture fill src={conversation.hostPicture} alt="" className="!rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-label truncate">{conversation.hostName}</p>
                    <p className="text-caption text-grey-dark truncate">{last?.text}</p>
                  </div>
                </button>
              )
            })
          )}
        </aside>

        {/* Fil de discussion */}
        <div className={`flex-1 flex-col ${showList ? 'hidden' : 'flex'} md:flex`}>
          {active ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-grey-light">
                <button onClick={() => setShowList(true)} aria-label="Retour aux conversations" className="md:hidden shrink-0 cursor-pointer">
                  <Icon name="back" size={16} alt="" />
                </button>
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Picture fill src={active.hostPicture} alt="" className="!rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-label truncate">{active.hostName}</p>
                  <p className="text-caption text-grey-dark truncate">{active.propertyTitle}</p>
                </div>
                <button onClick={handleDelete} aria-label="Supprimer la conversation" className="shrink-0 cursor-pointer">
                  <Icon name="delete" size={18} alt="" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                {active.messages.map(message => (
                  <div
                    key={message.id}
                    className={`max-w-[75%] px-4 py-2 rounded-[10px] text-body-sm ${message.author === 'me' ? 'self-end bg-red-main text-white' : 'self-start bg-grey-light text-black'}`}
                  >
                    {message.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-grey-light">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Écrivez votre message..."
                  aria-label="Votre message"
                  className="flex-1 border border-grey-light rounded-lg px-3 py-2 text-body-md placeholder:text-grey-dark bg-white focus:outline-none focus:border-red-main"
                />
                <button type="submit" aria-label="Envoyer" className="shrink-0 cursor-pointer disabled:opacity-40" disabled={!draft.trim()}>
                  <Icon name="send" size={28} alt="" />
                </button>
              </form>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-grey-dark text-body-sm text-center px-6">
              Sélectionnez une conversation pour afficher les messages.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
