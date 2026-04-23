import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Leaf, MapPin, Video, User,Mail,Phone, CheckCircle2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { bookAppointment, getAvailableSlots } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useScroll } from "../contexts/ScrollContext";
import { toast } from "react-toastify";
import lottieLoading from "../assets/Food Loading Animation.lottie";

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function filterPastTimes(times, date, today) {
  if (!isSameDay(date, today)) return times;
  const now = new Date();
  const nowPlus30 = now.getHours() * 60 + now.getMinutes() + 30;
  return times.filter(time => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m > nowPlus30;
  });
}


function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function buildCalendarDays(currentMonth) {
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });
  const prefixDays = getDay(start);
  return { days, prefixDays };
}

export default function Agendamento() {
  const navigate = useNavigate();
  const { isMobile, updateScroll } = useScroll();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState("calendar"); 
  const [mobileStep, setMobileStep] = useState("form"); 
  const [form, setForm] = useState({ name: "", email: "", phone: "", online: false });
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState({});
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

  const { days, prefixDays } = buildCalendarDays(currentMonth);
  const today = startOfDay(new Date());

  useEffect(() => {
    const fetchSlots = async () => {
      setSlotsLoading(true);
      try {
        const slots = await getAvailableSlots();
        const slotsMap = {};
        slots.forEach(slot => {
          slotsMap[slot.data] = slot.horas_vagas;
        });
        setAvailableSlots(slotsMap);
      } catch (error) {
        console.error("Erro ao buscar horários disponíveis:", error);
        setAvailableSlots({});
      } finally {
        setSlotsLoading(false);
        setTimeout(() => updateScroll(), 100);
      }
    };
    fetchSlots();
  }, []);

  const handleDateSelect = (day) => {
    if (isBefore(day, today)) return;
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios (nome, email e telefone) antes de confirmar.");
      return;
    }
    setStep("form");
  };

  const submitBooking = async () => {
    setLoading(true);
    try {
      await bookAppointment({
        data: format(selectedDate, "dd/MM/yyyy"),
        hora: selectedTime,
        nome: form.name,
        email: form.email,
        phone: form.phone,
        online: form.online,
        duracao: form.online ? 45 : 60,
      });
      if (mobileStep !== "form") {
        // Mobile flow
        setMobileStep("success");
      } else {
        // Desktop flow
        setStep("success");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao agendar consulta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitBooking();
  };

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const handleNavigateToContact = () => {
    navigate("/#contato");
  };

  const handleMobileFormNext = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (!validateEmail(form.email)) {
      setEmailError(true);
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }
    setMobileStep("calendar");
  };

  const handleMobileCalendarNext = () => {
    if (!selectedDate) {
      toast.error("Por favor, selecione uma data.");
      return;
    }
    setMobileStep("time");
  };

  return (
    <div className="relative bg-white rounded-3xl" style={{ boxShadow: ' 8px 12px rgba(77, 77, 77, 0.12)' }}>
      {(loading || (slotsLoading && !isMobile)) && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <DotLottieReact src={lottieLoading} loop autoplay style={{ width: 180, height: 180 }} />
        </div>,
        document.body
      )}
      <div className="w-full max-w-8xl bg-white rounded-3xl overflow-hidden">

        <div className="relative">
          <div className="absolute top-0 left-0 z-20">
            <h1 className="text-green-700 text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-poppins bg-green-50 px-4 md:px-6 py-2 md:py-3 rounded-br-2xl whitespace-nowrap">
              Agende sua Consulta
            </h1>
          </div>
          
          <div className="h-24 md:h-20"></div>
        </div>

        {/* MOBILE */}
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
          {mobileStep === "form" && (
            <motion.div
              key="mobile-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="p-6 space-y-6"
            >
              <h2 className="font-poppins text-lg font-semibold text-green-700 mb-8">Passo 1: Seus dados</h2>
              <div>
                <label className="block text-sm font-medium font-poppins text-gray-800 mb-2">Nome completo *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-poppins text-gray-800 mb-2">E-mail *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setEmailError(false); }}
                  onBlur={(e) => { if (e.target.value) setEmailError(!validateEmail(e.target.value)); }}
                  placeholder="seu@email.com"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 ${emailError ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-green-400"}`}
                />
                {emailError && <p className="text-red-500 text-xs mt-1 font-poppins">Digite um e-mail válido (ex: nome@email.com)</p>}
              </div>
              <div>
                <label className="block text-sm font-medium font-poppins text-gray-800 mb-2">Telefone *</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                  placeholder="(00) 00000-0000"
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="online-mobile"
                  checked={form.online}
                  onChange={(e) => setForm({ ...form, online: e.target.checked })}
                  className={`w-4 h-4 rounded border focus:ring-green-500 focus:ring-2 ${
                    form.online
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-gray-300 bg-gray-100"
                  }`}
                />
                <label
                  htmlFor="online-mobile"
                  className="text-sm font-medium font-poppins text-gray-800"
                >
                  Consulta Online
                </label>
              </div>
              <button
                onClick={handleMobileFormNext}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-medium text-sm hover:bg-green-700 transition-all"
              >
                Próximo
              </button>
            </motion.div>
          )}

          {mobileStep === "calendar" && (
            <motion.div
              key="mobile-calendar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="p-4 space-y-4"
            >
              <button
                onClick={() => setMobileStep("form")}
                className="flex items-center gap-1 text-xs text-gray-800 hover:text-green-600 mb-4 transition-colors"
              >
                <ChevronLeft className="w-3 h-3" /> Voltar
              </button>
              <h2 className="font-poppins text-lg font-semibold text-green-700 mb-4">Passo 2: Escolha a data e horário</h2>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-1.5 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <span className="font-poppins font-medium text-sm text-foreground capitalize">
                  {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                </span>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-1.5 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2 gap-1">
                {weekDays.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-gray-600 py-1 font-poppins">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: prefixDays }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                  const isPast = isBefore(day, today);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, today);
                  const isDomingo = getDay(day) === 0;
                  const dateKey = format(day, "yyyy-MM-dd");
                  const hasSlots = availableSlots[dateKey] && availableSlots[dateKey].length > 0;
                  const isDisabled = isPast || isDomingo || !hasSlots;
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`
                        mx-auto w-full py-2 rounded-3xl text-sm flex items-center justify-center transition-all
                        ${isDisabled ? "text-gray-400 cursor-not-allowed bg-gray-100" : "hover:bg-green-200 cursor-pointer"}
                        ${isSelected ? "bg-green-600 text-white font-semibold" : ""}
                        ${isToday && !isSelected ? "font-semibold text-green-600 border border-green-600" : ""}
                      `}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="pt-2">
                  <p className="font-poppins text-sm font-medium text-gray-700 mb-3 capitalize">
                    {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(() => {
                      const dateKey = format(selectedDate, "yyyy-MM-dd");
                      const rawTimes = availableSlots[dateKey] ? availableSlots[dateKey] : TIME_SLOTS;
                      const availableTimes = filterPastTimes(rawTimes, selectedDate, today);
                      return availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`w-full py-3 text-sm rounded-xl border transition-all ${
                            selectedTime === time
                              ? "border-green-600 bg-green-600/10 text-green-600 font-medium"
                              : "border-gray-300 bg-white text-gray-800 hover:border-green-600"
                          }`}
                        >
                          {time}
                        </button>
                      ));
                    })()}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (!selectedDate) {
                    toast.error("Por favor, selecione uma data.");
                    return;
                  }
                  if (!selectedTime) {
                    toast.error("Por favor, selecione um horário.");
                    return;
                  }
                  submitBooking();
                }}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-medium text-sm hover:bg-green-700 transition-all disabled:opacity-50"
              >
                {loading ? "Agendando..." : "Confirmar"}
              </button>
            </motion.div>
          )}

          {mobileStep === "success" && (
            <motion.div
              key="mobile-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 px-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-poppins text-3xl font-semibold text-green-700 mb-3">
                Agendado com sucesso!
              </h2>
              <p className="font-poppins text-muted-foreground text-sm max-w-sm mb-2">
                Sua consulta foi registrada para{" "}
                <strong>{selectedDate && format(selectedDate, "dd/MM/yyyy")}</strong> às{" "}
                <strong>{selectedTime}</strong>.
              </p>
              <p className="font-poppins text-muted-foreground text-sm max-w-sm mb-10">
                Chegará um e-mail de confirmação com orientações.
              </p>
              <p className="font-poppins text-muted-foreground text-sm max-w-sm mb-10">
                Obrigada por confiar em mim para cuidar da sua saúde! 💚 
              </p>
              <button
                onClick={() => {
                  setStep("calendar");
                  setMobileStep("form");
                  setSelectedDate(null);
                  setSelectedTime(null);
                  setForm({ name: "", email: "", phone: "", online: false });
                }}
                className="font-poppins bg-[#B9F7CE] text-green-900 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center hover:bg-green-900 hover:text-white hover:scale-105 transition duration-300"
              >
                Voltar ao início
              </button>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        {/* DESKTOP  */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
          {step === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-[260px_1fr_190px] lg:grid-cols-[310px_1fr_230px] xl:grid-cols-[360px_1fr_265px] items-stretch"
            >
              {/* Column 1: Profile */}
              <div className="border-r border-green-200 p-4 flex flex-col gap-8">
                <div className="p-4">
                <h2 className="font-poppins text-xl font-semibold text-green-700 mb-6">
                  Seus dados
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium font-poppins text-gray-800 mb-1.5">Nome completo *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Seu nome"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-poppins text-gray-800 mb-1.5">E-mail *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setEmailError(false); }}
                      onBlur={(e) => { if (e.target.value) setEmailError(!validateEmail(e.target.value)); }}
                      placeholder="seu@email.com"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:border-primary ${emailError ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-green-400"}`}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1 font-poppins">Digite um e-mail válido (ex: nome@email.com)</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-poppins text-gray-800 mb-1.5">Telefone *</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                      placeholder="(00) 00000-0000"
                      inputMode="numeric"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-primary"                    />
                  </div>
                   <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="online"
                      checked={form.online}
                      onChange={(e) => setForm({ ...form, online: e.target.checked })}
                      className={`w-4 h-4 rounded border focus:ring-green-500 focus:ring-2 ${
                        form.online
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-gray-100"
                      }`}
                    />
                    <label
                      htmlFor="online"
                      className="text-sm font-medium font-poppins text-gray-800cursor-pointer"
                    >
                      Consulta Online
                    </label>
                  </div>
                </form>
              </div>
                   <div className="space-y-2 h-20">
                                      
                  </div>               
              </div>

              <div className="p-4 lg:p-6 xl:p-8 border-r border-green-200">
                <h2 className="font-poppins text-xl font-semibold text-green-700 mb-6">
                  Selecione uma data
                </h2>

                <div className="flex items-center justify-between mb-6">
                  <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1.5 rounded-lg hover:bg-green-200 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-foreground" />
                  </button>
                  <span className="font-poppins font-medium text-sm text-foreground capitalize">
                    {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                  </span>
                  <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-1.5 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground" />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {weekDays.map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-green-800 py-1 font-poppins">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1">
                  {Array.from({ length: prefixDays }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {days.map((day) => {
                    const isPast = isBefore(day, today);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, today);
                    const isDomingo = getDay(day) === 0;
                    const dateKey = format(day, "yyyy-MM-dd");
                    const hasSlots = availableSlots[dateKey] && availableSlots[dateKey].length > 0;
                    const isDisabled = isPast || isDomingo || !hasSlots;
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => handleDateSelect(day)}
                        disabled={isDisabled}
                        className={`
                          mx-auto md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full text-xs xl:text-sm flex items-center justify-center transition-all
                          ${isDisabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-green-200 cursor-pointer"}
                          ${isSelected ? "bg-green-600 text-white font-semibold hover:bg-green-600" : ""}
                          ${isToday && !isSelected ? "font-semibold text-primary" : ""}
                        `}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 xl:p-6 flex flex-col h-full">
                {selectedDate ? (
                  <>
                    <h3 className="font-poppins font-medium text-sm text-gray-800 mb-1 capitalize">
                      {format(selectedDate, "EEEE", { locale: ptBR })}
                    </h3>
                    <p className="font-poppins text-xs text-muted-foreground mb-5">
                      {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                    </p>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                      {(() => {
                        const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
                        const rawTimes = dateKey && availableSlots[dateKey] ? availableSlots[dateKey] : TIME_SLOTS;
                        const availableTimes = filterPastTimes(rawTimes, selectedDate, today);
                        return availableTimes.map((time) => (
                          <div key={time} className="flex gap-2">
                            <button
                              onClick={() => handleTimeSelect(time)}
                              className={`flex-1 py-2.5 text-sm rounded-xl border border-gray-300 transition-all ${
                                selectedTime === time
                                  ? "border-green-600 bg-green-600/10 text-green-600 font-medium"
                                  : "border-border/60 text-gray-800 hover:border-green-600/50"
                              }`}
                            >
                              {time}
                            </button>
                            {selectedTime === time && (
                              <motion.button
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                onClick={handleConfirm}
                                className="bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-green-600/90 transition-colors whitespace-nowrap"
                              >
                                Confirmar
                              </motion.button>
                            )}
                          </div>
                        ));
                      })()}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-gray-500 font-poppins text-center">
                      Selecione uma<br />data para ver<br />os horários
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="grid md:grid-cols-[280px_1fr] xl:grid-cols-[380px_1fr] p-4 xl:p-2 gap-5 xl:gap-6"
            >
              <div className="p-4 xl:p-6 border-r border-green-200">
                <button
                  onClick={() => setStep("calendar")}
                  className="flex items-center gap-1 text-xs text-gray-700 hover:text-green-600 mb-2 transition-colors font-medium"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>

                <div className="mb-4 mt-6 xl:mb-8 xl:mt-12 pb-6">
                  <p className="font-poppins text-2xl font-semibold text-gray-800 mb-1">Consulta Nutricional</p>
                  <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5" /> com Lory Cavalcante
                  </p>
                </div>

                <div className="my-6 border-t-1 border-green-200"></div>

                <div className="space-y-4">
                  <div className="bg-green-100 rounded-3xl p-4 border border-green-200/60">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-800" />
                      <span className="text-xs font-medium text-gray-800 uppercase tracking-wide">Data e Hora</span>
                    </div>
                    <p className="text-lg font-bold text-green-700">
                      {selectedDate && format(selectedDate, "dd/MM/yyyy")} ás {selectedTime}
                    </p>
                   
                  </div>

                  <div className="bg-green-100 rounded-3xl p-4 border border-green-200/60">
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="w-4 h-4 text-gray-800" />
                      <span className="text-xs font-medium text-gray-800 uppercase tracking-wide">Formato</span>
                    </div>
                    <p className="text-base font-semibold text-green-700">
                      {form.online ? " Online" : " Presencial"}
                    </p>
                  </div>
                </div>

              </div>

              {/* CONFIRMAÇÃO */}
              <div className="p-4 xl:p-8 flex items-center justify-center">
                <div className="w-full max-w-lg">
                  <h2 className="font-poppins text-2xl xl:text-2xl font-bold text-green-700 mb-5 xl:mb-8">
                    Confirme seus dados
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                        <span className="w-5 h-5 text-white flex items-center justify-center text-xs font-bold"><User className="text-gray-700"/></span>
                        Nome
                      </label>
                      <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-3xl p-3 group-hover:border-green-400 transition-all">
                        <p className="text-gray-900 font-medium text-lg">
                          {form.name}
                        </p>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="w-5 h-5  text-white flex items-center justify-center text-xs font-bold"><Mail className="text-gray-700"/></span>
                        Email
                      </label>
                      <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-3xl p-3 group-hover:border-green-400 transition-all">
                        <p className="text-gray-900 font-medium text-lg break-all">
                          {form.email}
                        </p>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="w-5 h-5  text-white flex items-center justify-center text-xs font-bold"><Phone className="text-gray-700"/></span>
                        Telefone
                      </label>
                      <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-3xl p-3 group-hover:border-green-400 transition-all">
                        <p className="text-gray-900 font-medium text-lg">
                          {form.phone}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-center">
                      <button
                        type="submit"
                        disabled={loading}
                        className="font-poppins bg-[#B9F7CE] text-green-900 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center hover:bg-green-900 hover:text-white hover:scale-105 transition duration-300"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin"></span> Agendando...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Confirmar e Agendar
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS SCREEN */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 px-8 text-center"
            >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-poppins text-3xl font-semibold text-green-700 mb-3">
              Agendado com sucesso!
            </h2>
            <p className="font-poppins text-muted-foreground text-sm max-w-sm mb-2">
              Sua consulta foi registrada para{" "}
              <strong>{selectedDate && format(selectedDate, "dd/MM/yyyy")}</strong> às{" "}
              <strong>{selectedTime}</strong>.
            </p>
            <p className="font-poppins text-muted-foreground text-sm max-w-sm mb-10">
              Chegará um e-mail de confirmação com orientações.
            </p>
            <p className="font-poppins text-muted-foreground text-sm max-w-sm mb-10">
              Obrigada por confiar em mim para cuidar da sua saúde! 💚 
            </p>
            <button
              onClick={() => {
                setStep("calendar");
                setMobileStep("form");
                setSelectedDate(null);
                setSelectedTime(null);
                setForm({ name: "", email: "", phone: ""});
                navigate("/");
              }}
              className="font-poppins bg-[#B9F7CE] text-green-900 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center hover:bg-green-900 hover:text-white hover:scale-105 transition duration-300"
            >
              Voltar ao início
            </button>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}