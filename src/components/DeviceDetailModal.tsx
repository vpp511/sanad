import React, { useState } from 'react';
import { X, Clock, Moon, Shield, Lock, Unlock, BatteryCharging, Battery, Smartphone, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ChildDevice, InstalledApp } from '../types';

interface DeviceDetailModalProps {
  device: ChildDevice | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateDevice: (updated: ChildDevice) => void;
  onDeleteDevice: (deviceId: string) => void;
}

export const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({
  device,
  isOpen,
  onClose,
  onUpdateDevice,
  onDeleteDevice,
}) => {
  if (!isOpen || !device) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'apps' | 'schedule'>('overview');
  const [screenLimit, setScreenLimit] = useState(device.screenTimeLimitMinutes);
  const [bedtimeStart, setBedtimeStart] = useState(device.bedtimeStart);
  const [bedtimeEnd, setBedtimeEnd] = useState(device.bedtimeEnd);
  const [apps, setApps] = useState<InstalledApp[]>(device.installedApps);
  const [isInstantPaused, setIsInstantPaused] = useState(device.isInstantPaused);
  const [webFilter, setWebFilter] = useState(device.webFilterActive);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const toggleAppBlock = (appId: string) => {
    const updated = apps.map((app) =>
      app.id === appId ? { ...app, isBlocked: !app.isBlocked } : app
    );
    setApps(updated);
    saveChanges({ ...device, installedApps: updated });
  };

  const toggleInstantPause = () => {
    const nextState = !isInstantPaused;
    setIsInstantPaused(nextState);
    saveChanges({ ...device, isInstantPaused: nextState, status: nextState ? 'locked' : 'online' });
  };

  const saveChanges = (updatedObj?: Partial<ChildDevice>) => {
    const newDev: ChildDevice = {
      ...device,
      screenTimeLimitMinutes: screenLimit,
      bedtimeStart,
      bedtimeEnd,
      installedApps: apps,
      isInstantPaused,
      webFilterActive: webFilter,
      ...(updatedObj || {}),
    };
    onUpdateDevice(newDev);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const progressPercent = Math.min(100, Math.round((device.screenTimeUsedMinutes / screenLimit) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#e2dfff] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f0ecf8] border-b border-[#e4e1ec]">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-1 bg-white rounded-2xl shadow-xs">{device.childAvatar}</div>
            <div>
              <h3 className="font-bold text-[#1b1b23] text-base font-tajawal flex items-center gap-2">
                <span>جهاز {device.childName}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  device.isInstantPaused
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {device.isInstantPaused ? 'مقفل مؤقتاً' : 'متصل ونشط'}
                </span>
              </h3>
              <p className="text-xs text-[#464554]">{device.name} • {device.model}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777585] hover:bg-[#e4e1ec] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-[#e4e1ec] bg-[#fcf8ff] px-6 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'overview'
                ? 'text-[#4f4bce] border-b-2 border-[#4f4bce]'
                : 'text-[#777585] hover:text-[#1b1b23]'
            }`}
          >
            نظرة عامة والوقت
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'apps'
                ? 'text-[#4f4bce] border-b-2 border-[#4f4bce]'
                : 'text-[#777585] hover:text-[#1b1b23]'
            }`}
          >
            إدارة التطبيقات ({apps.length})
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'schedule'
                ? 'text-[#4f4bce] border-b-2 border-[#4f4bce]'
                : 'text-[#777585] hover:text-[#1b1b23]'
            }`}
          >
            جدول النوم والأمان
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {showSavedToast && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              تم حفظ وتطبيق التغييرات على جهاز {device.childName} مباشرة
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick Actions Strip */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={toggleInstantPause}
                  className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                    isInstantPaused
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : 'bg-[#f0ecf8] border-[#e2dfff] text-[#1b1b23] hover:bg-[#e2dfff]'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold">
                      {isInstantPaused ? 'إلغاء القفل الفوري' : 'قفل الشاشة الفوري'}
                    </span>
                    <span className="text-[11px] text-[#464554]">
                      {isInstantPaused ? 'الشاشة مقفلة الآن' : 'إيقاف مؤقت للاستراحة'}
                    </span>
                  </div>
                  {isInstantPaused ? (
                    <Unlock className="w-5 h-5 text-rose-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-[#4f4bce]" />
                  )}
                </button>

                <div className="p-3.5 rounded-2xl border border-[#e4e1ec] bg-[#fcf8ff] flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-[#1b1b23]">حالة البطارية</span>
                    <span className="text-[11px] text-[#464554] font-mono-code font-bold">
                      {device.batteryLevel}% {device.isCharging ? '(شحن ⚡)' : ''}
                    </span>
                  </div>
                  {device.isCharging ? (
                    <BatteryCharging className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Battery className="w-6 h-6 text-[#5a598c]" />
                  )}
                </div>
              </div>

              {/* Daily Screen Time Card */}
              <div className="bg-white p-4 rounded-2xl border border-[#e4e1ec] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4f4bce]" />
                    <span className="text-xs font-bold text-[#1b1b23]">استخدام الشاشة اليوم</span>
                  </div>
                  <span className="text-xs font-mono-code font-bold text-[#4f4bce]">
                    {Math.floor(device.screenTimeUsedMinutes / 60)} س و {device.screenTimeUsedMinutes % 60} د / {Math.floor(screenLimit / 60)} س
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#e4e1ec] h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progressPercent > 90 ? 'bg-[#a63a25]' : 'bg-[#4f4bce]'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Slider for limit */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#1b1b23] mb-1">
                    الحد اليومي المسموح به: <span className="text-[#4f4bce] font-bold">{screenLimit} دقيقة ({Math.floor(screenLimit / 60)} ساعة و {screenLimit % 60} دقيقة)</span>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="360"
                    step="15"
                    value={screenLimit}
                    onChange={(e) => {
                      setScreenLimit(Number(e.target.value));
                      saveChanges({ screenTimeLimitMinutes: Number(e.target.value) });
                    }}
                    className="w-full accent-[#4f4bce] cursor-pointer"
                  />
                </div>
              </div>

              {/* Current Activity */}
              <div className="bg-[#f0ecf8]/70 p-3.5 rounded-2xl border border-[#e2dfff] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#777585] block">التطبيق النشط حالياً:</span>
                  <span className="text-xs font-bold text-[#1b1b23]">{device.currentApp || 'الشاشة الرئيسية'}</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-100 font-bold px-2.5 py-0.5 rounded-full">
                  مباشر
                </span>
              </div>
            </div>
          )}

          {activeTab === 'apps' && (
            <div className="space-y-3">
              <p className="text-xs text-[#464554]">
                يمكنك حظر أي تطبيق فوراً أو السماح به لجهاز {device.childName}:
              </p>
              <div className="space-y-2">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-[#fcf8ff] border border-[#e4e1ec] rounded-2xl hover:bg-white transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        app.isBlocked ? 'bg-rose-100 text-rose-700' : 'bg-[#e2dfff] text-[#4f4bce]'
                      }`}>
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#1b1b23]">{app.name}</h5>
                        <p className="text-[11px] text-[#777585]">
                          {app.category} • استخدام اليوم: {app.timeUsedMinutes} د
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAppBlock(app.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        app.isBlocked
                          ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          : 'bg-[#e2dfff] text-[#4f4bce] hover:bg-[#c6c4fe]'
                      }`}
                    >
                      {app.isBlocked ? 'محظور 🚫' : 'مسموح ✅'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-[#e4e1ec] space-y-3">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#4f4bce]" />
                  <h5 className="text-xs font-bold text-[#1b1b23]">وضع النوم ووقت النوم الإجباري</h5>
                </div>
                <p className="text-xs text-[#464554]">
                  تقفل الشاشة تلقائياً لمنح الطفل نوماً صحياً ومنع التصفح الليلي.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1b1b23] mb-1">يبدأ القفل عند:</label>
                    <input
                      type="time"
                      value={bedtimeStart}
                      onChange={(e) => {
                        setBedtimeStart(e.target.value);
                        saveChanges({ bedtimeStart: e.target.value });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#c7c4d6] rounded-xl focus:ring-2 focus:ring-[#4f4bce]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1b1b23] mb-1">ينتهي القفل عند:</label>
                    <input
                      type="time"
                      value={bedtimeEnd}
                      onChange={(e) => {
                        setBedtimeEnd(e.target.value);
                        saveChanges({ bedtimeEnd: e.target.value });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#c7c4d6] rounded-xl focus:ring-2 focus:ring-[#4f4bce]"
                    />
                  </div>
                </div>
              </div>

              {/* Web Filter */}
              <div className="flex items-center justify-between p-4 bg-[#f0ecf8]/70 rounded-2xl border border-[#e2dfff]">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#4f4bce]" />
                  <div>
                    <h5 className="text-xs font-bold text-[#1b1b23]">تصفية المحتوى والبحث الآمن</h5>
                    <p className="text-[11px] text-[#464554]">حجب المواقع غير اللائقة ومحركات البحث العشوائية</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={webFilter}
                  onChange={(e) => {
                    setWebFilter(e.target.checked);
                    saveChanges({ webFilterActive: e.target.checked });
                  }}
                  className="w-5 h-5 accent-[#4f4bce] cursor-pointer rounded"
                />
              </div>

              {/* Danger Zone: Unlink device */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (confirm(`هل أنت متأكد من إلغاء اقتران جهاز ${device.childName}؟`)) {
                      onDeleteDevice(device.id);
                      onClose();
                    }
                  }}
                  className="w-full py-2.5 px-4 text-xs font-bold text-[#ba1a1a] hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  إلغاء اقتران هذا الجهاز وحذفه من سند
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f0ecf8] border-t border-[#e4e1ec] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#4f4bce] hover:bg-[#3630b6] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
