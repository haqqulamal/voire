import React from "react";
import { LogIn, Key, HelpCircle, Mail, ShieldCheck } from "lucide-react";
import { ViewPage, User } from "../types";

interface LoginRegisterPageProps {
  currentUser: User;
  onLoginSuccess: (name: string, email: string) => void;
  onLogin?: (email: string, password: string) => Promise<void>;
  onRegister?: (name: string, email: string, password: string) => Promise<void>;
  setActivePage: (page: ViewPage) => void;
}

export default function LoginRegisterPage({
  currentUser,
  onLoginSuccess,
  onLogin,
  onRegister,
  setActivePage,
}: LoginRegisterPageProps) {
  // Active internal sub-tab: "login" | "register" | "forgot"
  const [activeTab, setActiveTab] = React.useState<"login" | "register" | "forgot">("login");

  // Form entries
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Feedback notifications
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [feedbackType, setFeedbackType] = React.useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      if (activeTab === "login") {
      if (!email || !password) {
        setFeedbackType("error");
        setFeedback("Please fill out all login credentials.");
        return;
      }
      if (onLogin) {
        await onLogin(email, password);
      } else {
      const resolvedName = email.split("@")[0];
      const capitalized = resolvedName.charAt(0).toUpperCase() + resolvedName.slice(1);
      onLoginSuccess(capitalized, email);
      }
      setFeedbackType("success");
      setFeedback("Successfully signed in. Welcome back to VOIRE.");
      setTimeout(() => {
        setActivePage("homepage");
      }, 1500);

    } else if (activeTab === "register") {
      if (!name || !email || !password || !confirmPassword) {
        setFeedbackType("error");
        setFeedback("Please fill out all registration inputs.");
        return;
      }
      if (password !== confirmPassword) {
        setFeedbackType("error");
        setFeedback("Passwords do not match. Please verify.");
        return;
      }
      if (onRegister) {
        await onRegister(name, email, password);
      } else {
      onLoginSuccess(name, email);
      }
      setFeedbackType("success");
      setFeedback("Account created successfully. Welcome to VOIRE.");
      setTimeout(() => {
        setActivePage("homepage");
      }, 1500);

    } else if (activeTab === "forgot") {
      if (!email) {
        setFeedbackType("error");
        setFeedback("Please input your email address.");
        return;
      }
      setFeedbackType("success");
      setFeedback(`A password recovery transmission was sent to ${email}. Check your inbox.`);
      setEmail("");
      setTimeout(() => setActiveTab("login"), 4000);
    }
    } catch (error: any) {
      setFeedbackType("error");
      setFeedback(error.response?.data?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialGoogle = () => {
    // Quick sign in with Google
    onLoginSuccess("Olivia Vance", "olivia.vance@gmail.com");
    setFeedbackType("success");
    setFeedback("Signed in successfully via Google Secure Credentials.");
    setTimeout(() => {
      setActivePage("homepage");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center min-h-[75vh] animate-fadeIn">
      <div className="w-full max-w-md bg-white border border-[#E8E6E1] rounded-[8px] p-8">
        
        {/* BRAND IDENTITY HEADER */}
        <div className="text-center mb-8">
          <span className="text-[10px] tracking-[0.3em] font-sans font-light text-[#C9B99A] uppercase block">
            VOIRE ACCOUNT REGISTER
          </span>
          <h2 className="text-2xl font-display text-[#1C1C1E] mt-1 font-light tracking-wide">
            Wear the moment.
          </h2>
        </div>

        {/* NOTIFICATION FEEDBACK */}
        {feedback && (
          <div className={`mb-6 p-4 rounded-[4px] text-xs font-sans ${
            feedbackType === "success" 
              ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
              : "bg-red-50 border border-red-100 text-red-800"
          } animate-fadeIn`}>
            {feedback}
          </div>
        )}

        {currentUser.isLoggedIn ? (
          /* LOGGED IN CONFIRMATION */
          <div className="space-y-6 text-center py-6 animate-fadeIn">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-sans font-semibold text-[#1C1C1E]">
                Active Connection Settled
              </p>
              <p className="text-xs text-gray-400 font-sans mt-1">
                Connected as {currentUser.name} ({currentUser.email})
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActivePage("homepage")}
                className="w-full bg-[#1C1C1E] hover:bg-black text-white text-xs font-sans font-semibold tracking-widest uppercase py-3 rounded-[4px] cursor-pointer transition-colors"
              >
                Go back shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 1. INTERACTIVE TAB SWITCH */}
            {activeTab !== "forgot" && (
              <div className="flex border-b border-[#E8E6E1] mb-6">
                <button
                  type="button"
                  onClick={() => { setActiveTab("login"); setFeedback(null); }}
                  className={`flex-1 text-center pb-3 text-xs font-sans tracking-[0.1em] uppercase cursor-pointer py-1 ${
                    activeTab === "login"
                      ? "border-b-2 border-[#1C1C1E] font-semibold text-[#1C1C1E]"
                      : "text-gray-400 hover:text-[#1C1C1E]"
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab("register"); setFeedback(null); }}
                  className={`flex-1 text-center pb-3 text-xs font-sans tracking-[0.1em] uppercase cursor-pointer py-1 ${
                    activeTab === "register"
                      ? "border-b-2 border-[#1C1C1E] font-semibold text-[#1C1C1E]"
                      : "text-gray-400 hover:text-[#1C1C1E]"
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* 2. FORM ACTION CONTAINER */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {activeTab === "forgot" && (
                <div className="text-left mb-4">
                  <button
                    type="button"
                    onClick={() => { setActiveTab("login"); setFeedback(null); }}
                    className="text-xs text-gray-400 hover:text-[#1C1C1E] underline font-sans mb-3 cursor-pointer"
                  >
                    ← Back to Log In
                  </button>
                  <h3 className="text-sm font-sans font-semibold text-[#1C1C1E] uppercase tracking-wider mb-1">
                    Retrieve Password
                  </h3>
                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed">
                    Specify the registered email address. We will broadcast a recovery code coordinates link.
                  </p>
                </div>
              )}

              {/* NAME FIELD (REGISTER EXCLUSIVE) */}
              {activeTab === "register" && (
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Olivia Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-2.5 text-xs font-sans rounded-[4px]"
                  />
                </div>
              )}

              {/* EMAIL FIELD */}
              <div>
                <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. email@address.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-2.5 text-xs font-sans rounded-[4px]"
                />
              </div>

              {/* PASSWORD FIELDS */}
              {activeTab !== "forgot" && (
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold">
                      Password
                    </label>
                    {activeTab === "login" && (
                      <button
                        type="button"
                        onClick={() => { setActiveTab("forgot"); setFeedback(null); }}
                        className="text-[9px] text-[#A69777] font-sans hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Enter security key"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-2.5 text-xs font-sans rounded-[4px]"
                  />
                </div>
              )}

              {/* REGISTER CONFIRM PASSWORD */}
              {activeTab === "register" && (
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm security key"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-2.5 text-xs font-sans rounded-[4px]"
                  />
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1C1C1E] hover:bg-black text-white text-xs font-sans font-semibold tracking-[0.15em] uppercase py-3 rounded-[4px] transition-colors cursor-pointer pt-3 flex items-center justify-center space-x-1"
              >
                <LogIn className="w-4 h-4" />
                <span>
                  {isSubmitting && "Connecting..."}
                  {!isSubmitting && activeTab === "login" && "Log In"}
                  {!isSubmitting && activeTab === "register" && "Create Account"}
                  {!isSubmitting && activeTab === "forgot" && "Send Password Reset"}
                </span>
              </button>

            </form>

            {/* 3. SOCIAL SECURE LOGIN SIGN-INS */}
            {activeTab !== "forgot" && (
              <div className="mt-8 space-y-4">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[#E8E6E1]"></div>
                  <span className="flex-shrink mx-4 text-[9px] text-gray-400 font-sans uppercase tracking-[0.15em]">
                    Or connect with
                  </span>
                  <div className="flex-grow border-t border-[#E8E6E1]"></div>
                </div>

                <button
                  onClick={handleSocialGoogle}
                  className="w-full bg-white border border-[#E8E6E1] hover:border-gray-500 hover:bg-[#F8F7F4] text-[#1C1C1E] text-[11px] font-sans font-semibold tracking-wider py-2.5 rounded-[4px] transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-2xs"
                >
                  {/* Google Custom Minimal Vector SVG Logo */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-1.1-4.83-.83-5.69z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Connect Google Account</span>
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
