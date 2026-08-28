import React, { useState, useEffect } from 'react';
import { Timer, HelpCircle, KeyRound, Smartphone, RefreshCw, CheckCircle2, ShieldAlert, Sparkles, QrCode } from 'lucide-react';

interface QrPairingViewProps {
  onOpenTroubleshooting: () => void;
  onOpenSimulator: () => void;
  onOpenManualPin: () => void;
  pinCode: string;
}

export const QrPairingView: React.FC<QrPairingViewProps> = ({
  onOpenTroubleshooting,
  onOpenSimulator,
  onOpenManualPin,
  pinCode,
}) => {
  // Countdown timer from 4:59 (299 seconds)
  const INITIAL_SECONDS = 299;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(INITIAL_SECONDS);
  const [qrRefreshedTime, setQrRefreshedTime] = useState<number>(Date.now());
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const handleRefreshQr = () => {
    setSecondsRemaining(INITIAL_SECONDS);
    setQrRefreshedTime(Date.now());
    setIsImageLoaded(false);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isExpired = secondsRemaining === 0;

  // The QR code image provided in the prompt's HTML
  const QR_IMAGE_URL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCktj-9hzwIh46yStOLfFBMLlGQaMeFr4vb4qObQQFuV3uu0wogvpBqe4VaUxB5k2qcCzznvM1CE0-00MEW0efcd2omN3TmYkXKxYU_cUT7jBESYGFdoFoIsaDXHgb7ncO5jLAeP7QQtZzGeCdlcUmiXkx-P6JZx15jbaOgmc3WPvMHYCifKNEo8bWouOMld9ScUH2WwFGeoaL-M1HrgbjmmfCYhyqC2kDWdjfyNeF6U-MqlUhaVFUB';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col items-center justify-between min-h-[calc(100dvh-4rem)] text-[#1b1b23]">
      {/* Responsive Container: Single column on mobile, spacious balanced grid/layout on desktop */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 my-auto">
        
        {/* Left / Top Section: Instructions */}
        <div className="w-full max-w-sm lg:max-w-md space-y-5 sm:space-y-6 text-right">
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e2dfff] text-[#4f4bce] rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              ربط سريع وآمن
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4f4bce] tracking-tight font-tajawal">
              إضافة جهاز جديد
            </h2>
            <p className="text-xs sm:text-sm text-[#464554] mt-1 leading-relaxed">
              اتبع الخطوتين التاليتين لإقران جهاز طفلك وتفعيل نظام الحماية الأبوية
            </p>
          </div>
          
          <div className="space-y-3.5 sm:space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 bg-white/80 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border border-[#e4e1ec]/80 shadow-[0_2px_8px_rgba(79,75,206,0.04)] hover:border-[#c6c4fe] transition-all">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#6866e9] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base shadow-sm">
                1
              </div>
              <div className="pt-0.5">
                <p className="text-sm sm:text-base font-semibold text-[#1b1b23] leading-snug">
                  حمل تطبيق <span className="text-[#4f4bce]">"سند للأطفال"</span> على جهاز طفلك.
                </p>
                <p className="text-xs text-[#777585] mt-0.5">متوفر للأجهزة اللوحية والهواتف الذكية</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 bg-white/80 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border border-[#e4e1ec]/80 shadow-[0_2px_8px_rgba(79,75,206,0.04)] hover:border-[#c6c4fe] transition-all">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#6866e9] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base shadow-sm">
                2
              </div>
              <div className="pt-0.5">
                <p className="text-sm sm:text-base font-semibold text-[#1b1b23] leading-snug">
                  افتح التطبيق وامسح رمز الـ <span className="font-mono-code font-bold text-[#4f4bce]">QR</span>.
                </p>
                <p className="text-xs text-[#777585] mt-0.5">وجّه كاميرا جهاز الطفل نحو الرمز الظاهر</p>
              </div>
            </div>
          </div>

          {/* Desktop quick shortcuts banner */}
          <div className="hidden lg:block pt-2">
            <div className="p-4 bg-[#f0ecf8]/70 rounded-2xl border border-[#e2dfff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-[#4f4bce]" />
                <div>
                  <span className="block text-xs font-bold text-[#1b1b23]">رمز الاقتران اليدوي PIN</span>
                  <span className="text-[11px] text-[#464554]">إذا تعذر مسح الكاميرا: {pinCode}</span>
                </div>
              </div>
              <button
                onClick={onOpenManualPin}
                className="px-3 py-1.5 bg-white hover:bg-[#e2dfff] text-[#4f4bce] border border-[#c6c4fe] text-xs font-bold rounded-xl shadow-2xs transition-all"
              >
                استخدام
              </button>
            </div>
          </div>
        </div>

        {/* Right / Center Section: QR Code Box */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm">
          {/* Glow effect behind QR */}
          <div className="absolute inset-0 bg-[#4f4bce]/20 blur-[40px] sm:blur-[50px] rounded-full mix-blend-multiply opacity-70 animate-pulse pointer-events-none" />

          {/* QR Container */}
          <div className="relative bg-white rounded-3xl p-5 sm:p-7 shadow-[0_12px_30px_-5px_rgba(79,75,206,0.18)] flex flex-col items-center gap-3 z-10 w-full max-w-[260px] sm:max-w-[300px] aspect-square border border-[#e2dfff]/70">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-9 sm:h-9 border-t-4 border-l-4 border-[#4f4bce] rounded-tl-3xl opacity-70 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-9 sm:h-9 border-t-4 border-r-4 border-[#4f4bce] rounded-tr-3xl opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-9 sm:h-9 border-b-4 border-l-4 border-[#4f4bce] rounded-bl-3xl opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 border-b-4 border-r-4 border-[#4f4bce] rounded-br-3xl opacity-70 pointer-events-none" />

            {/* QR Code Image with Lazy Loading */}
            {!isExpired ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                {/* Lazy loading placeholder shimmer */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0ecf8]/60 animate-pulse rounded-xl">
                    <QrCode className="w-12 h-12 text-[#6866e9]/40 mb-2" />
                    <span className="text-[11px] text-[#777585] font-medium">جاري تحميل الرمز...</span>
                  </div>
                )}

                <img
                  key={qrRefreshedTime}
                  className={`w-full h-full object-contain rounded-xl mix-blend-darken select-none transition-opacity duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  alt="رمز الاستجابة السريعة لإقران تطبيق سند للأطفال"
                  src={QR_IMAGE_URL}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setIsImageLoaded(true)}
                  referrerPolicy="no-referrer"
                />
                
                {/* Scanning Line Overlay (Animation) */}
                <div
                  className="absolute top-2 left-3 right-3 h-1 bg-[#5a598c] shadow-[0_0_15px_3px_rgba(79,75,206,0.7)] rounded-full animate-scan-line pointer-events-none"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-[#f0ecf8]/60 rounded-2xl">
                <ShieldAlert className="w-12 h-12 text-[#a63a25] mb-2" />
                <p className="text-sm font-bold text-[#1b1b23]">انتهت صلاحية الرمز</p>
                <p className="text-xs text-[#464554] mt-1 mb-3">لحماية جهازك، تنتهي صلاحية الرمز بعد 5 دقائق</p>
                <button
                  onClick={handleRefreshQr}
                  className="min-h-[44px] px-4 py-2 bg-[#4f4bce] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  توليد رمز جديد
                </button>
              </div>
            )}
          </div>

          {/* Timer Helper Text */}
          <div className="mt-4 sm:mt-5 flex items-center gap-2 bg-[#e4e1ec] px-4 py-2 rounded-full shadow-xs border border-[#c7c4d6]/40">
            <Timer className="w-4 h-4 text-[#777585]" />
            <p className="text-xs sm:text-[13px] font-medium text-[#464554] tracking-wide">
              هذا الرمز صالح لمدة{' '}
              <span className="font-mono-code font-bold text-[#4f4bce]">
                {formattedTime}
              </span>{' '}
              دقائق فقط
            </p>
          </div>
        </div>
      </div>

      {/* Waiting State Indicator & Action Shortcuts */}
      <div className="flex flex-col items-center gap-3.5 w-full max-w-sm sm:max-w-md mt-6">
        <div className="flex items-center justify-center gap-3 w-full py-1">
          <div className="relative flex items-center justify-center w-6 h-6">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#5a598c] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5a598c]" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-[#464554]">
            في انتظار اتصال الجهاز...
          </span>
        </div>

        {/* Interactive Simulator / Manual pairing buttons with min 44px touch targets */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            onClick={onOpenSimulator}
            className="min-h-[48px] flex-1 bg-gradient-to-r from-[#4f4bce] to-[#6866e9] text-white py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <Smartphone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>محاكاة مسح الرمز من جهاز الطفل</span>
          </button>
          
          <button
            onClick={onOpenManualPin}
            className="min-h-[48px] bg-white hover:bg-[#f6f2fd] text-[#4f4bce] border border-[#c6c4fe] py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold shadow-2xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            title="إقران يدوي بالرمز الرقمي"
          >
            <KeyRound className="w-4 h-4" />
            <span>رمز PIN ({pinCode})</span>
          </button>
        </div>

        {/* Footer Link: Troubleshooting */}
        <div className="pt-2 w-full text-center">
          <button
            onClick={onOpenTroubleshooting}
            className="min-h-[44px] text-xs sm:text-sm text-[#4f4bce] font-bold hover:text-[#3630b6] transition-colors active:scale-95 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#e2dfff]/50"
          >
            <HelpCircle className="w-4 h-4" />
            <span>واجهت مشكلة؟</span>
          </button>
        </div>
      </div>
    </div>
  );
};

