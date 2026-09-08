import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

interface DeviceCardProps {
  name: string;
  /** Línea bajo la marca dentro del marco (categoría). */
  kind: string;
  /** Texto del botón dentro del marco. */
  action: string;
  /** Descripción impresa debajo del marco. */
  caption: ReactNode;
  domain: string;
  href: string;
  internal: boolean;
  accent: string;
  accent2: string;
  badge: string;
  image?: string;
  className?: string;
}

/**
 * Tarjeta de producto/proyecto con marco tipo pantalla, insignia flotante,
 * botón y ficha de texto debajo. Es el elemento que se repite en el home,
 * /products y /portfolio.
 */
const DeviceCard = ({
  name,
  kind,
  action,
  caption,
  domain,
  href,
  internal,
  accent,
  accent2,
  badge,
  image,
  className = "",
}: DeviceCardProps) => {
  const style = { "--card-accent": accent, "--card-accent2": accent2 } as CSSProperties;

  const inner = (
    <>
      <div className="sv-frame">
        {image && <img className="sv-frame__img" src={image} alt="" loading="lazy" />}
        <span className="sv-badge" aria-hidden="true">
          {badge}
        </span>

        <div className="sv-frame__mark">
          <strong>{name}</strong>
          <span>{kind}</span>
        </div>

        <span className="sv-frame__btn">{action}</span>
      </div>

      <div className="sv-card__meta">
        <p>{caption}</p>
        <p className="sv-card__domain">{domain}</p>
      </div>
    </>
  );

  const classes = `sv-card ${className}`.trim();

  if (internal) {
    return (
      <Link to={href} className={classes} style={style} aria-label={`${name} — ${action}`}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      style={style}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} — ${action}`}
    >
      {inner}
    </a>
  );
};

export default DeviceCard;
