import React, { useState, useEffect } from 'react';
import { Save, ToggleLeft, ToggleRight, Shield, Lock, Upload, FileText } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import adminService from '../services/adminService';

const SettingCard = ({ title, description, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
    {children}
  </div>
);

const ToggleSetting = ({ label, value, onChange, disabled = false }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-gray-900 dark:text-white">{label}</span>
    <button
      onClick={() => onChange(!value)}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${
        value
          ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
          : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {value ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
    </button>
  </div>
);

const InputSetting = ({ label, value, onChange, type = 'text', placeholder, min, max }) => (
  <div className="py-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) : e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>
);

const TextareaSetting = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div className="py-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>
);

function PlatformSettingsPage() {
  const [settings, setSettings] = useState({
    registrationEnabled: true,
    reviewRules: '',
    uploadLimits: {
      maxFileSize: 10, // MB
      maxFilesPerUser: 5,
      allowedFileTypes: ['pdf', 'doc', 'docx', 'txt', 'zip']
    },
    securitySettings: {
      requireEmailVerification: true,
      enableTwoFactorAuth: false,
      passwordMinLength: 8,
      sessionTimeout: 30 // minutes
    },
    privacySettings: {
      allowDataCollection: true,
      enableAnalytics: true,
      dataRetentionPeriod: 365 // days
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Mock API call - in real implementation, this would fetch from backend
      const fetchedSettings = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(settings); // Return current settings as mock
        }, 500);
      });
      setSettings(fetchedSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      // Mock API call - in real implementation, this would save to backend
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (path, value) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
          <div className="text-gray-900 dark:text-white text-xl">Loading platform settings...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Platform Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Control global platform behavior and configurations</p>
        </div>

        <div className="space-y-6">
          {/* Registration Settings */}
          <SettingCard
            title="Registration Settings"
            description="Control user registration and onboarding"
          >
            <ToggleSetting
              label="Enable User Registration"
              value={settings.registrationEnabled}
              onChange={(value) => updateSetting('registrationEnabled', value)}
            />
          </SettingCard>

          {/* Review Rules */}
          <SettingCard
            title="Review Rules Configuration"
            description="Define guidelines for project reviews and ratings"
          >
            <TextareaSetting
              label="Review Guidelines"
              value={settings.reviewRules}
              onChange={(value) => updateSetting('reviewRules', value)}
              placeholder="Enter review rules and guidelines..."
              rows={4}
            />
          </SettingCard>

          {/* Upload Limits */}
          <SettingCard
            title="Upload Limits"
            description="Set restrictions for file uploads"
          >
            <div className="space-y-4">
              <InputSetting
                label="Maximum File Size (MB)"
                value={settings.uploadLimits.maxFileSize}
                onChange={(value) => updateSetting('uploadLimits.maxFileSize', value)}
                type="number"
                min={1}
                max={100}
              />
              <InputSetting
                label="Maximum Files per User"
                value={settings.uploadLimits.maxFilesPerUser}
                onChange={(value) => updateSetting('uploadLimits.maxFilesPerUser', value)}
                type="number"
                min={1}
                max={50}
              />
              <InputSetting
                label="Allowed File Types (comma-separated)"
                value={settings.uploadLimits.allowedFileTypes.join(', ')}
                onChange={(value) => updateSetting('uploadLimits.allowedFileTypes', value.split(',').map(s => s.trim()))}
                placeholder="pdf, doc, docx, txt, zip"
              />
            </div>
          </SettingCard>

          {/* Security Settings */}
          <SettingCard
            title="Security Settings"
            description="Configure platform security measures"
          >
            <div className="space-y-4">
              <ToggleSetting
                label="Require Email Verification"
                value={settings.securitySettings.requireEmailVerification}
                onChange={(value) => updateSetting('securitySettings.requireEmailVerification', value)}
              />
              <ToggleSetting
                label="Enable Two-Factor Authentication"
                value={settings.securitySettings.enableTwoFactorAuth}
                onChange={(value) => updateSetting('securitySettings.enableTwoFactorAuth', value)}
              />
              <InputSetting
                label="Minimum Password Length"
                value={settings.securitySettings.passwordMinLength}
                onChange={(value) => updateSetting('securitySettings.passwordMinLength', value)}
                type="number"
                min={6}
                max={20}
              />
              <InputSetting
                label="Session Timeout (minutes)"
                value={settings.securitySettings.sessionTimeout}
                onChange={(value) => updateSetting('securitySettings.sessionTimeout', value)}
                type="number"
                min={5}
                max={480}
              />
            </div>
          </SettingCard>

          {/* Privacy Settings */}
          <SettingCard
            title="Privacy & Data Settings"
            description="Manage data collection and privacy policies"
          >
            <div className="space-y-4">
              <ToggleSetting
                label="Allow Data Collection for Analytics"
                value={settings.privacySettings.allowDataCollection}
                onChange={(value) => updateSetting('privacySettings.allowDataCollection', value)}
              />
              <ToggleSetting
                label="Enable Analytics Tracking"
                value={settings.privacySettings.enableAnalytics}
                onChange={(value) => updateSetting('privacySettings.enableAnalytics', value)}
              />
              <InputSetting
                label="Data Retention Period (days)"
                value={settings.privacySettings.dataRetentionPeriod}
                onChange={(value) => updateSetting('privacySettings.dataRetentionPeriod', value)}
                type="number"
                min={30}
                max={3650}
              />
            </div>
          </SettingCard>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default PlatformSettingsPage;
