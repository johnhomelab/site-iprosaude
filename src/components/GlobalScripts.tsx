import React from 'react'
import Script from 'next/script'

type ScriptPosition = 'head' | 'body'

type ParsedAttributes = Record<string, string | boolean>

const snippetTagRegex =
  /<(script|noscript|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>|<(meta|link|base)\b([^>]*)\/?>/gi

const attributeRegex = /([:@\w.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>`]+)))?/g

const reactAttributeNames: Record<string, string> = {
  charset: 'charSet',
  class: 'className',
  crossorigin: 'crossOrigin',
  'http-equiv': 'httpEquiv',
  referrerpolicy: 'referrerPolicy',
}

function parseAttributes(attributeString: string): ParsedAttributes {
  const attributes: ParsedAttributes = {}

  for (const match of attributeString.matchAll(attributeRegex)) {
    const [, rawName, doubleQuotedValue, singleQuotedValue, unquotedValue] = match
    const name = reactAttributeNames[rawName.toLowerCase()] ?? rawName
    attributes[name] = doubleQuotedValue ?? singleQuotedValue ?? unquotedValue ?? true
  }

  return attributes
}

function hasExecutableContent(value: string): boolean {
  return value.replace(/<!--[\s\S]*?-->/g, '').trim().length > 0
}

function renderInlineScript(content: string, position: ScriptPosition, key: string) {
  if (!hasExecutableContent(content)) {
    return null
  }

  return (
    <Script
      id={`payload-${position}-inline-${key}`}
      key={key}
      strategy={position === 'head' ? 'beforeInteractive' : 'afterInteractive'}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

function renderScriptTag(
  attributes: ParsedAttributes,
  content: string,
  position: ScriptPosition,
  key: string,
) {
  const scriptId = typeof attributes.id === 'string' ? attributes.id : `payload-${position}-script-${key}`
  const strategy = position === 'head' ? 'beforeInteractive' : 'afterInteractive'

  if (typeof attributes.src === 'string' && attributes.src.length > 0) {
    return <Script {...attributes} id={scriptId} key={key} strategy={strategy} />
  }

  return (
    <Script
      {...attributes}
      id={scriptId}
      key={key}
      strategy={strategy}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

function renderHtmlTag(
  tagName: string,
  attributes: ParsedAttributes,
  content: string,
  key: string,
) {
  if (tagName === 'noscript' || tagName === 'style') {
    return React.createElement(tagName, {
      ...attributes,
      key,
      dangerouslySetInnerHTML: { __html: content },
    })
  }

  return React.createElement(tagName, { ...attributes, key })
}

export function GlobalScripts({
  html,
  position,
}: {
  html?: string | null
  position: ScriptPosition
}) {
  if (!html?.trim()) {
    return null
  }

  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let index = 0

  for (const match of html.matchAll(snippetTagRegex)) {
    const [fullMatch, pairedTag, pairedAttributes = '', pairedContent = '', voidTag, voidAttributes = ''] =
      match
    const matchIndex = match.index ?? 0
    const beforeTag = html.slice(lastIndex, matchIndex)
    const inlineScript = renderInlineScript(beforeTag, position, `inline-${index}`)

    if (inlineScript) {
      nodes.push(inlineScript)
      index += 1
    }

    const tagName = (pairedTag ?? voidTag).toLowerCase()
    const attributes = parseAttributes(pairedTag ? pairedAttributes : voidAttributes)

    if (tagName === 'script') {
      nodes.push(renderScriptTag(attributes, pairedContent, position, `tag-${index}`))
    } else {
      nodes.push(renderHtmlTag(tagName, attributes, pairedContent, `tag-${index}`))
    }

    index += 1
    lastIndex = matchIndex + fullMatch.length
  }

  const remainingInlineScript = renderInlineScript(html.slice(lastIndex), position, `inline-${index}`)

  if (remainingInlineScript) {
    nodes.push(remainingInlineScript)
  }

  return <>{nodes}</>
}
