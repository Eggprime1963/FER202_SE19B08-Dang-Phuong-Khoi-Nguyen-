import React, { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh'
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>⚙️ System Settings</h2>
      
      <div style={{ display: 'grid', gap: '25px' }}>
        {/* Notification Settings */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '20px', color: '#34495e' }}>🔔 Notification Preferences</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                style={{ transform: 'scale(1.2)' }}
              />
              <span>📧 Email notifications for new orders</span>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                style={{ transform: 'scale(1.2)' }}
              />
              <span>🔔 Push notifications for alerts</span>
            </label>
          </div>
        </div>

        {/* Appearance Settings */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '20px', color: '#34495e' }}>🎨 Appearance</h3>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span>🌙 Dark mode</span>
          </label>
        </div>

        {/* Regional Settings */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '20px', color: '#34495e' }}>🌍 Regional Settings</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                🗣️ Language
              </label>
              <select 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                🕒 Timezone
              </label>
              <select 
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              >
                <option value="Asia/Ho_Chi_Minh">Ho Chi Minh City (GMT+7)</option>
                <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                <option value="America/New_York">New York (GMT-5)</option>
                <option value="Europe/London">London (GMT+0)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onClick={() => setSettings({
              emailNotifications: true,
              pushNotifications: false,
              darkMode: false,
              language: 'vi',
              timezone: 'Asia/Ho_Chi_Minh'
            })}
          >
            🔄 Reset to Default
          </button>
          
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onClick={() => {
              alert('Settings saved successfully! 🎉');
            }}
          >
            💾 Save Changes
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px',
        border: '1px solid #3498db'
      }}>
        <h4 style={{ color: '#2980b9', marginBottom: '10px' }}>
          🎯 Nested Route: /dashboard/settings
        </h4>
        <p style={{ color: '#2c3e50', lineHeight: '1.6', margin: 0 }}>
          Trang Settings này được render bên trong <code>&lt;Outlet /&gt;</code> của DashboardLayout.
          Layout (sidebar + header) được chia sẻ, chỉ có phần content này thay đổi khi điều hướng.
        </p>
      </div>
    </div>
  );
}

export default Settings;