import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import "@/styles/redesign.css";
import { usePageSeo } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  usePageSeo({
    title: "Página no encontrada | AeroVision",
    description: "La página que buscas no existe. Vuelve al inicio de AeroVision.",
    path: location.pathname,
    robots: "noindex, follow",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div
      className="av-root"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        gap: 10,
      }}
    >
      <div className="av-grain" aria-hidden="true" />
      <div
        className="av-mono"
        style={{
          fontSize: 11,
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: "var(--av-muted)",
        }}
      >
        Señal perdida
      </div>
      <h1
        style={{
          fontFamily: "var(--av-font-display)",
          fontWeight: 600,
          fontSize: "clamp(80px, 16vw, 180px)",
          lineHeight: 1,
          margin: 0,
        }}
        className="av-grad-text"
      >
        404
      </h1>
      <p style={{ fontSize: 17, color: "var(--av-text2)", margin: "6px 0 26px" }}>
        Este vuelo no existe — la página que buscas no está aquí.
      </p>
      <Link to="/" className="av-cta">
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
