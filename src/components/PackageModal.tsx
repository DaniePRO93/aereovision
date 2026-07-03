import { useEffect, useMemo, useState } from "react";
import type { Service } from "@/data/services";
import { waLink } from "@/lib/whatsapp";

interface PackageModalProps {
  service: Service;
  onClose: () => void;
}

/** Tier + add-on selector with a live estimated total and a WhatsApp CTA. */
const PackageModal = ({ service, onClose }: PackageModalProps) => {
  const popular = service.tiers.find((t) => t.popular) ?? service.tiers[0];
  const [tierName, setTierName] = useState(popular.name);
  const [extras, setExtras] = useState<string[]>([]);

  const tier = service.tiers.find((t) => t.name === tierName) ?? service.tiers[0];

  const total = useMemo(() => {
    const extrasTotal = extras.reduce(
      (sum, name) => sum + (service.extras.find((e) => e.name === name)?.price ?? 0),
      0
    );
    return tier.price + extrasTotal;
  }, [extras, service.extras, tier.price]);

  const waHref = useMemo(() => {
    let msg = `¡Hola AeroVision! Me interesa ${service.title} — paquete ${tier.name} ($${tier.price}).`;
    if (extras.length) msg += ` Extras: ${extras.join(", ")}.`;
    msg += ` Total estimado: $${total}. ¿Cuándo podemos grabar?`;
    return waLink(msg);
  }, [service.title, tier.name, tier.price, extras, total]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const toggleExtra = (name: string) =>
    setExtras((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  return (
    <div
      className="av-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Paquetes de ${service.title}`}
    >
      <div className="av-modal">
        <button onClick={onClose} aria-label="Cerrar" className="av-close">
          ✕
        </button>

        <div className="av-card-tag" style={{ marginBottom: 10 }}>
          {service.tag}
        </div>
        <h3
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--av-font-display)",
            fontWeight: 600,
            fontSize: "clamp(26px, 3.4vw, 40px)",
            lineHeight: 1.02,
            maxWidth: "90%",
            color: "var(--av-text)",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            margin: "0 0 28px",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--av-text2)",
            maxWidth: "60ch",
          }}
        >
          {service.blurb}
        </p>

        {/* Tiers */}
        <div className="av-tiergrid">
          {service.tiers.map((t) => {
            const selected = t.name === tierName;
            return (
              <div
                key={t.name}
                onClick={() => setTierName(t.name)}
                className={`av-tier ${selected ? "av-tier--sel" : ""}`}
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setTierName(t.name);
                  }
                }}
              >
                <div className="av-tier-head">
                  <span className="av-tier-name">{t.name}</span>
                  {t.popular && <span className="av-tier-pop">Más popular</span>}
                </div>
                <div className="av-tier-price">${t.price}</div>
                <ul>
                  {t.items.map((it) => (
                    <li key={it}>
                      <b>✓</b>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Add-ons */}
        <div
          className="av-mono"
          style={{
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--av-muted)",
            marginBottom: 14,
          }}
        >
          Extras opcionales
        </div>
        <div className="av-extragrid">
          {service.extras.map((extra) => {
            const checked = extras.includes(extra.name);
            return (
              <label
                key={extra.name}
                className={`av-extra ${checked ? "av-extra--sel" : ""}`}
              >
                <span className="av-extra-name">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleExtra(extra.name)}
                  />
                  {extra.name}
                </span>
                <span className="av-extra-price">+${extra.price}</span>
              </label>
            );
          })}
        </div>

        {/* Total + CTA */}
        <div className="av-total-row">
          <div>
            <div className="av-price-label">Total estimado</div>
            <div className="av-total">${total}</div>
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="av-cta">
            Pedir por WhatsApp <span className="av-mono">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
