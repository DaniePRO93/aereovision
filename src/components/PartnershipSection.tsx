import { motion } from "framer-motion";
import partnershipBanner from "@/assets/partnership-banner.png";

const PartnershipSection = () => {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-neon-green font-heading uppercase tracking-widest text-sm mb-4 block">
            Nueva Alianza
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Equipo Oficial de Ciclismo
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Orgullosamente patrocinando al equipo de ciclismo de montaña, capturando cada aventura desde el cielo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={partnershipBanner}
            alt="Team AereoVision x 3D Prints GT Partnership"
            className="max-w-full md:max-w-2xl lg:max-w-3xl rounded-xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 text-base md:text-lg">
            Uniendo la pasión por el ciclismo de montaña con la captura aérea profesional.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
