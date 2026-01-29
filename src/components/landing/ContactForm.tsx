import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface ContactFormProps {
  isActive: boolean
}

export default function ContactForm({ isActive }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://functions.poehali.dev/123eddd1-1ed4-443f-b50d-305cba07f348', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: '108@okbssp.ru',
          ...formData
        })
      })

      if (response.ok) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        toast.error('Ошибка отправки. Попробуйте позже или позвоните нам.')
      }
    } catch (error) {
      toast.error('Ошибка отправки. Попробуйте позже или позвоните нам.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Input
        type="text"
        placeholder="Ваше имя"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
      />
      <Input
        type="tel"
        placeholder="Телефон"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
      />
      <Textarea
        placeholder="Опишите ваш объект и требования"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        rows={4}
        className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
      />
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white border-none"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
      </Button>
    </motion.form>
  )
}