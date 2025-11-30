import React, { useState } from "react";
import API from "../api/axios";
import { KeyRound, Mail, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverCode, setServerCode] = useState("");

  const requestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await API.post("/auth/forgot-password", { email });
      if (res.data.success) {
        setMsg(res.data.delivered ? "Verification code sent to your email" : "Email delivery not configured. Use the code shown below");
        if (res.data.code) setServerCode(String(res.data.code));
        setStep(2);
      } else {
        setMsg("Failed to send code");
      }
    } catch (err) {
      setMsg(err?.response?.data?.message || "Failed to send code");
    }
    setLoading(false);
  };

  const reset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await API.post("/auth/reset-password", { email, code, newPassword: password });
      if (res.data.success) {
        setMsg("Password updated");
      } else {
        setMsg("Reset failed");
      }
    } catch {
      setMsg("Reset failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <KeyRound className="text-indigo-600" /> Forgot Password
        </h1>
        {step === 1 && (
          <form onSubmit={requestCode} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <button disabled={loading} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-extrabold shadow-lg disabled:opacity-60">
              Send Code
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={reset} className="space-y-6">
            {serverCode && (
              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm">
                Use this verification code: <span className="font-bold">{serverCode}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button disabled={loading} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-extrabold shadow-lg disabled:opacity-60">
              Reset Password
            </button>
          </form>
        )}
        {msg && (
          <p className="mt-4 text-sm text-indigo-600 flex items-center gap-2"><CheckCircle className="w-4 h-4" />{msg}</p>
        )}
      </div>
    </div>
  );
}
