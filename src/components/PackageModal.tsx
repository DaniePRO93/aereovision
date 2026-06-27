import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Service } from "@/data/services";
import { waLink } from "@/lib/whatsapp";

interface PackageModalProps {
  service: Service;
  onClose: () => void;
}

const mono: CSSProperties = { fontFamily: "'Space Mono', monospace" };

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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(6,5,3,.8)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(14px, 4vh, 50px) 16px",
        overflowY: "auto",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Paquetes de ${service.title}`}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 920,
          background: "#FFFFFF",
          border: "1px solid rgba(28,22,14,.14)",
          borderRadius: 12,
          padding: "clamp(22px, 3vw, 40px)",
          margin: "auto",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(28,22,14,.06)",
            border: "1px solid rgba(28,22,14,.16)",
            color: "#1E1813",
            fontSize: 18,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <div
          className="av-mono"
          style={{
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#E9A23B",
            marginBottom: 10,
          }}
        >
          {service.tag}
        </div>
        <h3
          style={{
            margin: "0 0 8px",
            fontWeight: 900,
            fontSize: "clamp(26px, 3.4vw, 38px)",
            lineHeight: 1.02,
            maxWidth: "90%",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            margin: "0 0 26px",
            fontSize: 15,
            lineHeight: 1.55,
            color: "#6E6556",
            maxWidth: "60ch",
          }}
        >
          {service.blurb}
        </p>

        {/* Tiers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginBottom: 26,
          }}
        >
          {service.tiers.map((t) => {
            const selected = t.name === tierName;
            return (
              <div
                key={t.name}
                onClick={() => setTierName(t.name)}
                style={{
                  cursor: "pointer",
                  minWidth: 0,
                  borderRadius: 9,
                  padding: 20,
                  transition:
                    "border-color .25s ease, background .25s ease, transform .25s ease",
                  border: selected
                    ? "1.5px solid #E9A23B"
                    : "1px solid rgba(28,22,14,.12)",
                  background: selected ? "rgba(233,162,59,.08)" : "#FFFFFF",
                  transform: selected ? "translateY(-2px)" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: 17 }}>{t.name}</span>
                  {t.popular && (
                    <span
                      className="av-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "#B5731A",
                      }}
                    >
                      Más popular
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 30,
                    color: "#E9A23B",
                    marginBottom: 16,
                  }}
                >
                  ${t.price}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  {t.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 9,
                        fontSize: 13,
                        lineHeight: 1.4,
                        color: "#564C3E",
                      }}
                    >
                      <span style={{ color: "#E9A23B", fontWeight: 700, flexShrink: 0 }}>
                        ✓
                      </span>
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
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#857B6A",
            marginBottom: 14,
          }}
        >
          Extras opcionales
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {service.extras.map((extra) => {
            const checked = extras.includes(extra.name);
            return (
              <label
                key={extra.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  cursor: "pointer",
                  borderRadius: 8,
                  padding: "12px 14px",
                  transition: "border-color .2s ease, background .2s ease",
                  border: checked
                    ? "1px solid rgba(233,162,59,.4)"
                    : "1px solid rgba(28,22,14,.1)",
                  background: checked ? "rgba(233,162,59,.06)" : "#FFFFFF",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleExtra(extra.name)}
                    style={{ width: 17, height: 17, accentColor: "#E9A23B", cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 13.5, color: "#2A2218" }}>{extra.name}</span>
                </span>
                <span
                  className="av-mono"
                  style={{ fontSize: 13, fontWeight: 700, color: "#E9A23B" }}
                >
                  +${extra.price}
                </span>
              </label>
            );
          })}
        </div>

        {/* Total + CTA */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            paddingTop: 22,
            borderTop: "1px solid rgba(28,22,14,.1)",
          }}
        >
          <div>
            <div
              className="av-mono"
              style={{
                fontSize: 11,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#857B6A",
              }}
            >
              Total estimado
            </div>
            <div style={{ fontWeight: 900, fontSize: 36, color: "#1E1813" }}>${total}</div>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="av-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: "#221A0C",
              fontWeight: 800,
              fontSize: 16,
              padding: "16px 30px",
              borderRadius: 100,
              textDecoration: "none",
            }}
          >
            Pedir por WhatsApp <span style={mono}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
