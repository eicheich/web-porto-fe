import React, { useState } from 'react';
import {
  Loader2,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  RotateCcw,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { predictFraud } from '../services/mlApi';
import Button from './Button';

const MERCHANT_CATEGORIES = [
  'Groceries',
  'Electronics',
  'Online Retail',
  'Travel',
  'Crypto Exchange',
];

const CARD_TYPES = ['Visa', 'Mastercard', 'Amex', 'Discover', 'RuPay'];

const AUTH_METHODS = ['PIN', 'OTP', '3D Secure', 'Biometric', 'No Authentication'];

const CHANNELS = ['Online', 'POS', 'ATM', 'In-App', 'Contactless'];

const DEVICE_TYPES = [
  'Android Phone',
  'iPhone',
  'Windows PC',
  'Mac',
  'Tablet',
  'POS Terminal',
  'ATM Machine',
  'Smart Watch',
];

const DAYS_OF_WEEK = [
  { value: 0, label: '0 — Monday' },
  { value: 1, label: '1 — Tuesday' },
  { value: 2, label: '2 — Wednesday' },
  { value: 3, label: '3 — Thursday' },
  { value: 4, label: '4 — Friday' },
  { value: 5, label: '5 — Saturday' },
  { value: 6, label: '6 — Sunday' },
];

const SAFE_SAMPLE = {
  amount_usd: 45.0,
  merchant_category: 'Groceries',
  card_type: 'Visa',
  auth_method: 'PIN',
  channel: 'POS',
  device_type: 'POS Terminal',
  is_foreign_transaction: false,
  hours_since_last_txn: 24.0,
  txn_count_last_24h: 1,
  distance_from_home_km: 2.5,
  card_age_months: 36,
  customer_age: 42,
  account_balance_usd: 6800.0,
  is_new_merchant: false,
  used_vpn: false,
  ip_country_mismatch: false,
  billing_shipping_mismatch: false,
  cvv_retry_count: 0,
  velocity_score: 0.5,
  time_of_day_hour: 10,
  day_of_week: 1,
  is_ai_generated_scam_attempt: false,
  merchant_risk_score: 5,
  prior_disputes: 0,
};

const FRAUD_SAMPLE = {
  amount_usd: 9500.0,
  merchant_category: 'Crypto Exchange',
  card_type: 'Visa',
  auth_method: 'No Authentication',
  channel: 'Online',
  device_type: 'Windows PC',
  is_foreign_transaction: true,
  hours_since_last_txn: 0.1,
  txn_count_last_24h: 18,
  distance_from_home_km: 4500.0,
  card_age_months: 1,
  customer_age: 22,
  account_balance_usd: 100.0,
  is_new_merchant: true,
  used_vpn: true,
  ip_country_mismatch: true,
  billing_shipping_mismatch: true,
  cvv_retry_count: 3,
  velocity_score: 9.5,
  time_of_day_hour: 3,
  day_of_week: 6,
  is_ai_generated_scam_attempt: true,
  merchant_risk_score: 95,
  prior_disputes: 4,
};

const DEFAULT_FORM = {
  amount_usd: 250.0,
  merchant_category: 'Electronics',
  card_type: 'Visa',
  auth_method: '3D Secure',
  channel: 'Online',
  device_type: 'Windows PC',
  customer_age: 35,
  card_age_months: 24,
  account_balance_usd: 4500.0,
  prior_disputes: 0,
  hours_since_last_txn: 12.5,
  txn_count_last_24h: 3,
  distance_from_home_km: 15.2,
  velocity_score: 1.2,
  time_of_day_hour: 14,
  day_of_week: 2,
  merchant_risk_score: 15,
  cvv_retry_count: 0,
  is_foreign_transaction: false,
  is_new_merchant: false,
  used_vpn: false,
  ip_country_mismatch: false,
  billing_shipping_mismatch: false,
  is_ai_generated_scam_attempt: false,
};

const RISK_BADGE_STYLES = {
  High: 'bg-[#FEE2E2] text-[#991B1B] border-[#DC2626]',
  Medium: 'bg-[#FEF9C3] text-[#854D0E] border-[#CA8A04]',
  Low: 'bg-[#DCFCE7] text-[#166534] border-[#16A34A]',
  // Fallbacks for backward compatibility
  'High Risk': 'bg-[#FEE2E2] text-[#991B1B] border-[#DC2626]',
  'Elevated Caution': 'bg-[#FEF9C3] text-[#854D0E] border-[#CA8A04]',
  'Suspicious (Above Threshold)': 'bg-[#FFEDD5] text-[#9A3412] border-[#EA580C]',
  'Low Risk': 'bg-[#DCFCE7] text-[#166534] border-[#16A34A]',
};

const TABS = [
  { id: 'txn', label: 'A. Transaction & Device' },
  { id: 'customer', label: 'B. Customer & History' },
  { id: 'activity', label: 'C. Activity & Location' },
  { id: 'security', label: 'D. Risk & Security' },
];

const SECURITY_FLAGS = [
  { key: 'is_foreign_transaction', label: 'Foreign transaction (outside card country)' },
  { key: 'is_new_merchant', label: 'First-time transaction at this merchant' },
  { key: 'used_vpn', label: 'VPN / Proxy detected' },
  { key: 'ip_country_mismatch', label: 'IP country differs from card issuer country' },
  { key: 'billing_shipping_mismatch', label: 'Billing address differs from shipping address' },
  { key: 'is_ai_generated_scam_attempt', label: 'Bot / AI-generated scam pattern indicator' },
];

export default function FraudDetectionDemo() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [activeTab, setActiveTab] = useState('txn');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset) => {
    setForm(preset);
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await predictFraud(form);
      setResult(res);
    } catch (err) {
      setError(err.message || 'Failed to analyze transaction.');
    } finally {
      setLoading(false);
    }
  };

  const rawProb =
    result?.fraud_probability !== undefined
      ? result.fraud_probability
      : result?.confidence_score ?? 0;
  const confidencePct = result ? Math.max(0, Math.min(100, rawProb * 100)) : 0;
  const thresholdPct = result
    ? Math.max(0, Math.min(100, (result.threshold_used ?? 0.93) * 100))
    : 93;
  const isFraud = Boolean(result?.is_fraud);
  const riskBadgeClass =
    RISK_BADGE_STYLES[result?.risk_level] || 'bg-[#E5E7EB] text-[#111827] border-[#6B7280]';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT: 24-Field Grouped Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between gap-4"
      >
        <div className="space-y-4">
          {/* Quick-Fill Preset Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
            <span className="text-[11px] font-mono font-bold text-[#0078D7] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} />
              Quick-Fill Presets
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => applyPreset(SAFE_SAMPLE)}
                className="border-[#BBF7D0]! bg-[#F0FDF4]! text-[#166534]! hover:bg-[#166534]! hover:text-white!"
              >
                Sample: Safe (Legitimate)
              </Button>
              <Button
                type="button"
                onClick={() => applyPreset(FRAUD_SAMPLE)}
                className="border-[#FECACA]! bg-[#FEF2F2]! text-[#991B1B]! hover:bg-[#DC2626]! hover:text-white!"
              >
                Sample: Suspicious (Fraud)
              </Button>
              <Button
                type="button"
                onClick={() => applyPreset(DEFAULT_FORM)}
                title="Reset to default values"
              >
                <RotateCcw size={11} />
                Reset
              </Button>
            </div>
          </div>

          {/* Metro Pivot Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-[#E2E8F0] pb-3">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* SECTION A: Transaction & Device */}
          {activeTab === 'txn' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="fraud-amount" className="block text-xs font-bold text-[#111827] mb-1">
                  Amount (USD) *
                </label>
                <input
                  id="fraud-amount"
                  type="number"
                  step="any"
                  min="0.01"
                  required
                  value={form.amount_usd}
                  onChange={(e) => updateField('amount_usd', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-merchant-cat" className="block text-xs font-bold text-[#111827] mb-1">
                  Merchant Category *
                </label>
                <select
                  id="fraud-merchant-cat"
                  value={form.merchant_category}
                  onChange={(e) => updateField('merchant_category', e.target.value)}
                  className="w-full px-2.5 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                >
                  {MERCHANT_CATEGORIES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fraud-card-type" className="block text-xs font-bold text-[#111827] mb-1">
                  Card Type *
                </label>
                <select
                  id="fraud-card-type"
                  value={form.card_type}
                  onChange={(e) => updateField('card_type', e.target.value)}
                  className="w-full px-2.5 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                >
                  {CARD_TYPES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fraud-auth" className="block text-xs font-bold text-[#111827] mb-1">
                  Auth Method *
                </label>
                <select
                  id="fraud-auth"
                  value={form.auth_method}
                  onChange={(e) => updateField('auth_method', e.target.value)}
                  className="w-full px-2.5 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                >
                  {AUTH_METHODS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fraud-channel" className="block text-xs font-bold text-[#111827] mb-1">
                  Channel *
                </label>
                <select
                  id="fraud-channel"
                  value={form.channel}
                  onChange={(e) => updateField('channel', e.target.value)}
                  className="w-full px-2.5 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                >
                  {CHANNELS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fraud-device" className="block text-xs font-bold text-[#111827] mb-1">
                  Device Type *
                </label>
                <select
                  id="fraud-device"
                  value={form.device_type}
                  onChange={(e) => updateField('device_type', e.target.value)}
                  className="w-full px-2.5 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                >
                  {DEVICE_TYPES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* SECTION B: Customer & History */}
          {activeTab === 'customer' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="fraud-cust-age" className="block text-xs font-bold text-[#111827] mb-1">
                  Customer Age (18–120) *
                </label>
                <input
                  id="fraud-cust-age"
                  type="number"
                  min="18"
                  max="120"
                  step="1"
                  required
                  value={form.customer_age}
                  onChange={(e) => updateField('customer_age', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-card-age" className="block text-xs font-bold text-[#111827] mb-1">
                  Card Age (Months, ≥ 0) *
                </label>
                <input
                  id="fraud-card-age"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={form.card_age_months}
                  onChange={(e) => updateField('card_age_months', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-balance" className="block text-xs font-bold text-[#111827] mb-1">
                  Account Balance (USD, ≥ 0) *
                </label>
                <input
                  id="fraud-balance"
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={form.account_balance_usd}
                  onChange={(e) => updateField('account_balance_usd', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-disputes" className="block text-xs font-bold text-[#111827] mb-1">
                  Prior Disputes / Chargebacks (≥ 0)
                </label>
                <input
                  id="fraud-disputes"
                  type="number"
                  min="0"
                  step="1"
                  value={form.prior_disputes}
                  onChange={(e) => updateField('prior_disputes', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECTION C: Activity & Location */}
          {activeTab === 'activity' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="fraud-hours-last" className="block text-xs font-bold text-[#111827] mb-1">
                  Hours Since Last Txn (≥ 0) *
                </label>
                <input
                  id="fraud-hours-last"
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={form.hours_since_last_txn}
                  onChange={(e) => updateField('hours_since_last_txn', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-txn-24h" className="block text-xs font-bold text-[#111827] mb-1">
                  Txn Count Last 24h (≥ 0) *
                </label>
                <input
                  id="fraud-txn-24h"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={form.txn_count_last_24h}
                  onChange={(e) => updateField('txn_count_last_24h', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-distance" className="block text-xs font-bold text-[#111827] mb-1">
                  Distance from Home (km, ≥ 0) *
                </label>
                <input
                  id="fraud-distance"
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={form.distance_from_home_km}
                  onChange={(e) => updateField('distance_from_home_km', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-velocity" className="block text-xs font-bold text-[#111827] mb-1">
                  Velocity Score (≥ 0) *
                </label>
                <input
                  id="fraud-velocity"
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={form.velocity_score}
                  onChange={(e) => updateField('velocity_score', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-hour" className="block text-xs font-bold text-[#111827] mb-1">
                  Time of Day Hour (0–23) *
                </label>
                <input
                  id="fraud-hour"
                  type="number"
                  min="0"
                  max="23"
                  step="1"
                  required
                  value={form.time_of_day_hour}
                  onChange={(e) => updateField('time_of_day_hour', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="fraud-dow" className="block text-xs font-bold text-[#111827] mb-1">
                  Day of Week (0=Mon .. 6=Sun) *
                </label>
                <select
                  id="fraud-dow"
                  value={form.day_of_week}
                  onChange={(e) => updateField('day_of_week', Number(e.target.value))}
                  className="w-full px-2.5 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                >
                  {DAYS_OF_WEEK.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* SECTION D: Risk & Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="fraud-merchant-risk" className="block text-xs font-bold text-[#111827] mb-1">
                    Merchant Risk Score (0–100) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="fraud-merchant-risk"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={form.merchant_risk_score}
                      onChange={(e) => updateField('merchant_risk_score', parseFloat(e.target.value))}
                      className="flex-1 accent-[#0078D7] cursor-pointer"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={form.merchant_risk_score}
                      onChange={(e) => updateField('merchant_risk_score', e.target.value)}
                      className="w-16 px-2 py-1 text-xs font-mono bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none text-right"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="fraud-cvv" className="block text-xs font-bold text-[#111827] mb-1">
                    CVV Retry Count (0–10)
                  </label>
                  <input
                    id="fraud-cvv"
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    value={form.cvv_retry_count}
                    onChange={(e) => updateField('cvv_retry_count', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {SECURITY_FLAGS.map((flag) => (
                  <label
                    key={flag.key}
                    className="bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0078D7] px-3 py-2 flex items-center gap-2.5 text-xs text-[#0F172A] cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(form[flag.key])}
                      onChange={(e) => updateField(flag.key, e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#0078D7] cursor-pointer shrink-0"
                    />
                    <span className="leading-tight font-medium">{flag.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Bar */}
        <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-[#4B5563]">
            24 transaction signals · 93% risk threshold
          </span>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? 'Evaluating...' : 'Analyze Transaction'}
          </Button>
        </div>
      </form>

      {/* RIGHT: Fraud Prediction Result Panel */}
      <div className="lg:col-span-5 bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#0078D7] uppercase tracking-wider block mb-3">
            Analysis Result
          </span>

          {loading && (
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 mb-4 flex items-center gap-2 text-xs text-[#0F172A]">
              <Loader2 size={15} className="animate-spin shrink-0 text-[#0078D7]" />
              <span className="font-semibold">Evaluating transaction risk...</span>
            </div>
          )}

          {error && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] p-3 mb-4 flex items-start gap-2 text-xs text-[#991B1B]">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span className="break-words">{error}</span>
            </div>
          )}

          {result ? (
            <div className="space-y-4">
              {/* Prediction Label + Risk Level Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isFraud ? (
                    <ShieldAlert size={26} className="text-[#DC2626] shrink-0" />
                  ) : (
                    <ShieldCheck size={26} className="text-[#008272] shrink-0" />
                  )}
                  <h3
                    className={`font-metro text-2xl sm:text-3xl font-light tracking-tight ${
                      isFraud ? 'text-[#991B1B]' : 'text-[#008272]'
                    }`}
                  >
                    {result.prediction_label}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-0.5 text-[11px] font-mono font-bold border ${riskBadgeClass}`}
                >
                  {result.risk_level}
                </span>
              </div>

              {/* Confidence Score Bar with Threshold Marker */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 space-y-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-[#0F172A]">Fraud Probability</span>
                  <span className="font-mono text-lg font-bold text-[#0078D7]">
                    {confidencePct.toFixed(1)}%
                  </span>
                </div>

                {/* Bar + Vertical Threshold Marker */}
                <div className="relative pt-1 pb-5">
                  <div className="h-3.5 bg-[#E2E8F0] relative overflow-visible">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isFraud ? 'bg-[#DC2626]' : 'bg-[#008272]'
                      }`}
                      style={{ width: `${confidencePct}%` }}
                    />
                    {/* Threshold marker line */}
                    <div
                      className="absolute -top-1 -bottom-1 w-[2px] bg-[#0F172A] z-10"
                      style={{ left: `${thresholdPct}%` }}
                      title={`Decision threshold: ${thresholdPct.toFixed(0)}%`}
                    />
                  </div>
                  <div
                    className="absolute bottom-0 -translate-x-1/2 text-[10px] font-mono font-bold text-[#0F172A] whitespace-nowrap"
                    style={{ left: `${thresholdPct}%` }}
                  >
                    ▲ Threshold ({thresholdPct.toFixed(0)}%)
                  </div>
                </div>

                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Transactions scoring at or above{' '}
                  <strong className="text-[#0F172A]">{thresholdPct.toFixed(0)}%</strong> are classified as suspicious,
                  helping protect cardholders while keeping normal checkout smooth.
                </p>
              </div>

              {/* Technical Summary */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-2">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Outcome</div>
                  <div
                    className={`text-sm font-mono font-bold ${
                      isFraud ? 'text-[#DC2626]' : 'text-[#008272]'
                    }`}
                  >
                    {isFraud ? 'Flagged' : 'Passed'}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-2">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Threshold</div>
                  <div className="text-sm font-mono font-bold text-[#0F172A]">
                    {thresholdPct.toFixed(0)}%
                  </div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-2">
                  <div className="text-[10px] font-mono text-[#64748B] uppercase">Status</div>
                  <div className="text-sm font-mono font-bold text-[#008272]">Verified</div>
                </div>
              </div>

              {result.model_version && (
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-[#0078D7]">
                  <span className="font-bold">Model:</span>
                  <span>{result.model_version}</span>
                </div>
              )}
            </div>
          ) : !loading && !error ? (
            <div className="space-y-2">
              <h3 className="font-metro text-2xl font-light text-[#0F172A]">
                Ready to scan.
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Pick a preset sample above or customize the 24 transaction features across the 4 tabs,
                then click <strong>Analyze Transaction</strong>.
              </p>
            </div>
          ) : null}
        </div>

        <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-[#4B5563]">
            Tuned classification model
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              as="a"
              href="https://huggingface.co/unalivehooman/credit-card-fraud-detection-2026"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={11} />
              Hugging Face
            </Button>
            <Button
              as="a"
              href="https://drive.google.com/file/d/1DzipSpCgneMpUN8lj7rc9m7LPIEGR4Ti/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={11} />
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
