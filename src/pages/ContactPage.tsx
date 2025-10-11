import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import { FaBehance, FaTelegram, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactMethods = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'youssefhamad007@gmail.com',
      href: 'mailto:youssefhamad007@gmail.com',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+20 120 074 5033',
      href: 'tel:+201200745033',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Egypt',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const socialLinks = [
    { icon: FiLinkedin, href: 'https://linkedin.com/in/youssef-hamad-uxui', color: 'hover:bg-blue-500/20' },
    { icon: FiGithub, href: 'https://github.com/youssefhamad007', color: 'hover:bg-gray-500/20' },
    { icon: FaBehance, href: 'https://behance.net/yourprofile', color: 'hover:bg-blue-400/20' },
    { icon: FiInstagram, href: 'https://instagram.com/yourprofile', color: 'hover:bg-pink-500/20' },
    { icon: FaTelegram, href: 'https://t.me/yourprofile', color: 'hover:bg-blue-300/20' },
    { icon: FaWhatsapp, href: 'https://wa.me/201200745033', color: 'hover:bg-green-500/20' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Contact Info */}
        <motion.div 
          className="flex-1 p-8 lg:p-12 flex flex-col justify-between mt-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-6xl h-[150px] font-black mb- bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Let's Create<br />Together
              </h1>
              <p className="text-xl text-gray-400 mb-12 max-w-md">
                Ready to bring your ideas to life? Let's discuss your project and create something amazing.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  className={`flex items-center gap-6 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} group-hover:scale-110 transition-transform`}>
                    <method.icon className="text-2xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{method.label}</div>
                    <div className="text-md md:text-lg font-semibold">{method.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 lg:mt-0"
          >
            <div className="text-gray-400 mb-4">Follow me</div>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`p-4 rounded-xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:scale-110`}
                  whileHover={{ rotate: 5 }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Panel - Contact Form */}
        <motion.div 
          className="flex-1 bg-white/5 backdrop-blur-md border-t lg:border-l border-white/10 p-8 lg:p-12 lg:pt-[120px] xl:pt-[120px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-2">Send Message</h2>
            <p className="text-gray-400 mb-8">Get in touch and let's start a conversation</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:border-blue-500 transition-all duration-300 placeholder-gray-500"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:border-blue-500 transition-all duration-300 placeholder-gray-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}