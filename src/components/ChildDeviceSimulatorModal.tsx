import React, { useState } from 'react';
import { X, Smartphone, Tablet, Camera, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ChildDevice } from '../types';

interface ChildDeviceSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newDevice: ChildDevice) => void;
  pinCode: string;
}

const AVATARS = ['👦', '👧', '🧑‍🚀', '🦄', '🦁', '🚀', '🎨', '⚽'];

export const ChildDeviceSimulatorModal: React.FC<ChildDeviceSimulatorModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  pinCode,
}) => {
  const [step, setStep] = useState<'scan' | 'profile' | 'linking' | 'done'>('scan');
  const [childName, setChildName] = useState('فيصل');
  const [childAge, setChildAge] = useState(9);
  const [selectedAvatar, setSelectedAvatar] = useState('👦');
  const [deviceModel, setDeviceModel] = useState<'tablet' | 'phone'>('tablet');
  const [deviceName, setDeviceName] = useState('iPad Mini 6');

  if (!isOpen) return null;

  const handleStartScan = () => {
    // Simulate camera scan delay
    setStep('linking');
    setTimeout(() => {
      setStep('profile');
    }, 1200);
  };

  const handleCompletePairing = () => {
    setStep('linking');
    setTimeout(() => {
      const newDevice: ChildDevice = {
        id: `dev-${Date.now()}`,
        name: deviceName,
        model: deviceModel === 'tablet' ? 'Apple iPad Mini' : 'Samsung Galaxy A34',
        childName: childName.trim() || 'طفلي الجديد',
        childAge: Number(childAge) || 8,
        childAvatar: selectedAvatar,
        batteryLevel: 94,
        isCharging: false,
        status: 'online',
        screenTimeUsedMinutes: 15,
        screenTimeLimitMinutes: 120,
        currentApp: 'تطبيق سند للأطفال (نشط)',
        locationName: 'المنزل - متصل الآن',
        lastActive: 'الآن',
        bedtimeStart: '21:00',
        bedtimeEnd: '06:30',
        isInstantPaused: false,
        webFilterActive: true,
        installedApps: [
          { id: 'app-1', name: 'YouTube Kids', category: 'ترفيه', iconName: 'PlaySquare', isBlocked: false, timeUsedMinutes: 10 },
          { id: 'app-2', name: 'Scratch Jr', category: 'برمجة', iconName: 'Code2', isBlocked: false, timeUsedMinutes: 5 },
          { id: 'app-3', name: 'Roblox', category: 'ألعاب', iconName: 'Shapes', isBlocked: true, timeUsedMinutes: 0 },
        ],
      };
      onSuccess(newDevice);
      setStep('done');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#e2dfff] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#f0ecf8] border-b border-[#e4e1ec]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4f4bce] text-white flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#1b1b23] text-sm font-tajawal">
                محاكي جهاز الطفل (سند للأطفال)
              </h3>
              <p className="text-xs text-[#464554]">تجربة الاقتران المباشر كجهاز طفل</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777585] hover:bg-[#e4e1ec] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'scan' && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 bg-slate-900 rounded-3xl overflow-hidden border-4 border-[#4f4bce] shadow-inner flex flex-col items-center justify-center p-4">
                {/* Camera Viewfinder graphics */}
                <div className="absolute inset-2 border-2 border-dashed border-white/60 rounded-2xl animate-pulse" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#c6c4fe] shadow-[0_0_12px_#6866e9] animate-scan-line" />
                
                <Camera className="w-12 h-12 text-white/80 mb-2" />
                <span className="text-xs text-white/90 font-medium px-2 py-1 bg-black/40 rounded-full">
                  توجيه الكاميرا نحو رمز الـ QR
                </span>
              </div>

              <div className="text-sm text-[#464554]">
                <p className="font-semibold text-[#1b1b23]">تطبيق سند للأطفال جاهز للمسح</p>
                <p className="text-xs text-[#777585] mt-1">اضغط على الزر أدناه لمحاكاة التقاط رمز الـ QR بنجاح</p>
              </div>

              <button
                onClick={handleStartScan}
                className="w-full py-3.5 px-4 bg-[#4f4bce] hover:bg-[#3630b6] text-white font-bold rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>محاكاة مسح الرمز الآن</span>
              </button>
            </div>
          )}

          {step === 'profile' && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
                  <Check className="w-3.5 h-3.5" /> تم قراءة الرمز بنجاح
                </span>
                <h4 className="font-bold text-[#1b1b23] text-lg">بيانات الطفل والجهاز</h4>
                <p className="text-xs text-[#464554]">خصص ملف الطفل لمتابعة الوقت والأنشطة</p>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-[#1b1b23] mb-1.5">اختر صورة رمزية للطفل:</label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`text-2xl py-2 rounded-2xl border transition-all ${
                        selectedAvatar === av
                          ? 'border-[#4f4bce] bg-[#e2dfff] shadow-xs scale-105'
                          : 'border-[#e4e1ec] bg-white hover:bg-[#f6f2fd]'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Child Name & Age */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#1b1b23] mb-1">اسم الطفل:</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#c7c4d6] rounded-xl focus:ring-2 focus:ring-[#4f4bce] focus:outline-none bg-[#fcf8ff]"
                    placeholder="مثال: فيصل"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1b1b23] mb-1">العمر:</label>
                  <input
                    type="number"
                    min="3"
                    max="17"
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-[#c7c4d6] rounded-xl focus:ring-2 focus:ring-[#4f4bce] focus:outline-none bg-[#fcf8ff]"
                  />
                </div>
              </div>

              {/* Device Type */}
              <div>
                <label className="block text-xs font-bold text-[#1b1b23] mb-1">نوع الجهاز المقترن:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDeviceModel('tablet');
                      setDeviceName('iPad Mini 6');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      deviceModel === 'tablet'
                        ? 'border-[#4f4bce] bg-[#e2dfff] text-[#4f4bce]'
                        : 'border-[#e4e1ec] text-[#464554]'
                    }`}
                  >
                    <Tablet className="w-4 h-4" /> جهاز لوحي (Tablet/iPad)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeviceModel('phone');
                      setDeviceName('Galaxy A34');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      deviceModel === 'phone'
                        ? 'border-[#4f4bce] bg-[#e2dfff] text-[#4f4bce]'
                        : 'border-[#e4e1ec] text-[#464554]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" /> هاتف ذكي (Smartphone)
                  </button>
                </div>
              </div>

              <button
                onClick={handleCompletePairing}
                className="w-full mt-2 py-3 px-4 bg-[#4f4bce] hover:bg-[#3630b6] text-white font-bold rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>إتمام ربط جهاز {childName || 'الطفل'}</span>
              </button>
            </div>
          )}

          {step === 'linking' && (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#4f4bce]">
                <Zap className="w-8 h-8 animate-bounce text-[#4f4bce]" />
              </div>
              <h4 className="font-bold text-[#1b1b23] text-base">جاري تشفير قناة الاتصال وتأكيد الإقران...</h4>
              <p className="text-xs text-[#464554]">يتم تطبيق إعدادات الأمان والحماية الأبوية تلقائياً</p>
            </div>
          )}

          {step === 'done' && (
            <div className="py-4 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-[#1b1b23] text-lg">تم اقتران الجهاز بنجاح!</h4>
              <p className="text-xs text-[#464554] max-w-xs">
                أصبح جهاز <span className="font-bold text-[#1b1b23]">{childName}</span> خاضعاً للإشراف التربوي والأمان في سند.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-[#4f4bce] text-white font-bold rounded-2xl shadow-sm hover:bg-[#3630b6] transition-all"
              >
                الانتقال إلى لوحة تحكم الأجهزة
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
