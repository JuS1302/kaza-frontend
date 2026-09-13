'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'kasa_messages'

export type ChatMessage = {
  id: string
  author: 'me' | 'host'
  text: string
  sentAt: number
}

export type Conversation = {
  id: string
  hostName: string
  hostPicture: string
  propertyTitle: string
  messages: ChatMessage[]
}

type ConversationMap = Record<string, Conversation>

/**
 * Gère les conversations de messagerie avec persistance dans localStorage.
 * Il n'existe pas encore de route API de messagerie côté backend : les messages
 * envoyés restent donc uniquement dans le navigateur, aucun hôte ne les reçoit réellement.
 */
export function useMessages() {
  const [conversations, setConversations] = useState<ConversationMap>({})

  useEffect(() => {
    function loadConversations() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setConversations(JSON.parse(stored))
    }
    loadConversations()
  }, [])

  /** Crée la conversation avec cet hôte si elle n'existe pas encore (sinon ne fait rien) */
  function startConversation(id: string, hostName: string, hostPicture: string, propertyTitle: string) {
    setConversations(prev => {
      if (prev[id]) return prev
      const next: ConversationMap = {
        ...prev,
        [id]: {
          id,
          hostName,
          hostPicture,
          propertyTitle,
          messages: [
            {
              id: crypto.randomUUID(),
              author: 'host',
              text: `Bonjour, merci pour votre message concernant « ${propertyTitle} ». Je vous réponds dès que possible !`,
              sentAt: Date.now(),
            },
          ],
        },
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  function sendMessage(conversationId: string, text: string) {
    setConversations(prev => {
      const conversation = prev[conversationId]
      if (!conversation) return prev
      const message: ChatMessage = { id: crypto.randomUUID(), author: 'me', text, sentAt: Date.now() }
      const next = { ...prev, [conversationId]: { ...conversation, messages: [...conversation.messages, message] } }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  function deleteConversation(conversationId: string) {
    setConversations(prev => {
      const next = { ...prev }
      delete next[conversationId]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return { conversations, startConversation, sendMessage, deleteConversation }
}
