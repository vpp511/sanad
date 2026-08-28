import React, { useState } from 'react';
import { X, User, Shield, Lock, Bell, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface ParentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceCount: number;
}

export const ParentProfileModal: React.FC<ParentProfileModalProps> = ({
  isOpen,
  onClose,
  deviceCount,
}) => {
  const [parentName, setParentName] = useState('أحمد العتيبي (ولي الأمر)');
  const [parentEmail, setParentEmail] = useState('parent@sanad.app');
  const [pinLockEnabled, setPinLockEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#e2dfff] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f0ecf8] border-b border-[#e4e1ec]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#4f4bce] text-white flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1b1b23] text-base font-tajawal">
                حساب ولي الأمر وإعدادات الحماية
              </h3>
              <p className="text-xs text-[#464554]">إدارة الحساب العائلي ورمز الحماية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777585] hover:bg-[#e4e1ec] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {showToast && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              تم حفظ الإعدادات بنجاح
            </div>
          )}

          {/* Account info */}
          <div>
            <label className="block text-xs font-bold text-[#1b1b23] mb-1">اسم ولي الأمر / المشرف:</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#c7c4d6] rounded-xl focus:ring-2 focus:ring-[#4f4bce] bg-[#fcf8ff]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1b1b23] mb-1">البريد الإلكتروني للتقارير:</label>
            <input
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#c7c4d6] rounded-xl focus:ring-2 focus:ring-[#4f4bce] bg-[#fcf8ff]"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between p-3 bg-[#fcf8ff] rounded-2xl border border-[#e4e1ec]">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#4f4bce]" />
                <div>
                  <span className="block text-xs font-bold text-[#1b1b23]">قفل تطبيق ولي الأمر برمز PIN</span>
                  <span className="text-[11px] text-[#464554]">يمنع الأطفال من تعديل وقت الشاشة</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={pinLockEnabled}
                onChange={(e) => setPinLockEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#4f4bce] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#fcf8ff] rounded-2xl border border-[#e4e1ec]">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#4f4bce]" />
                <div>
                  <span className="block text-xs font-bold text-[#1b1b23]">تنبيهات تخطي الوقت الفوري</span>
                  <span className="text-[11px] text-[#464554]">إشعار عند اقتراب انتهاء وقت الشاشة</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#4f4bce] cursor-pointer"
              />
            </div>
          </div>

          {/* Subscription / Plan Badge */}
          <div className="p-3.5 bg-gradient-to-r from-[#f0ecf8] to-[#e2dfff] rounded-2xl border border-[#c6c4fe] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#4f4bce]" />
              <div>
                <span className="block text-xs font-bold text-[#1b1b23]">باقة العائلة المميزة (سند بلس)</span>
                <span className="text-[11px] text-[#464554]">{deviceCount} أجهزة مقترنة من أصل 5</span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg">
              نشط
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#4f4bce] hover:bg-[#3630b6] text-white font-bold rounded-2xl shadow-md transition-all mt-2"
          >
            حفظ التعديلات
          </button>
        </form>
      </div>
    </div>
  );
};
