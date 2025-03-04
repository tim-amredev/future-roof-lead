"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Home,
  Layers,
  Construction,
  AlertTriangle,
  Clock,
  DollarSign,
  Phone,
  Mail,
  MessageSquare,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import ProgressRing from "./progress-ring"
import AchievementBadge from "./achievement-badge"
import Celebration from "./celebration"

import RoofTypeSelector from "./roof-type-selector"
import MaterialSelector from "./material-selector"
import MultiSelectOptions from "./multi-select-options"
import TimeframeSelector from "./timeframe-selector"
import BudgetSelector from "./budget-selector"
import RankingSelector from "./ranking-selector"
import ContactMethodSelector from "./contact-method-selector"

export default function QuoteForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const progress = Math.round((completedSteps.length / totalSteps) * 100)

  const achievements = [
    {
      title: "Project Initialized",
      description: "Complete the basic information",
      step: 1,
    },
    {
      title: "Tech Specs Added",
      description: "Specify your roof details",
      step: 2,
    },
    {
      title: "Requirements Set",
      description: "Define your project specifics",
      step: 3,
    },
    {
      title: "Parameters Defined",
      description: "Set your preferences and budget",
      step: 4,
    },
    {
      title: "Final Configuration",
      description: "Complete contact information",
      step: 5,
    },
  ]

  const onSubmit = async (data: any) => {
    setShowCelebration(true)
    // Here you would typically send the data to your API
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulated API call
    router.push("/quote/success")
  }

  const nextStep = () => {
    if (step < totalSteps) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step])
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 2000)
      }
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <Celebration trigger={showCelebration} />

      {/* Form Steps - Now First */}
      <div className="card-future p-6 md:p-8 rounded-2xl mb-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Home className="text-violet-600" /> Basic Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-3">
                    What is your primary reason for considering a roof remodel?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Repair damage",
                      "Replace aging roof",
                      "Improve home appearance",
                      "Increase energy efficiency",
                      "Increase home value for sale",
                      "Address leaking issues",
                    ].map((reason) => (
                      <label
                        key={reason}
                        className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <input
                          type="radio"
                          value={reason}
                          {...register("reason", { required: true })}
                          className="w-5 h-5 text-primary border-2 border-gray-300 focus:ring-primary"
                        />
                        {reason}
                      </label>
                    ))}
                    <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5">
                      <input
                        type="radio"
                        value="Other"
                        {...register("reason", { required: true })}
                        className="w-5 h-5 text-primary border-2 border-gray-300 focus:ring-primary"
                      />
                      Other
                    </label>
                  </div>
                  {errors.reason && <p className="text-red-500 mt-2">Please select a reason</p>}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">How old is your current roof?</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      "Less than 5 years",
                      "5-10 years",
                      "11-15 years",
                      "16-20 years",
                      "21-30 years",
                      "More than 30 years",
                      "Unsure",
                    ].map((age) => (
                      <label
                        key={age}
                        className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <input
                          type="radio"
                          value={age}
                          {...register("roofAge", { required: true })}
                          className="w-5 h-5 text-primary border-2 border-gray-300 focus:ring-primary"
                        />
                        {age}
                      </label>
                    ))}
                  </div>
                  {errors.roofAge && <p className="text-red-500 mt-2">Please select your roof age</p>}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">
                    What is the approximate square footage of your roof?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      "Less than 1,000 sq ft",
                      "1,000-1,500 sq ft",
                      "1,501-2,000 sq ft",
                      "2,001-2,500 sq ft",
                      "2,501-3,000 sq ft",
                      "More than 3,000 sq ft",
                      "Unsure",
                    ].map((size) => (
                      <label
                        key={size}
                        className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <input
                          type="radio"
                          value={size}
                          {...register("roofSize", { required: true })}
                          className="w-5 h-5 text-primary border-2 border-gray-300 focus:ring-primary"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                  {errors.roofSize && <p className="text-red-500 mt-2">Please select your roof size</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Roof Details */}
          {step === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Layers className="text-violet-600" /> Roof Details
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium mb-4">
                    What type of roofing material are you currently using?
                  </label>
                  <MaterialSelector
                    options={[
                      { value: "asphalt", label: "Asphalt shingles", image: "/placeholder.svg?height=100&width=100" },
                      {
                        value: "wood",
                        label: "Wood shingles or shakes",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      { value: "metal", label: "Metal roofing", image: "/placeholder.svg?height=100&width=100" },
                      {
                        value: "tile",
                        label: "Clay or concrete tiles",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      { value: "slate", label: "Slate", image: "/placeholder.svg?height=100&width=100" },
                      {
                        value: "flat",
                        label: "Flat roof/built-up roofing",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      { value: "other", label: "Other", image: "/placeholder.svg?height=100&width=100" },
                      { value: "unsure", label: "Unsure", image: "/placeholder.svg?height=100&width=100" },
                    ]}
                    name="currentMaterial"
                    register={register}
                    required={true}
                  />
                  {errors.currentMaterial && (
                    <p className="text-red-500 mt-2">Please select your current roofing material</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-4">
                    What type of roofing material are you interested in for your new roof?
                  </label>
                  <MaterialSelector
                    options={[
                      { value: "asphalt", label: "Asphalt shingles", image: "/placeholder.svg?height=100&width=100" },
                      {
                        value: "architectural",
                        label: "Architectural/dimensional shingles",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      {
                        value: "metal_seam",
                        label: "Metal roofing (standing seam)",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      {
                        value: "metal_shingles",
                        label: "Metal roofing (metal shingles)",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      {
                        value: "tile",
                        label: "Clay or concrete tiles",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      { value: "slate", label: "Slate", image: "/placeholder.svg?height=100&width=100" },
                      {
                        value: "wood",
                        label: "Wood shingles or shakes",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      {
                        value: "solar",
                        label: "Solar roofing/solar tiles",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      { value: "green", label: "Green/living roof", image: "/placeholder.svg?height=100&width=100" },
                      { value: "flat", label: "Flat roof systems", image: "/placeholder.svg?height=100&width=100" },
                      { value: "other", label: "Other", image: "/placeholder.svg?height=100&width=100" },
                      {
                        value: "unsure",
                        label: "Unsure/need recommendations",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                    ]}
                    name="desiredMaterial"
                    register={register}
                    required={true}
                  />
                  {errors.desiredMaterial && (
                    <p className="text-red-500 mt-2">Please select your desired roofing material</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-4">What is your roof structure type?</label>
                  <RoofTypeSelector
                    options={[
                      { value: "gabled", label: "Gabled", image: "/placeholder.svg?height=100&width=100" },
                      { value: "hip", label: "Hip", image: "/placeholder.svg?height=100&width=100" },
                      { value: "flat", label: "Flat/low slope", image: "/placeholder.svg?height=100&width=100" },
                      { value: "mansard", label: "Mansard", image: "/placeholder.svg?height=100&width=100" },
                      { value: "gambrel", label: "Gambrel", image: "/placeholder.svg?height=100&width=100" },
                      { value: "aframe", label: "A-frame", image: "/placeholder.svg?height=100&width=100" },
                      { value: "shed", label: "Shed", image: "/placeholder.svg?height=100&width=100" },
                      {
                        value: "combination",
                        label: "Combination of styles",
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      { value: "unsure", label: "Unsure", image: "/placeholder.svg?height=100&width=100" },
                    ]}
                    name="roofStructure"
                    register={register}
                    required={true}
                  />
                  {errors.roofStructure && <p className="text-red-500 mt-2">Please select your roof structure type</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Project Specifics */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Construction className="text-violet-600" /> Project Specifics
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium mb-3">
                    Are you experiencing any issues with your current roof? (Select all that apply)
                  </label>
                  <MultiSelectOptions
                    options={[
                      "Leaks",
                      "Missing/damaged shingles",
                      "Sagging areas",
                      "Poor drainage",
                      "Ice dams in winter",
                      "Ventilation issues",
                      "Moisture in attic",
                      "Mold or mildew",
                      "High energy bills",
                      "No issues, just want a change",
                      "Other",
                    ]}
                    name="roofIssues"
                    register={register}
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">
                    Beyond roofing material, what additional features are you interested in? (Select all that apply)
                  </label>
                  <MultiSelectOptions
                    options={[
                      "Improved insulation",
                      "Enhanced ventilation",
                      "Skylights or roof windows",
                      "Solar panels",
                      "Rainwater collection system",
                      "Snow guards",
                      "Improved gutters and downspouts",
                      "Chimney repair/replacement",
                      "Other",
                      "None",
                    ]}
                    name="additionalFeatures"
                    register={register}
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">
                    What is your preferred timeframe for this project?
                  </label>
                  <TimeframeSelector
                    options={[
                      {
                        value: "emergency",
                        label: "Emergency (as soon as possible)",
                        icon: <AlertTriangle size={20} />,
                      },
                      { value: "1month", label: "Within 1 month", icon: <Clock size={20} /> },
                      { value: "1-3months", label: "1-3 months", icon: <Clock size={20} /> },
                      { value: "3-6months", label: "3-6 months", icon: <Clock size={20} /> },
                      { value: "6-12months", label: "6-12 months", icon: <Clock size={20} /> },
                      { value: "researching", label: "Just researching for future project", icon: <Clock size={20} /> },
                    ]}
                    name="timeframe"
                    register={register}
                    required={true}
                  />
                  {errors.timeframe && <p className="text-red-500 mt-2">Please select your preferred timeframe</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget and Preferences */}
          {step === 4 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <DollarSign className="text-violet-600" /> Budget and Preferences
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium mb-3">
                    What is your approximate budget for this roof remodel?
                  </label>
                  <BudgetSelector
                    options={[
                      { value: "under5k", label: "Under $5,000" },
                      { value: "5k-10k", label: "$5,000-$10,000" },
                      { value: "10k-15k", label: "$10,001-$15,000" },
                      { value: "15k-20k", label: "$15,001-$20,000" },
                      { value: "20k-30k", label: "$20,001-$30,000" },
                      { value: "over30k", label: "Over $30,000" },
                      { value: "unsure", label: "Unsure/Need estimate" },
                    ]}
                    name="budget"
                    register={register}
                    required={true}
                  />
                  {errors.budget && <p className="text-red-500 mt-2">Please select your budget range</p>}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">
                    What factors are most important to you in this project?
                  </label>
                  <RankingSelector
                    options={[
                      { id: "cost", label: "Cost" },
                      { id: "durability", label: "Durability/longevity" },
                      { id: "appearance", label: "Appearance/aesthetics" },
                      { id: "energy", label: "Energy efficiency" },
                      { id: "eco", label: "Eco-friendliness" },
                    ]}
                    register={register}
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">How did you hear about our roofing services?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Online search",
                      "Social media",
                      "Referral from friend/family",
                      "Saw your work in my neighborhood",
                      "Home improvement store",
                      "Local advertisement",
                    ].map((source) => (
                      <label
                        key={source}
                        className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <input
                          type="radio"
                          value={source}
                          {...register("referralSource", { required: true })}
                          className="w-5 h-5 text-primary border-2 border-gray-300 focus:ring-primary"
                        />
                        {source}
                      </label>
                    ))}
                    <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5">
                      <input
                        type="radio"
                        value="Other"
                        {...register("referralSource", { required: true })}
                        className="w-5 h-5 text-primary border-2 border-gray-300 focus:ring-primary"
                      />
                      Other
                    </label>
                  </div>
                  {errors.referralSource && <p className="text-red-500 mt-2">Please select how you heard about us</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Contact Information - Updated with new consent sections */}
          {step === 5 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Phone className="text-violet-600" /> Contact Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      {...register("firstName", { required: true })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Your first name"
                    />
                    {errors.firstName && <p className="text-red-500 mt-1">First name is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      {...register("lastName", { required: true })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Your last name"
                    />
                    {errors.lastName && <p className="text-red-500 mt-1">Last name is required</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="your.email@example.com"
                    />
                    {errors.email?.type === "required" && <p className="text-red-500 mt-1">Email is required</p>}
                    {errors.email?.type === "pattern" && (
                      <p className="text-red-500 mt-1">Please enter a valid email</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: true,
                        pattern: /^(\+\d{1,2}\s)?(\d{3}[-\s.]?){2}\d{4}$/,
                      })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone?.type === "required" && <p className="text-red-500 mt-1">Phone number is required</p>}
                    {errors.phone?.type === "pattern" && (
                      <p className="text-red-500 mt-1">Please enter a valid phone number</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Your street address"
                  />
                  {errors.address && <p className="text-red-500 mt-1">Address is required</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      {...register("city", { required: true })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="City"
                    />
                    {errors.city && <p className="text-red-500 mt-1">City is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      {...register("state", { required: true })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="State"
                    />
                    {errors.state && <p className="text-red-500 mt-1">State is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <input
                      type="text"
                      {...register("zip", {
                        required: true,
                        pattern: /^\d{5}(-\d{4})?$/,
                      })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="ZIP Code"
                    />
                    {errors.zip?.type === "required" && <p className="text-red-500 mt-1">ZIP code is required</p>}
                    {errors.zip?.type === "pattern" && (
                      <p className="text-red-500 mt-1">Please enter a valid ZIP code</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3">
                    What is your preferred method of contact for follow-up?
                  </label>
                  <ContactMethodSelector
                    options={[
                      { value: "phone", label: "Phone call", icon: <Phone size={20} /> },
                      { value: "email", label: "Email", icon: <Mail size={20} /> },
                      { value: "text", label: "Text message", icon: <MessageSquare size={20} /> },
                      { value: "inperson", label: "In-person consultation", icon: <Home size={20} /> },
                    ]}
                    name="contactMethod"
                    register={register}
                    required={true}
                  />
                  {errors.contactMethod && (
                    <p className="text-red-500 mt-2">Please select your preferred contact method</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Is there anything else you'd like us to know about your roofing project or specific concerns?
                  </label>
                  <textarea
                    {...register("additionalInfo")}
                    className="w-full p-3 border rounded-lg h-32"
                    placeholder="Share any additional details that might help us understand your project better..."
                  ></textarea>
                </div>

                {/* Add these new sections before the navigation buttons */}
                <div className="space-y-6 border-t border-white/10 mt-8 pt-8">
                  {/* SMS Consent */}
                  <div className="card-future p-4 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register("smsConsent", { required: true })}
                        className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      />
                      <div>
                        <span className="block font-medium mb-1 group-hover:text-primary transition-colors">
                          SMS Message Consent
                        </span>
                        <span className="text-sm text-foreground/70">
                          By checking this box, you consent to receive text messages from Instant Roofing about your
                          quote, project updates, and promotional offers. Message and data rates may apply. You can
                          opt-out at any time by replying STOP.
                        </span>
                      </div>
                    </label>
                    {errors.smsConsent && <p className="text-red-500 mt-2 ml-8">SMS consent is required</p>}
                  </div>

                  {/* Terms and Privacy Policy */}
                  <div className="card-future p-4 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register("termsAccepted", { required: true })}
                        className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      />
                      <div>
                        <span className="block font-medium mb-1 group-hover:text-primary transition-colors">
                          Terms & Privacy Policy
                        </span>
                        <span className="text-sm text-foreground/70">
                          By submitting this form, you agree to our{" "}
                          <Link
                            href="/terms"
                            className="text-primary hover:text-primary/80 underline underline-offset-4"
                            target="_blank"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-primary hover:text-primary/80 underline underline-offset-4"
                            target="_blank"
                          >
                            Privacy Policy
                          </Link>
                          . Your information will be processed in accordance with these policies to provide you with our
                          roofing services.
                        </span>
                      </div>
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-red-500 mt-2 ml-8">You must accept the terms and privacy policy</p>
                    )}
                  </div>

                  {/* Small Print */}
                  <p className="text-xs text-foreground/50 text-center">
                    Your privacy is important to us. We'll never share your information with third parties without your
                    consent. By proceeding, you acknowledge that we may contact you about your roofing project using the
                    contact methods provided.
                  </p>
                </div>

                {/* Navigation buttons remain the same */}
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="group relative px-6 py-3 rounded-xl text-foreground/80 hover:text-foreground transition-colors"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        Previous
                      </span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="neon-button relative px-6 py-3 rounded-xl text-primary hover:text-primary-foreground transition-colors"
                    >
                      <span className="relative z-10 flex items-center gap-2 font-medium">
                        Next
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="neon-button relative px-8 py-3 rounded-xl text-primary hover:text-primary-foreground transition-colors"
                    >
                      <span className="relative z-10 flex items-center gap-2 font-medium">
                        Generate Quote
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === 6 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 floating">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
              <p className="text-xl mb-8 text-gray-600">
                You've completed all steps! Your roofing quote request has been submitted successfully.
              </p>
              <div className="max-w-md mx-auto bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <p className="text-gray-600">
                  One of our roofing specialists will review your information and contact you within 24 hours with your
                  personalized quote.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-medium transition-all hover:-translate-y-1"
              >
                <Home className="w-5 h-5" /> Return to Homepage
              </Link>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 6 && (
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="group relative px-6 py-3 rounded-xl text-foreground/80 hover:text-foreground transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    Previous
                  </span>
                </button>
              ) : (
                <div></div>
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="neon-button relative px-6 py-3 rounded-xl text-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    Next
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="neon-button relative px-8 py-3 rounded-xl text-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    Generate Quote
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Progress Overview - Now Below */}
      <div className="card-future p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              System Configuration
            </h2>
            <p className="text-foreground/70">Complete all parameters to generate your quote</p>
          </div>
          <ProgressRing progress={progress} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <AchievementBadge
              key={achievement.step}
              title={achievement.title}
              description={achievement.description}
              unlocked={completedSteps.includes(achievement.step)}
            />
          ))}
        </div>
      </div>

      {/* Steps Progress - Now at Bottom */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`
                progress-step relative flex items-center justify-center w-12 h-12 rounded-xl text-sm font-medium
                ${
                  completedSteps.includes(i + 1)
                    ? "bg-primary text-background"
                    : step === i + 1
                      ? "card-future ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "card-future"
                }
                ${completedSteps.includes(i + 1) ? "completed" : ""}
              `}
            >
              {completedSteps.includes(i + 1) ? <CheckCircle className="w-6 h-6" /> : i + 1}

              {/* Connecting line */}
              {i < totalSteps - 1 && (
                <div
                  className={`
                  absolute left-full w-full h-0.5 -translate-y-1/2 top-1/2
                  ${completedSteps.includes(i + 1) ? "bg-primary" : "bg-white/10"}
                `}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

