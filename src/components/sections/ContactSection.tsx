import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Securely load keys from environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);
    if (!validate()) return;

    // Add a check to ensure environment variables are loaded correctly
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS environment variables are not set correctly. Check your .env.local file.');
      setSubmitMessage('The contact form is not configured correctly. Please contact the site owner directly.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_name: "Milan Singhal",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );
      console.log('SUCCESS!', result.status, result.text);
      setSubmitMessage('Your message has been sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error: any) {
      console.error('FAILED...', error);
      setSubmitMessage(`Error: ${error?.text || error?.message || 'Failed to send message. Please check console.'}`);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get In <span className="text-secondary dark:text-secondary-light">Touch</span>
          </h2>
          <p className="text-center text-lg text-text-light/70 dark:text-text-dark/70 mb-12 max-w-2xl mx-auto">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out!
          </p>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className={`bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-2xl space-y-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{transitionDelay: isVisible ? `200ms` : '0ms'}}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={isSubmitting}
            />
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text-light dark:text-text-dark">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border ${errors.message ? 'border-pink-500' : 'border-slate-300 dark:border-slate-600'} rounded-md text-sm shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary dark:focus:border-primary-light focus:ring-1 focus:ring-primary dark:focus:ring-primary-light disabled:opacity-50`}
            />
            {errors.message && <p className="mt-1 text-xs text-pink-600 dark:text-pink-400">{errors.message}</p>}
          </div>
          <div>
            <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
          {submitMessage && (
            <p className={`mt-4 text-sm ${submitMessage.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
