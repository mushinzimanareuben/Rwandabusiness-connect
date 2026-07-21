import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CATEGORIES, CITIES, DISTRICTS, DAYS } from '@/config/constants'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FiCheckCircle, FiInfo } from 'react-icons/fi'

export const BusinessForm = ({ initialData, onSubmit, submitLabel = 'Submit' }) => {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Default opening hours model
  const defaultHours = DAYS.reduce((acc, day) => {
    acc[day.id] = { open: '08:00', close: '17:00', closed: false }
    return acc
  }, {})

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      category: '',
      description: '',
      phone: '',
      whatsapp: '',
      email: '',
      website: '',
      address: '',
      city: '',
      district: '',
      sector: '',
      googleMapsUrl: '',
      logoUrl: '',
      coverUrl: '',
      gallery: [],
      openingHours: defaultHours,
    }
  })

  // Watch opening hours for conditional closed state rendering
  const hoursState = watch('openingHours')

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleFormSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Mock uploads if fields are empty
      const finalData = {
        ...data,
        logoUrl: data.logoUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80',
        coverUrl: data.coverUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        gallery: data.gallery && data.gallery.length > 0 ? data.gallery : [
          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'
        ]
      }
      await onSubmit(finalData)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Steps Indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center gap-2">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                step === num
                  ? 'bg-primary-600 border-primary-600 text-white shadow-glow-primary scale-110'
                  : step > num
                  ? 'bg-primary-100 border-primary-100 text-primary-600'
                  : 'bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-400 text-gray-400'
              }`}
            >
              {step > num ? <FiCheckCircle size={18} /> : num}
            </div>
            {num < 3 && (
              <div
                className={`h-0.5 w-16 md:w-24 transition-all ${
                  step > num ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-400'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-dark-400 flex items-center gap-2">
            <FiInfo className="text-primary-500" />
            <span>Basic Information</span>
          </h2>

          <Input
            label="Business Name"
            placeholder="e.g. Virunga Inn Lodge"
            error={errors.name}
            {...register('name', { required: 'Business name is required' })}
          />

          <Select
            label="Category"
            placeholder="Select a category"
            options={CATEGORIES.map((c) => ({ value: c.id, label: c.label }))}
            error={errors.category}
            {...register('category', { required: 'Category is required' })}
          />

          <Textarea
            label="Description"
            placeholder="Describe your business services, products, and specialties..."
            error={errors.description}
            rows={5}
            {...register('description', { required: 'Description is required' })}
          />

          <div className="flex justify-end pt-4">
            <Button onClick={handleNextStep}>Next Step</Button>
          </div>
        </Card>
      )}

      {/* Step 2: Contact & Location */}
      {step === 2 && (
        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-dark-400">
            Contact & Location Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              placeholder="+250 788 000 000"
              error={errors.phone}
              {...register('phone', { required: 'Phone number is required' })}
            />
            <Input
              label="WhatsApp Number (optional)"
              placeholder="+250 788 000 000"
              error={errors.whatsapp}
              {...register('whatsapp')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="contact@business.com"
              error={errors.email}
              {...register('email')}
            />
            <Input
              label="Website URL (optional)"
              placeholder="https://mybusiness.rw"
              error={errors.website}
              {...register('website')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="City"
              placeholder="Select City"
              options={CITIES.map((c) => ({ value: c.name, label: c.name }))}
              error={errors.city}
              {...register('city', { required: 'City is required' })}
            />
            <Select
              label="District"
              placeholder="Select District"
              options={DISTRICTS.map((d) => ({ value: d, label: d }))}
              error={errors.district}
              {...register('district', { required: 'District is required' })}
            />
            <Input
              label="Sector"
              placeholder="e.g. Kimihurura"
              error={errors.sector}
              {...register('sector', { required: 'Sector is required' })}
            />
          </div>

          <Input
            label="Physical Address"
            placeholder="e.g. KN 3 Rd, Kigali Heights, 3rd Floor"
            error={errors.address}
            {...register('address', { required: 'Address is required' })}
          />

          <Input
            label="Google Maps Embed URL (optional)"
            placeholder="https://www.google.com/maps/embed?pb=..."
            error={errors.googleMapsUrl}
            {...register('googleMapsUrl')}
          />

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={handlePrevStep}>
              Back
            </Button>
            <Button onClick={handleNextStep}>Next Step</Button>
          </div>
        </Card>
      )}

      {/* Step 3: Images & Hours */}
      {step === 3 && (
        <Card className="bg-white dark:bg-dark-900 border border-gray-150 dark:border-dark-400 p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-dark-400">
            Photos & Opening Hours
          </h2>

          {/* Simple Image Links Stubs (Fallback) */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">Listing Photos (URLs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Logo Image URL (optional)"
                placeholder="e.g. https://images.unsplash.com/..."
                error={errors.logoUrl}
                {...register('logoUrl')}
              />
              <Input
                label="Cover Image URL (optional)"
                placeholder="e.g. https://images.unsplash.com/..."
                error={errors.coverUrl}
                {...register('coverUrl')}
              />
            </div>
          </div>

          {/* Opening Hours Grid */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 border-b pb-1.5">Opening Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAYS.map((day) => (
                <div key={day.id} className="flex items-center justify-between gap-4 p-3 border border-gray-100 dark:border-dark-800 rounded-xl bg-gray-50/20">
                  <span className="font-bold text-xs uppercase text-gray-500 w-20">{day.label}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      className="px-2 py-1 text-xs border rounded-lg bg-white dark:bg-dark-800 border-gray-250 text-gray-800 dark:text-gray-100"
                      disabled={hoursState?.[day.id]?.closed}
                      {...register(`openingHours.${day.id}.open`)}
                    />
                    <span className="text-xs text-gray-400">to</span>
                    <input
                      type="time"
                      className="px-2 py-1 text-xs border rounded-lg bg-white dark:bg-dark-800 border-gray-250 text-gray-800 dark:text-gray-100"
                      disabled={hoursState?.[day.id]?.closed}
                      {...register(`openingHours.${day.id}.close`)}
                    />
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-500">
                    <input
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500"
                      {...register(`openingHours.${day.id}.closed`)}
                    />
                    <span>Closed</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-dark-400">
            <Button variant="secondary" onClick={handlePrevStep} disabled={isLoading}>
              Back
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {submitLabel}
            </Button>
          </div>
        </Card>
      )}
    </form>
  )
}
