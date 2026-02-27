import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import ContactInfo from "./ContactInfo";

const Contact = () => {
    const [state, handleSubmit] = useForm("mwvnzoyy");

    if (state.succeeded) {
        return (
            <section
                id="contact"
                className="relative py-32 px-6 bg-linear-to-b from-blue-950 via-blue-900 to-blue-950"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-16 rounded-4xl backdrop-blur-xl bg-white/10 border border-white/20 text-white"
                    >
                        <h3 className="text-3xl font-bold mb-4">
                            🚀 Mensaje enviado con éxito
                        </h3>
                        <p className="text-blue-100/80">
                            Gracias por confiar en mí. Te responderé en menos de 24 horas.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="contact"
            className="relative py-32 px-6 bg-linear-to-b from-blue-950 via-blue-900 to-blue-950"
        >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                {/* Columna izquierda */}
                <ContactInfo />

                {/* Columna derecha */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="p-10 rounded-4xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
                >
                    <div className="flex flex-col gap-6">

                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Nombre completo"
                            className="px-6 py-4 rounded-2xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
                        />

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Correo electrónico"
                            className="px-6 py-4 rounded-2xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
                        />

                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                            className="text-red-300 text-sm"
                        />

                        <textarea
                            name="message"
                            required
                            rows={4}
                            placeholder="Cuéntame sobre tu proyecto..."
                            className="px-6 py-4 rounded-2xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition resize-none"
                        />

                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                            className="text-red-300 text-sm"
                        />

                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="bg-linear-to-r from-cyan-400 to-blue-500 text-blue-950 font-bold py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {state.submitting ? "Enviando..." : "Enviar mensaje"}
                        </button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;