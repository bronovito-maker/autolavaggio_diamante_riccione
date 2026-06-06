"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Map, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ContactsSection() {
  const t = useTranslations("Contacts");

  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
    modello: "",
    servizio: "Lavaggio Manuale Certificato",
    note: ""
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Chiudi il dropdown se clicchi fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceOptions = [
    { value: "Lavaggio Manuale Certificato", label: t("opt_wash") },
    { value: "Cura degli Interni Premium", label: t("opt_interior") },
    { value: "Trattamento Completo", label: t("opt_full") }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Costruisci il messaggio per WhatsApp
    const message = `*Nuova Richiesta Appuntamento*%0A%0A*Nome:* ${formData.nome}%0A*Telefono:* ${formData.telefono}%0A*Modello Auto/Moto:* ${formData.modello}%0A*Servizio d'interesse:* ${formData.servizio}%0A*Note:* ${formData.note || "Nessuna nota aggiuntiva."}`;
    
    // Numero di telefono di destinazione (con prefisso internazionale, senza + o spazi)
    const phoneNumber = "393291610065";
    
    // Crea l'URL e aprilo in una nuova scheda
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 bg-surface border-t border-white/5 relative" id="contatti">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col space-y-8"
          >
            <div>
              <h2 
                className="text-4xl font-serif text-primary mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: t("title") }}
              />
              <p className="text-secondary mb-8">
                {t("subtitle")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-1">Indirizzo</h4>
                  <p className="text-secondary text-sm">Viale Portofino, 51<br />47838 Riccione RN</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-1">Telefono / WhatsApp</h4>
                  <a href="tel:+393291610065" className="text-secondary text-sm hover:text-accent-gold transition-colors">329 161 0065</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-1">Email</h4>
                  <a href="mailto:usmanasghar565@gmail.com" className="text-secondary text-sm hover:text-accent-gold transition-colors">usmanasghar565@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-1">Orari</h4>
                  <p className="text-secondary text-sm">Lun - Sab: 08:00 – 19:30<br />Dom: 08:00 – 13:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <div className="bg-background border border-white/5 p-8 rounded-lg">
              <div className="relative z-10">
                <h3 className="text-2xl font-serif text-primary mb-2">{t("form_title")}</h3>
                <p className="text-secondary mb-8">{t("form_subtitle")}</p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t("lbl_name")}
                    </label>
                    <input 
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder={t("ph_name")}
                      required
                      className="w-full bg-background border border-accent-gold/40 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent-gold transition-colors placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t("lbl_phone")}
                    </label>
                    <input 
                      type="tel" 
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder={t("ph_phone")}
                      required
                      className="w-full bg-background border border-accent-gold/40 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent-gold transition-colors placeholder:text-white/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        {t("lbl_model")}
                      </label>
                      <input 
                        type="text" 
                        name="modello"
                        value={formData.modello}
                        onChange={handleChange}
                        placeholder={t("ph_model")}
                        required
                        className="w-full bg-background border border-accent-gold/40 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent-gold transition-colors placeholder:text-white/50"
                      />
                    </div>
                    <div ref={dropdownRef}>
                      <label className="block text-sm font-medium text-primary mb-2">
                        {t("lbl_service")}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full bg-background border border-accent-gold/40 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent-gold transition-colors flex items-center justify-between"
                        >
                          <span className={formData.servizio ? "text-primary" : "text-white/50"}>
                            {serviceOptions.find(o => o.value === formData.servizio)?.label || "Seleziona..."}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-accent-gold transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isDropdownOpen && (
                          <div className="absolute z-50 w-full mt-2 bg-surface border border-accent-gold/40 rounded-lg shadow-xl overflow-hidden">
                            {serviceOptions.map((option) => (
                              <div
                                key={option.value}
                                onClick={() => {
                                  setFormData({...formData, servizio: option.value});
                                  setIsDropdownOpen(false);
                                }}
                                className={`px-4 py-3 cursor-pointer transition-colors hover:bg-accent-gold/10 ${formData.servizio === option.value ? 'bg-accent-gold/20 text-accent-gold' : 'text-primary'}`}
                              >
                                {option.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      {t("lbl_notes")}
                    </label>
                    <textarea 
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      rows={3}
                      placeholder={t("ph_notes")}
                      className="w-full bg-background border border-accent-gold/40 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-accent-gold transition-colors placeholder:text-white/50 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("btn_submit")}
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-16 w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 relative">
              <iframe 
                src="https://maps.google.com/maps?q=Autolavaggio%20Diamante%20Riccione,%20Viale%20Portofino,%2051,%2047838%20Riccione%20RN&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 hover:opacity-100 transition-opacity duration-700"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
