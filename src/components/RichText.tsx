import React from 'react';
import { SmartText } from './SmartText';

export const RichText: React.FC<{ content: any; className?: string }> = ({ content, className }) => {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  return (
    <div className={className}>
      {serialize(content.root.children)}
    </div>
  );
};

const serialize = (children: any[]): React.ReactNode[] => {
  return children.map((node, i) => {
    if (node.type === 'text') {
      let text = <SmartText text={node.text} />;

      if (node.format & 1) {
        text = <strong key={i}>{text}</strong>;
      }
      if (node.format & 2) {
        text = <em key={i}>{text}</em>;
      }
      if (node.format & 8) {
        text = <u key={i}>{text}</u>;
      }
      if (node.format & 16) {
        text = <code key={i}>{text}</code>;
      }

      return <React.Fragment key={i}>{text}</React.Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={i} className="text-4xl font-bold mb-4">{serialize(node.children)}</h1>;
      case 'h2':
        return <h2 key={i} className="text-3xl font-bold mb-3">{serialize(node.children)}</h2>;
      case 'h3':
        return <h3 key={i} className="text-2xl font-bold mb-2">{serialize(node.children)}</h3>;
      case 'h4':
        return <h4 key={i} className="text-xl font-bold mb-2">{serialize(node.children)}</h4>;
      case 'h5':
        return <h5 key={i} className="text-lg font-bold mb-1">{serialize(node.children)}</h5>;
      case 'h6':
        return <h6 key={i} className="text-base font-bold mb-1">{serialize(node.children)}</h6>;
      case 'quote':
        return <blockquote key={i} className="border-l-4 border-gray-300 pl-4 italic">{serialize(node.children)}</blockquote>;
      case 'ul':
        return <ul key={i} className="list-disc pl-5 mb-4">{serialize(node.children)}</ul>;
      case 'ol':
        return <ol key={i} className="list-decimal pl-5 mb-4">{serialize(node.children)}</ol>;
      case 'li':
        return <li key={i}>{serialize(node.children)}</li>;
      case 'link':
        return (
          <a href={node.fields.url} key={i} className="text-blue-600 hover:underline">
            {serialize(node.children)}
          </a>
        );
      case 'paragraph':
        return (
            <p key={i} className="mb-4">
                {serialize(node.children)}
            </p>
        );

      default:
        return <React.Fragment key={i}>{serialize(node.children)}</React.Fragment>;
    }
  });
};
