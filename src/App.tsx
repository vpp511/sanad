import React, { useState } from 'react';
import { Header } from './components/Header';
import { QrPairingView } from './components/QrPairingView';
import { DashboardView } from './components/DashboardView';
import { ChildDeviceSimulatorModal } from './components/ChildDeviceSimulatorModal';
import { TroubleshootingModal } from './components/TroubleshootingModal';
import { ManualPinModal } from './components/ManualPinModal';
import { DeviceDetailModal } from './components/DeviceDetailModal';
import { ParentProfileModal } from './components/ParentProfileModal';
import { INITIAL_DEVICES } from './data/mockDevices';
import { ChildDevice } from './types';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'pairing' | 'dashboard'>('pairing');
  const [devices, setDevices] = useState<ChildDevice[]>(INITIAL_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<ChildDevice | null>(null);
  
  // Modals state
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isTroubleshootingOpen, setIsTroubleshootingOpen] = useState(false);
  const [isManualPinOpen, setIsManualPinOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<{ message: string; childName: string } | null>(null);

  const PAIRING_PIN = '749-382';

  const handleDevicePaired = (newDevice: ChildDevice) => {
    setDevices((prev) => [newDevice, ...prev]);
    setSuccessToast({
      message: `تم ربط جهاز ${newDevice.childName} بنجاح!`,
      childName: newDevice.childName,
    });
    // Switch to dashboard after brief moment to celebrate
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 1200);
  };

  const handleUpdateDevice = (updated: ChildDevice) => {
    setDevices((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setSelectedDevice(updated);
  };

  const handleDeleteDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    setSelectedDevice(null);
  };

  const handleToggleInstantPause = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === deviceId) {
          const next = !d.isInstantPaused;
          return { ...d, isInstantPaused: next, status: next ? 'locked' : 'online' };
        }
        return d;
      })
    );
  };

  const handleExtendTime = (deviceId: string, minutes: number) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? { ...d, screenTimeLimitMinutes: d.screenTimeLimitMinutes + minutes }
          : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f2fd] font-tajawal text-[#1b1b23] flex flex-col relative selection:bg-[#4f4bce]/20 selection:text-[#4f4bce]">
      {/* Fixed Glassmorphic Header */}
      <Header
        title={activeTab === 'pairing' ? 'Qr Pairing' : 'سند - لوحة التحكم'}
        showBack={activeTab === 'pairing' && devices.length > 0}
        onBack={() => setActiveTab('dashboard')}
        onProfileClick={() => setIsProfileOpen(true)}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        deviceCount={devices.length}
      />

      {/* Success Notification Banner */}
      {successToast && (
        <div className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto bg-white border border-emerald-300 shadow-xl rounded-2xl p-4 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1b1b23]">{successToast.message}</h4>
              <p className="text-xs text-[#464554]">أصبح بإمكانك الآن متابعة وقت الشاشة وتخصيص التطبيقات</p>
            </div>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-[#777585] hover:text-[#1b1b23] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main View Container */}
      <main className="pt-16 flex-1 flex flex-col items-center">
        {activeTab === 'pairing' ? (
          <QrPairingView
            onOpenTroubleshooting={() => setIsTroubleshootingOpen(true)}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onOpenManualPin={() => setIsManualPinOpen(true)}
            pinCode={PAIRING_PIN}
          />
        ) : (
          <DashboardView
            devices={devices}
            onSelectDevice={(device) => setSelectedDevice(device)}
            onAddNewDevice={() => setActiveTab('pairing')}
            onToggleInstantPause={handleToggleInstantPause}
            onExtendTime={handleExtendTime}
          />
        )}
      </main>

      {/* Interactive Child Device Camera Simulator Modal */}
      <ChildDeviceSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSuccess={(newDev) => {
          handleDevicePaired(newDev);
        }}
        pinCode={PAIRING_PIN}
      />

      {/* Troubleshooting Help Modal */}
      <TroubleshootingModal
        isOpen={isTroubleshootingOpen}
        onClose={() => setIsTroubleshootingOpen(false)}
        onUsePin={() => setIsManualPinOpen(true)}
        pinCode={PAIRING_PIN}
      />

      {/* Manual 6-Digit PIN Modal */}
      <ManualPinModal
        isOpen={isManualPinOpen}
        onClose={() => setIsManualPinOpen(false)}
        onSuccess={(newDev) => {
          handleDevicePaired(newDev);
        }}
        defaultPin={PAIRING_PIN}
      />

      {/* Detailed Child Device Controls Modal */}
      <DeviceDetailModal
        device={selectedDevice}
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        onUpdateDevice={handleUpdateDevice}
        onDeleteDevice={handleDeleteDevice}
      />

      {/* Parent Profile & Security Passcode Modal */}
      <ParentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        deviceCount={devices.length}
      />
    </div>
  );
}
