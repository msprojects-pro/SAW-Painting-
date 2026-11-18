import { useState, useEffect, type FormEvent, type RefObject } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import type { ServiceOption } from './Services';

// Replace with your Web3Forms public access key from https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

interface ContactProps {
  selectedService: ServiceOption;
  onServiceChange: (service: ServiceOption) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function Contact({
  selectedService,
  onServiceChange,
  nameInputRef,
}: ContactProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<ServiceOption>(selectedService);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    setService(selectedService);
  }, [selectedService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/[\s()-]/g, '');
    if (cleanPhone.length < 7 || !/^[+\d][\d\s()-]{6,}$/.test(phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please tell us a little about your project (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    setErrors({});
    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Enquiry: ${service} — ${fullName.trim()}`,
          from_name: 'S.A.W Website Enquiry',
          name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service,
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(
          'Thank you for your enquiry. We have received your message and will get back to you shortly.'
        );
        setFullName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setFeedbackMessage(
          WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY'
            ? 'The contact form awaits your Web3Forms API key configuration. Please call, WhatsApp, or email us directly using the buttons alongside.'
            : data.message ||
                'We could not submit your enquiry right now. Please call, WhatsApp, or email us directly.'
        );
      }
    } catch {
      setStatus('error');
      setFeedbackMessage(
        'A network error occurred while sending your enquiry. Please call, WhatsApp, or email us directly.'
      );
    }
  };

  const mailtoFallback = `mailto:Stuwalton@hotmail.co.uk?subject=${encodeURIComponent(
    `Enquiry: ${service}`
  )}&body=${encodeURIComponent(
    `Name: ${fullName}\nPhone: ${phone}\nService: ${service}\n\n${message}`
  )}`;

  return (
    <section
      id="contact"
      className="bg-[#10264B] text-white py-16 sm:py-20 lg:py-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Details & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#2878E5] mb-3">
              Contact Us
            </p>

            <h2
              className="font-display font-bold text-white tracking-tight leading-[1.15] mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                textWrap: 'balance',
              }}
            >
              Ready To Transform Your Home?
            </h2>

            <p className="text-base text-white/85 leading-relaxed mb-8 max-w-md">
              Have a painting, decorating or flooring project in mind? Get in touch today to discuss your requirements.
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-5 mb-8 py-6 border-t border-b border-white/15">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-white/10 text-[#2878E5] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/65 mb-0.5">
                    Phone
                  </p>
                  <a
                    href="tel:+447725746013"
                    className="text-lg font-semibold text-white hover:text-[#2878E5] transition-colors tabular-nums"
                  >
                    +44 7725 746013
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-white/10 text-[#2878E5] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/65 mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:Stuwalton@hotmail.co.uk"
                    className="text-lg font-semibold text-white hover:text-[#2878E5] transition-colors break-all"
                  >
                    Stuwalton@hotmail.co.uk
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+447725746013"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#2878E5] hover:bg-[#1746A2] rounded-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>CALL NOW</span>
              </a>

              <a
                href="https://wa.me/447725746013"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#10264B] bg-white hover:bg-[#F3F6FA] rounded-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2878E5]"
              >
                <MessageCircle className="w-4 h-4 text-[#1746A2]" aria-hidden="true" />
                <span>WHATSAPP</span>
              </a>

              <a
                href="mailto:Stuwalton@hotmail.co.uk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2878E5]"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>EMAIL</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white text-[#252D3A] p-6 sm:p-8 lg:p-10 rounded-sm shadow-xl border border-white/10">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#10264B] mb-2">
                Request a Free Quote
              </h3>
              <p className="text-sm text-[#252D3A]/80 mb-6">
                Fill in your project details below and we will get back to you promptly.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium text-[#10264B] mb-1.5"
                    >
                      Full Name <span className="text-[#1746A2]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="full-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      placeholder="John Smith"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#10264B] bg-[#F3F6FA] border rounded-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2878E5] transition-colors ${
                        errors.fullName ? 'border-red-600' : 'border-[#10264B]/15'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-700 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-medium text-[#10264B] mb-1.5"
                    >
                      Phone Number <span className="text-[#1746A2]">*</span>
                    </label>
                    <input
                      id="phone-number"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="+44 7700 900123"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#10264B] bg-[#F3F6FA] border rounded-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2878E5] transition-colors ${
                        errors.phone ? 'border-red-600' : 'border-[#10264B]/15'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-700 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-[#10264B] mb-1.5"
                    >
                      Email Address <span className="text-[#1746A2]">*</span>
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@example.co.uk"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#10264B] bg-[#F3F6FA] border rounded-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2878E5] transition-colors ${
                        errors.email ? 'border-red-600' : 'border-[#10264B]/15'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-700 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="service-required"
                      className="block text-sm font-medium text-[#10264B] mb-1.5"
                    >
                      Service Required
                    </label>
                    <select
                      id="service-required"
                      name="service"
                      value={service}
                      onChange={(e) => {
                        const val = e.target.value as ServiceOption;
                        setService(val);
                        onServiceChange(val);
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#10264B] bg-[#F3F6FA] border border-[#10264B]/15 rounded-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2878E5] transition-colors"
                    >
                      <option value="Painting">Painting</option>
                      <option value="Decorating">Decorating</option>
                      <option value="Flooring">Flooring</option>
                      <option value="Multiple Services">Multiple Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-message"
                    className="block text-sm font-medium text-[#10264B] mb-1.5"
                  >
                    Message <span className="text-[#1746A2]">*</span>
                  </label>
                  <textarea
                    id="project-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Tell us about the rooms, surfaces, or flooring you would like transformed..."
                    className={`w-full px-3.5 py-2.5 text-sm text-[#10264B] bg-[#F3F6FA] border rounded-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2878E5] transition-colors resize-y ${
                      errors.message ? 'border-red-600' : 'border-[#10264B]/15'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-700 font-medium">{errors.message}</p>
                  )}
                </div>

                {status === 'success' && (
                  <div
                    role="status"
                    className="p-4 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm font-medium">{feedbackMessage}</p>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    role="alert"
                    className="p-4 rounded-sm bg-amber-50 border border-amber-200 text-amber-950 space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm font-medium">{feedbackMessage}</p>
                    </div>
                    <div className="pl-8">
                      <a
                        href={mailtoFallback}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1746A2] hover:text-[#2878E5] underline underline-offset-4"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Open in Email App Instead</span>
                      </a>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1746A2] hover:bg-[#2878E5] disabled:opacity-70 disabled:cursor-not-allowed rounded-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10264B]"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>SEND ENQUIRY</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
