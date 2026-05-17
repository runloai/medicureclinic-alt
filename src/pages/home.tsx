import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Stethoscope, Baby, Activity, MapPin, Phone, Clock, Star,
  ArrowRight, Menu, X, MessageCircle, Award, Users, ShieldCheck
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import storefrontImg from "@assets/WhatsApp_Image_2026-05-16_at_8.48.02_PM_(1)_1778944755982.jpeg";
import pharmacyImg from "@assets/WhatsApp_Image_2026-05-16_at_8.48.02_PM_1778944755981.jpeg";
import consultationImg from "@assets/WhatsApp_Image_2026-05-16_at_8.48.02_PM_(2)_1778944755983.jpeg";
import wardImg from "@assets/WhatsApp_Image_2026-05-16_at_8.48.02_PM_(5)_1778944755986.jpeg";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", service: "", date: "", time: "", notes: "" },
  });

  const onSubmit = (data: FormData) => {
    const message = `Hello Medicure Clinic! I'd like to book an appointment.\n\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nDate: ${data.date}\nTime Slot: ${data.time}\nNotes: ${data.notes || "None"}`;
    window.open(`https://wa.me/917977277478?text=${encodeURIComponent(message)}`, "_blank");
  };

  const today = new Date().toISOString().split("T")[0];

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Appointment", id: "appointment" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <header
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <button
            data-testid="logo"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2.5"
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${scrolled ? "bg-primary" : "bg-white"}`}>
              <Stethoscope className={`h-4 w-4 ${scrolled ? "text-white" : "text-primary"}`} />
            </div>
            <span className={`font-serif text-lg font-bold tracking-tight ${scrolled ? "text-primary" : "text-white"}`}>
              Medicure Clinic
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                data-testid={`nav-${id}`}
                onClick={() => scrollTo(id)}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? "text-foreground hover:text-[#0D2236]" : "text-white/85 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              data-testid="nav-book-btn"
              onClick={() => scrollTo("appointment")}
              className="bg-[#D4873A] hover:bg-[#c07830] text-white border-0 shadow-lg px-6"
            >
              Book Appointment
            </Button>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            className={`md:hidden p-2 rounded-lg ${scrolled ? "text-primary" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border shadow-xl"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  data-testid={`mobile-nav-${id}`}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left text-sm font-medium text-foreground py-2 hover:text-primary transition-colors"
                >
                  {label}
                </button>
              ))}
              <Button
                data-testid="mobile-book-btn"
                onClick={() => scrollTo("appointment")}
                className="w-full bg-[#D4873A] hover:bg-[#c07830] text-white border-0 mt-2"
              >
                Book Appointment
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={storefrontImg}
            alt="Medicure Clinic storefront"
            className="w-full h-full object-cover object-[center_top] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2236]/90 via-[#0D2236]/55 to-[#0D2236]/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D4873A] text-[#D4873A]" />
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium">4.9 / 5 from our patients</span>
              <span className="w-1 h-1 rounded-full bg-white/40 mx-1" />
              <span className="text-white/70 text-sm">Bhattarahalli, Bengaluru</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Healthcare You Can{" "}
              <span className="text-[#D4873A] italic">Trust,</span>{" "}
              <br className="hidden md:block" />
              Care You Deserve.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/75 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Medicure Clinic & Medical — your neighbourhood clinic near Garden City University,
              providing compassionate healthcare for the whole family.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                data-testid="hero-book-btn"
                size="lg"
                onClick={() => scrollTo("appointment")}
                className="bg-[#D4873A] hover:bg-[#c07830] text-white border-0 h-14 px-8 text-base shadow-2xl"
              >
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                data-testid="hero-call-btn"
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-14 px-8 text-base backdrop-blur-sm"
              >
                <a href="tel:+917977277478">
                  <Phone className="mr-2 h-5 w-5" />
                  +91 79772 77478
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
          >
            {[
              { icon: <Star className="h-5 w-5" />, value: "4.9★", label: "Patient Rating" },
              { icon: <Users className="h-5 w-5" />, value: "3", label: "Specialties" },
              { icon: <Clock className="h-5 w-5" />, value: "6 days", label: "A week" },
              { icon: <ShieldCheck className="h-5 w-5" />, value: "Trusted", label: "Community Care" },
            ].map(({ icon, value, label }) => (
              <div key={label} className="bg-white/8 backdrop-blur-sm px-6 py-5 text-white flex flex-col items-center text-center">
                <div className="text-[#D4873A] mb-2">{icon}</div>
                <div className="font-serif text-2xl font-bold">{value}</div>
                <div className="text-white/60 text-xs mt-1 font-medium uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.p variants={fadeUp} className="text-[#D4873A] font-semibold text-sm uppercase tracking-widest mb-4">
                What We Offer
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
                Comprehensive Medical Services
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-10">
                From everyday illnesses to chronic disease management — our team of experienced
                doctors is here to serve every member of your family.
              </motion.p>

              <motion.div variants={stagger} className="space-y-5">
                {[
                  {
                    icon: <Stethoscope className="h-6 w-6" />,
                    title: "General Physician",
                    desc: "Complete family care — routine check-ups, fevers, infections, and chronic condition management.",
                    color: "bg-primary text-white",
                  },
                  {
                    icon: <Baby className="h-6 w-6" />,
                    title: "Pediatrics",
                    desc: "Expert childcare from newborns to adolescents — vaccinations, growth monitoring, and more.",
                    color: "bg-[#D4873A] text-white",
                  },
                  {
                    icon: <Activity className="h-6 w-6" />,
                    title: "Diabetology",
                    desc: "Specialised diabetes management — helping you live a healthy, complication-free life.",
                    color: "bg-[#1A7A7A] text-white",
                  },
                ].map(({ icon, title, desc, color }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    data-testid={`service-card-${title.toLowerCase().replace(/ /g, "-")}`}
                    className="flex gap-5 p-5 rounded-2xl border border-border hover:border-primary/20 hover:shadow-md transition-all bg-white group"
                  >
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="relative hidden lg:block">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={pharmacyImg}
                  alt="Medicure in-house pharmacy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border max-w-[220px]">
                <p className="text-[#D4873A] font-semibold text-xs uppercase tracking-wide mb-1">In-House Pharmacy</p>
                <p className="text-foreground font-serif text-base font-bold">Medicines available on the spot</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section id="about" className="py-28 bg-[#0D2236]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={consultationImg}
                    alt="Doctor's consultation room with credentials"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -top-5 -right-5 hidden lg:block">
                  <div className="aspect-[3/4] w-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0D2236]">
                    <img
                      src={wardImg}
                      alt="Patient ward"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.p variants={fadeUp} className="text-[#D4873A] font-semibold text-sm uppercase tracking-widest mb-4">
                About Us
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Dedicated to Your Health & Well-being
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-6">
                Medicure Clinic & Medical is a community-focused clinic dedicated to providing
                personalised, high-quality healthcare. Our experienced doctors offer compassionate
                care in a comfortable, friendly environment — from routine check-ups to specialised treatments.
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-10">
                Conveniently located in Lakshmi Mansion near Garden City University in Bhattarahalli,
                we're your trusted neighbourhood health partner in Bengaluru.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {[
                  {
                    icon: <Award className="h-5 w-5" />,
                    title: "Certified Specialists",
                    desc: "Board-certified doctors with proven credentials",
                  },
                  {
                    icon: <Clock className="h-5 w-5" />,
                    title: "Operating Hours",
                    desc: "Mon – Sat: 9:00 AM – 2:00 PM & 5:00 PM – 10:00 PM | Sunday: Closed",
                  },
                  {
                    icon: <MapPin className="h-5 w-5" />,
                    title: "Address",
                    desc: "No. 15/16, Lakshmi Mansion, A Block Avenue, Near Garden City University, Bhattarahalli, Bengaluru – 560049",
                  },
                ].map(({ icon, title, desc }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    data-testid={`about-item-${title.toLowerCase().replace(/ /g, "-")}`}
                    className="flex gap-4 p-4 rounded-xl bg-white/6 border border-white/10"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#D4873A]/20 flex items-center justify-center text-[#D4873A] shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{title}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── APPOINTMENT ────────────────────────────────────── */}
      <section id="appointment" className="py-28 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-5 gap-12 items-start"
          >
            <div className="lg:col-span-2">
              <motion.p variants={fadeUp} className="text-[#D4873A] font-semibold text-sm uppercase tracking-widest mb-4">
                Book a Visit
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
                Schedule Your Appointment
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
                Fill in your details and we'll get back to you via WhatsApp to confirm your slot. Quick and easy.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {[
                  { icon: <MessageCircle className="h-5 w-5" />, label: "WhatsApp Confirmation", value: "Instant reply on WhatsApp" },
                  { icon: <Phone className="h-5 w-5" />, label: "Call Us", value: "+91 79772 77478" },
                  { icon: <Clock className="h-5 w-5" />, label: "Hours", value: "9 AM–2 PM & 5 PM–10 PM" },
                ].map(({ icon, label, value }) => (
                  <motion.div key={label} variants={fadeUp} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
                      <p className="text-foreground font-semibold">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl border border-border p-8 md:p-10">
                <h3 className="font-serif text-2xl font-bold text-primary mb-8">Enter Your Details</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">Patient Name</Label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="name"
                            data-testid="input-name"
                            placeholder="Your full name"
                            className="h-12 bg-[#F7F4EF] border-border focus:border-primary"
                            {...field}
                          />
                        )}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="phone"
                            data-testid="input-phone"
                            placeholder="+91 00000 00000"
                            className="h-12 bg-[#F7F4EF] border-border focus:border-primary"
                            {...field}
                          />
                        )}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Select Service</Label>
                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger data-testid="select-service" className="h-12 bg-[#F7F4EF] border-border">
                            <SelectValue placeholder="Which specialist do you need?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General Physician">General Physician</SelectItem>
                            <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                            <SelectItem value="Diabetology">Diabetology</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium text-foreground">Preferred Date</Label>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="date"
                            data-testid="input-date"
                            type="date"
                            min={today}
                            className="h-12 bg-[#F7F4EF] border-border focus:border-primary"
                            {...field}
                          />
                        )}
                      />
                      {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Preferred Time</Label>
                      <Controller
                        name="time"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger data-testid="select-time" className="h-12 bg-[#F7F4EF] border-border">
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wide">Morning (9 AM – 2 PM)</div>
                              {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"].map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                              <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wide mt-2 border-t pt-2">Evening (5 PM – 10 PM)</div>
                              {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.time && <p className="text-xs text-destructive">{errors.time.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                      Brief Description <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Controller
                      name="notes"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          id="notes"
                          data-testid="input-notes"
                          placeholder="Describe your symptoms briefly..."
                          className="bg-[#F7F4EF] border-border focus:border-primary resize-none min-h-[90px]"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="button-submit"
                    size="lg"
                    className="w-full h-14 text-base bg-[#25D366] hover:bg-[#1eb85b] text-white border-0 shadow-lg font-semibold"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Book via WhatsApp
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    You'll be redirected to WhatsApp with your details pre-filled.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── LOCATION ───────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-[#D4873A] font-semibold text-sm uppercase tracking-widest mb-3">
              Find Us
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Visit Our Clinic
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
              Conveniently located near Garden City University, Bhattarahalli.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeUp} className="lg:col-span-2 h-[420px] rounded-3xl overflow-hidden shadow-xl border border-border">
              <iframe
                title="Medicure Clinic Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Medicure+Clinic+and+Medical+Bhattarahalli+Bangalore&output=embed"
              />
            </motion.div>

            <motion.div variants={stagger} className="space-y-4">
              {[
                {
                  icon: <MapPin className="h-5 w-5" />,
                  title: "Address",
                  content: (
                    <>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        No. 15/16, Lakshmi Mansion, A Block Avenue,<br />
                        Near Garden City University, Bhattarahalli,<br />
                        Bengaluru, Karnataka – 560049
                      </p>
                      <a
                        href="https://maps.app.goo.gl/L1iJiS2c9TLxQ5wF9"
                        target="_blank"
                        rel="noreferrer"
                        data-testid="link-google-maps"
                        className="text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1 mt-2"
                      >
                        View on Google Maps <ArrowRight className="h-3 w-3" />
                      </a>
                    </>
                  ),
                },
                {
                  icon: <Phone className="h-5 w-5" />,
                  title: "Phone",
                  content: (
                    <a
                      href="tel:+917977277478"
                      data-testid="link-phone"
                      className="text-foreground font-semibold text-lg hover:text-primary transition-colors"
                    >
                      +91 79772 77478
                    </a>
                  ),
                },
                {
                  icon: <Clock className="h-5 w-5" />,
                  title: "Opening Hours",
                  content: (
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mon – Sat</span>
                        <span className="font-semibold text-foreground">9 AM – 2 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground"></span>
                        <span className="font-semibold text-foreground">5 PM – 10 PM</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border mt-2">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="font-semibold text-destructive">Closed</span>
                      </div>
                    </div>
                  ),
                },
              ].map(({ icon, title, content }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  data-testid={`contact-card-${title.toLowerCase().replace(/ /g, "-")}`}
                  className="p-6 rounded-2xl border border-border bg-[#F7F4EF] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
                      {icon}
                    </div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                  </div>
                  <div className="pl-12">{content}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#0D2236] text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-lg bg-[#D4873A] flex items-center justify-center">
                  <Stethoscope className="h-4 w-4 text-white" />
                </div>
                <span className="font-serif text-lg font-bold">Medicure Clinic</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">
                Personalized, compassionate healthcare for every family in Bhattarahalli, Bengaluru.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white/90 text-sm uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map(({ label, id }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className="text-white/55 hover:text-white text-sm transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-5 text-white/90 text-sm uppercase tracking-wide">Contact</h4>
              <ul className="space-y-3 text-white/55 text-sm">
                <li>
                  <a href="tel:+917977277478" className="hover:text-white transition-colors">+91 79772 77478</a>
                </li>
                <li className="leading-relaxed">
                  No. 15/16, Lakshmi Mansion,<br />
                  Near Garden City University,<br />
                  Bhattarahalli, Bengaluru – 560049
                </li>
                <li>
                  <a href="https://medicureclinicmedical.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    medicureclinicmedical.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Medicure Clinic & Medical. All rights reserved.</p>
            <p>Bhattarahalli, Bengaluru, Karnataka – 560049</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
