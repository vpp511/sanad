import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, ShieldCheck, Smartphone } from 'lucide-react';
import { ChildDevice } from '../types';

interface ManualPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newDevice: ChildDevice) => void;
  defaultPin: string;
}

export const ManualPinModal: React.FC<ManualPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultPin,
}) => {
  const [pin, setPin] = useState(defaultPin);
  const [childName, setChildName] = useState('ريان');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length < 4) {
      setError('يرجى إدخال رمز PIN صالح');
      return;
    }
    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      setIsVerifying(false);
      const newDev: ChildDevice = {
        id: `dev-${Date.now()}`,
        name: 'Huawei MatePad SE',
        model: 'Huawei HarmonyOS Tablet',
        childName: childName.trim() || 'ريان',
        childAge: 7,
        childAvatar: '🧑‍🚀',
        batteryLevel: 88,
        isCharging: true,
        status: 'online',
        screenTimeUsedMinutes: 20,
        screenTimeLimitMinutes: 90,
        currentApp: 'تطبيق براعم وسند',
        locationName: 'المنزل',
        lastActive: 'الآن',
        bedtimeStart: '20:30',
        bedtimeEnd: '06:00',
        isInstantPaused: false,
        webFilterActive: true,
        installedApps: [
          { id: 'app-1', name: 'براعم', category: 'تعليم', iconName: 'Sparkles', isBlocked: false, timeUsedMinutes: 15 },
          { id: 'app-2', name: 'YouTube Kids', category: 'ترفيه', iconName: 'PlaySquare', isBlocked: false, timeUsedMinutes: 5 },
        ],
      };
      onSuccess(newDev);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#e2dfff] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#f0ecf8] border-b border-[#e4e1ec]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4f4bce] text-white flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#1b1b23] text-sm font-tajawal">
              الربط بالرمز الرقمي PIN
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777585] hover:bg-[#e4e1ec] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-xs text-[#464554] mb-3">
              أدخل الرمز الظاهر على شاشة تطبيق ولي الأمر في جهاز الطفل
            </p>
            <div className="p-3 bg-[#e2dfff] rounded-2xl inline-block font-mono-code font-bold text-2xl text-[#4f4bce] tracking-widest border border-[#c6c4fe]">
              {pin}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1b1b23] mb-1">اسم الطفل لهذا الجهاز:</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#c7c4d6] rounded-xl focus:ring-2 focus:ring-[#4f4bce] focus:outline-none bg-[#fcf8ff]"
              placeholder="مثال: ريان"
            />
          </div>

          {error && <p className="text-xs text-[#ba1a1a] font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 px-4 bg-[#4f4bce] hover:bg-[#3630b6] disabled:opacity-50 text-white font-bold rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <span>جاري التحقق من الرمز...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>تأكيد والربط الفوري</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
