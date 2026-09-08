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
  /** Logo de la marca. Sin él se dibuja el monograma del nombre. */
  logo?: string;
  /** El logo ya viene sobre fondo oscuro: va suelto, sin placa clara. */
  logoOnDark?: boolean;
  /** Captura de la portada del sitio, de fondo. */
  image?: string;
  className?: string;
}

/** Iniciales para las marcas que todavía no tienen logo. */
const monogram = (name: string): string =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

/**
 * Tarjeta de producto/proyecto: captura del sitio de fondo, logo grande al
 * centro, botón y ficha de texto debajo. Es el elemento que se repite en el
 * home, /products y /portfolio.
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
  logo,
  logoOnDark = false,
  image,
  className = "",
}: DeviceCardProps) => {
  const style = { "--card-accent": accent, "--card-accent2": accent2 } as CSSProperties;

  const inner = (
    <>
      <div className="sv-frame">
        {image && <img className="sv-frame__img" src={image} alt="" loading="lazy" />}

        <div className="sv-frame__mark">
          {logo ? (
            <span
              className={`sv-logo ${logoOnDark ? "sv-logo--dark" : ""}`.trim()}
              aria-hidden="true"
            >
              <img src={logo} alt="" loading="lazy" />
            </span>
          ) : (
            <span className="sv-logo sv-logo--mono" aria-hidden="true">
              {monogram(name)}
            </span>
          )}

          <strong>{name}</strong>
          <span className="sv-frame__kind">{kind}</span>
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
