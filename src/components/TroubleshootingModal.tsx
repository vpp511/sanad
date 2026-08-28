import React, { useState } from 'react';
import { X, HelpCircle, KeyRound, Wifi, Sun, Camera, RefreshCw, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface TroubleshootingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUsePin: () => void;
  pinCode: string;
}

export const TroubleshootingModal: React.FC<TroubleshootingModalProps> = ({
  isOpen,
  onClose,
  onUsePin,
  pinCode,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      title: 'الكاميرا في جهاز طفلي لا تقرأ رمز الـ QR؟',
      desc: 'تأكد من تنظيف عدسة الكاميرا، ورفع سطوع شاشة جهازك الحالي، وتثبيت الكاميرا على بعد 20-30 سم من الشاشة.',
      icon: Camera,
    },
    {
      title: 'هل يجب أن يكون الجهازان على نفس شبكة الـ Wi-Fi؟',
      desc: 'ليس شرطاً؛ يكفي أن يكون كلا الجهازين متصلين بالإنترنت (Wi-Fi أو بيانات خلوية) لربط الحساب ومزامنة البيانات.',
      icon: Wifi,
    },
    {
      title: 'رمز الـ QR لا يظهر أو انتهت صلاحيته؟',
      desc: 'يتم تحديث الرمز كل 5 دقائق لضمان أمان الاتصال. يمكنك دائماً الضغط على "توليد رمز جديد" لإعادة المحاولة.',
      icon: RefreshCw,
    },
    {
      title: 'تطبيق "سند للأطفال" لم يطلب إذن الكاميرا؟',
      desc: 'افتح إعدادات جهاز طفلك > التطبيقات > سند للأطفال > وتأكد من تفعيل إذن الكاميرا والموقع.',
      icon: Sun,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#e2dfff] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f0ecf8] border-b border-[#e4e1ec]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#4f4bce] text-white flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1b1b23] text-base font-tajawal">
                دليل حل مشاكل الاقتران
              </h3>
              <p className="text-xs text-[#464554]">خطوات سريعة لمساعدتك في إتمام الربط</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777585] hover:bg-[#e4e1ec] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Alternative: PIN Code banner */}
          <div className="bg-gradient-to-r from-[#f0ecf8] to-[#e2dfff] p-4 rounded-2xl border border-[#c6c4fe] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4f4bce] text-white flex items-center justify-center flex-shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1b1b23]">استخدم الرمز الرقمي المباشر</h4>
                <p className="text-xs text-[#464554]">أدخل هذا الرمز في تطبيق طفلك بدلاً من مسح الـ QR</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="font-mono-code font-bold text-lg text-[#4f4bce] tracking-widest bg-white px-3 py-1.5 rounded-xl border border-[#c6c4fe] shadow-xs">
                {pinCode}
              </span>
              <button
                onClick={() => {
                  onUsePin();
                  onClose();
                }}
                className="px-3 py-1.5 bg-[#4f4bce] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#3630b6] transition-colors"
              >
                تطبيق
              </button>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#777585] uppercase tracking-wider">الأسئلة والحلول الشائعة</h4>
            {faqs.map((faq, idx) => {
              const Icon = faq.icon;
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#e4e1ec] rounded-2xl overflow-hidden transition-all bg-[#fcf8ff]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 flex items-center justify-between gap-3 text-right hover:bg-[#f0ecf8]/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#e2dfff] text-[#4f4bce] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-[#1b1b23]">{faq.title}</span>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#777585]" /> : <ChevronDown className="w-4 h-4 text-[#777585]" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3.5 pt-1 text-xs text-[#464554] leading-relaxed border-t border-[#e4e1ec]/60 bg-white">
                      {faq.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Support Badge */}
          <div className="flex items-center justify-between p-3.5 bg-[#f6f2fd] rounded-2xl border border-[#e2dfff]">
            <div className="flex items-center gap-2 text-xs text-[#464554]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>فريق دعم سند متاح على مدار الساعة للمساعدة</span>
            </div>
            <span className="text-xs font-bold text-[#4f4bce]">نسخة 2.4.0</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f0ecf8] border-t border-[#e4e1ec] text-left">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#4f4bce] hover:bg-[#3630b6] text-white text-sm font-bold rounded-xl transition-all"
          >
            فهمت، العودة لرمز QR
          </button>
        </div>
      </div>
    </div>
  );
};
