import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Сторінка відображення markdown-документу політики (privacy, EULA, cookies, GDPR).
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.markdown Сирі тексти markdown (імпорт через `?raw`)
 */
export function LegalMarkdownPage({ title, markdown }) {
  return (
    <article className="page page-content legal-doc">
      <header className="page-header legal-doc-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">
          <Link className="btn btn-secondary" to="/">
            ← На головну
          </Link>
        </p>
      </header>
      <div className="legal-doc-body markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </article>
  );
}
