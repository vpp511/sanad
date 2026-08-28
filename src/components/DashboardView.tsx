import React from 'react';
import { Plus, Smartphone, Clock, ShieldCheck, BatteryCharging, Battery, Lock, Unlock, Moon, Sparkles, ChevronLeft, AlertCircle, Laptop, Tablet } from 'lucide-react';
import { ChildDevice } from '../types';

interface DashboardViewProps {
  devices: ChildDevice[];
  onSelectDevice: (device: ChildDevice) => void;
  onAddNewDevice: () => void;
  onToggleInstantPause: (deviceId: string) => void;
  onExtendTime: (deviceId: string, minutes: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  devices,
  onSelectDevice,
  onAddNewDevice,
  onToggleInstantPause,
  onExtendTime,
}) => {
  const totalScreenTime = devices.reduce((acc, d) => acc + d.screenTimeUsedMinutes, 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 space-y-6 text-[#1b1b23]">
      {/* Top Banner / Summary */}
      <div className="bg-gradient-to-r from-[#4f4bce] via-[#5a56d6] to-[#6866e9] text-white p-5 sm:p-7 rounded-3xl shadow-lg relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute left-10 top-0 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>حماية سند الذكية مفعّلة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-tajawal">لوحة إشراف العائلة</h2>
            <p className="text-xs sm:text-sm text-[#e2dfff] max-w-xl">
              متابعة وقت الشاشة وإدارة أجهزة الأطفال بكل طمأنينة عبر لوحة تحكم ذكية وفورية
            </p>
          </div>

          <button
            onClick={onAddNewDevice}
            className="min-h-[44px] bg-white text-[#4f4bce] hover:bg-[#f6f2fd] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-md active:scale-95 transition-all flex items-center gap-2 self-stretch sm:self-auto justify-center"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>إضافة جهاز جديد (QR)</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-5 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 text-center sm:text-right flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
            <span className="text-xs text-[#e2dfff]">الأجهزة المتصلة</span>
            <span className="text-xl font-extrabold font-mono-code mt-0.5">{devices.length} أجهزة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 text-center sm:text-right flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
            <span className="text-xs text-[#e2dfff]">مجموع الوقت اليوم</span>
            <span className="text-xl font-extrabold font-mono-code mt-0.5">{Math.floor(totalScreenTime / 60)}س {totalScreenTime % 60}د</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 text-center sm:text-right flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
            <span className="text-xs text-[#e2dfff]">حالة الحماية</span>
            <span className="text-xl font-extrabold text-emerald-300 flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              آمنة 100%
            </span>
          </div>
        </div>
      </div>

      {/* Devices Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
        <div>
          <h3 className="text-xl font-extrabold text-[#1b1b23] font-tajawal">أجهزة الأطفال المقترنة</h3>
          <p className="text-xs sm:text-sm text-[#464554]">اضغط على أي بطاقة لعرض تفاصيل التطبيقات وتعديل الحدود الزمنية</p>
        </div>
        <button
          onClick={onAddNewDevice}
          className="min-h-[44px] text-xs sm:text-sm font-bold text-[#4f4bce] hover:text-[#3630b6] flex items-center gap-1.5 self-start sm:self-auto py-1"
        >
          <Plus className="w-4 h-4" />
          <span>ربط جهاز إضافي</span>
        </button>
      </div>

      {/* Responsive Devices Cards Grid (1 col on mobile, 2 col on tablet/small desktop, 3 col on large desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {devices.map((device) => {
          const percent = Math.min(100, Math.round((device.screenTimeUsedMinutes / device.screenTimeLimitMinutes) * 100));
          const isNearLimit = percent >= 85;

          return (
            <div
              key={device.id}
              className="bg-white rounded-3xl p-5 border border-[#e2dfff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0" onClick={() => onSelectDevice(device)}>
                  <div className="text-3xl p-2 bg-[#f0ecf8] rounded-2xl border border-[#e2dfff] group-hover:scale-105 transition-transform flex-shrink-0">
                    {device.childAvatar}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-base text-[#1b1b23] font-tajawal flex items-center gap-1.5 truncate">
                      <span className="truncate">{device.childName}</span>
                      <span className="text-xs font-normal text-[#777585] flex-shrink-0">({device.childAge} سنوات)</span>
                    </h4>
                    <p className="text-xs text-[#464554] truncate">{device.name}</p>
                  </div>
                </div>

                {/* Battery & Status */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    device.isInstantPaused
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {device.isInstantPaused ? 'موقوف مؤقتاً' : 'متصل'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#464554] font-mono-code font-bold">
                    {device.isCharging ? (
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Battery className="w-3.5 h-3.5 text-[#777585]" />
                    )}
                    <span>{device.batteryLevel}%</span>
                  </div>
                </div>
              </div>

              {/* Screen Time Progress Bar */}
              <div className="space-y-1.5 cursor-pointer bg-[#f9f8fc] p-3 rounded-2xl border border-[#ece7f6]" onClick={() => onSelectDevice(device)}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#464554] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#4f4bce]" />
                    وقت الشاشة:
                  </span>
                  <span className="font-mono-code font-bold text-[#1b1b23]">
                    {Math.floor(device.screenTimeUsedMinutes / 60)}س {device.screenTimeUsedMinutes % 60}د / {Math.floor(device.screenTimeLimitMinutes / 60)}س {device.screenTimeLimitMinutes % 60}د
                  </span>
                </div>

                <div className="w-full bg-[#e4e1ec] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isNearLimit ? 'bg-[#a63a25]' : 'bg-[#4f4bce]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#777585] pt-0.5">
                  <span className="truncate max-w-[140px]">النشاط: {device.currentApp || 'الشاشة الرئيسية'}</span>
                  <span className="font-bold font-mono-code">{percent}% مستهلك</span>
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="pt-2 border-t border-[#f0ecf8] flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleInstantPause(device.id)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    device.isInstantPaused
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      : 'bg-[#e2dfff] text-[#4f4bce] hover:bg-[#c6c4fe]'
                  }`}
                >
                  {device.isInstantPaused ? (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      <span>إلغاء القفل</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>قفل فوري</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onExtendTime(device.id, 15)}
                  className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold bg-[#f0ecf8] hover:bg-[#e2dfff] text-[#1b1b23] transition-colors flex items-center gap-1 active:scale-95"
                  title="تمديد 15 دقيقة إضافية لوقت الشاشة"
                >
                  +15 دقيقة
                </button>

                <button
                  onClick={() => onSelectDevice(device)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#777585] hover:text-[#4f4bce] hover:bg-[#f6f2fd] transition-colors"
                  title="الإعدادات الكاملة"
                  aria-label="عرض الإعدادات الكاملة"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pairing Info Guide Card */}
      <div className="bg-[#f0ecf8]/70 p-5 sm:p-6 rounded-3xl border border-[#e2dfff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#4f4bce] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-[#1b1b23]">هل ترغب في ربط جهاز لوحي أو هاتف إضافي؟</h4>
            <p className="text-xs sm:text-sm text-[#464554] mt-0.5">
              افتح شاشة الإقران برمز QR وامسح الرمز من تطبيق "سند للأطفال" في ثوانٍ معدودة.
            </p>
          </div>
        </div>
        <button
          onClick={onAddNewDevice}
          className="min-h-[44px] px-5 py-2.5 bg-[#4f4bce] hover:bg-[#3630b6] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all whitespace-nowrap self-stretch sm:self-auto text-center active:scale-95"
        >
          شاشة مسح QR
        </button>
      </div>
    </div>
  );
};

