"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Image as ImageIcon, UploadCloud, ArrowUp, ArrowDown } from "lucide-react";

type ContentData = any;

const PAGES = ["home", "about", "experience", "gallery", "menu", "visit"];

export default function CMSPage() {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("page_home_seo");
  const [expandedNav, setExpandedNav] = useState<Record<string, boolean>>({ pages: true });
  
  // Auth state
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Saving state
  const [savingStatus, setSavingStatus] = useState<Record<string, "idle" | "saving" | "success" | "error">>({});
  const [globalError, setGlobalError] = useState("");

  // Trigger haptic feedback if supported
  const triggerHaptic = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("chaidays_admin_session");
      if (session === "authorized") {
        setIsAuthorized(true);
        loadData();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase().trim() === "admin" && password === "ChaiDays@123") {
      triggerHaptic();
      setIsAuthorized(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("chaidays_admin_session", "authorized");
      }
      setLoading(true);
      loadData();
    } else {
      triggerHaptic();
      setLoginError("INVALID ADMINISTRATOR CREDENTIALS.");
    }
  };

  const handleLogout = () => {
    triggerHaptic();
    setIsAuthorized(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("chaidays_admin_session");
    }
  };

  const loadData = () => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load CMS data", err);
        setGlobalError("Failed to load CMS database.");
        setLoading(false);
      });
  };

  const saveField = async (key: string, newDataPayload: any) => {
    triggerHaptic();
    setSavingStatus((prev) => ({ ...prev, [key]: "saving" }));
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDataPayload),
      });

      if (!res.ok) throw new Error("API Save Error");
      
      setData(newDataPayload);
      setSavingStatus((prev) => ({ ...prev, [key]: "success" }));
      
      setTimeout(() => {
        setSavingStatus((prev) => ({ ...prev, [key]: "idle" }));
      }, 2000);
    } catch (err) {
      setSavingStatus((prev) => ({ ...prev, [key]: "error" }));
    }
  };

  const toggleNav = (navId: string) => {
    triggerHaptic();
    setExpandedNav(prev => ({ ...prev, [navId]: !prev[navId] }));
  };

  // --------------------------------------------------------
  // REUSABLE COMPONENTS
  // --------------------------------------------------------
  const renderStatus = (status: string) => {
    return (
      <div className="flex items-center gap-1.5 text-[#5e4b3c] text-[10px] tracking-wider uppercase font-mono">
        {status === "idle" && (
          <>
            <span className="w-1.5 h-1.5 bg-[#d4bca4] rounded-full" />
            Changes Auto-Saved on exit
          </>
        )}
        {status === "saving" && (
          <>
            <span className="w-1.5 h-1.5 bg-[#8D4F00] rounded-full animate-ping" />
            <span className="text-[#8D4F00] font-bold">Synchronizing...</span>
          </>
        )}
        {status === "success" && (
          <>
            <span className="w-1.5 h-1.5 bg-[#8D4F00] rounded-full" />
            <span className="text-[#8D4F00] font-bold">Live database synced!</span>
          </>
        )}
        {status === "error" && (
          <>
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
            <span className="text-red-600 font-bold">Sync failed!</span>
          </>
        )}
      </div>
    );
  };

  const renderField = (
    key: string,
    label: string,
    value: string,
    onChange: (val: string) => void,
    onSave: () => void,
    isTextarea = false,
    placeholder = ""
  ) => {
    const status = savingStatus[key] || "idle";

    return (
      <div key={key} className="bg-white border border-[#ebdcd0] p-6 space-y-4 hover:border-[#c9874a]/40 transition-colors shadow-sm rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm tracking-widest text-[#8D4F00] font-semibold font-serif italic">
            {label}
          </span>
          <span className="text-[9px] uppercase tracking-wider font-mono text-[#5e4b3c]/60">
            {key}
          </span>
        </div>

        {isTextarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onSave}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-3 focus:outline-none focus:border-[#8D4F00] text-[#3d2a1b] text-sm transition-colors resize-none leading-relaxed rounded"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onSave}
            placeholder={placeholder}
            className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-3 focus:outline-none focus:border-[#8D4F00] text-[#3d2a1b] text-sm transition-colors rounded"
          />
        )}

        <div className="flex items-center justify-between pt-1">
          {renderStatus(status)}
          <button
            onClick={() => { triggerHaptic(); onSave(); }}
            disabled={status === "saving"}
            className="bg-[#ebdcd0]/30 border border-[#ebdcd0] hover:border-[#8D4F00] hover:bg-[#8D4F00] hover:text-white transition-all px-4 py-1.5 uppercase font-bold tracking-widest text-[9px] font-mono text-[#8D4F00] rounded"
          >
            Save Field
          </button>
        </div>
      </div>
    );
  };

  const renderImageUploadField = (
    key: string,
    label: string,
    value: string,
    onChange: (val: string) => void,
    onSave: () => void
  ) => {
    const status = savingStatus[key] || "idle";
    
    // Real file upload to Supabase
    const handleUploadClick = () => {
      triggerHaptic();
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        setSavingStatus((prev) => ({ ...prev, [key]: "saving" }));
        
        try {
          const formData = new FormData();
          formData.append('file', file);
          
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          let data;
          try {
            data = await res.json();
          } catch (e) {
            // Vercel returns 413 Payload Too Large as HTML, breaking res.json()
            throw new Error(res.status === 413 ? "Image is too large. Vercel allows a maximum of 4.5MB per upload. Please compress your image." : "Server returned an invalid response. Image might be too large.");
          }
          
          if (!res.ok) {
            throw new Error(data.error || 'Upload failed');
          }
          
          onChange(data.url);
          setSavingStatus((prev) => ({ ...prev, [key]: "success" }));
          
          setTimeout(() => {
            setSavingStatus((prev) => ({ ...prev, [key]: "idle" }));
          }, 2000);
          
        } catch (err: any) {
          console.error("Upload Error:", err);
          alert(`Upload Failed: ${err.message}`);
          setSavingStatus((prev) => ({ ...prev, [key]: "error" }));
        }
      };
      
      input.click();
    };

    return (
      <div key={key} className="bg-white border border-[#ebdcd0] p-6 space-y-4 hover:border-[#c9874a]/40 transition-colors shadow-sm rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm tracking-widest text-[#8D4F00] font-semibold font-serif italic flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> {label}
          </span>
          <span className="text-[9px] uppercase tracking-wider font-mono text-[#5e4b3c]/60">
            {key}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-2/3 space-y-3">
             <div className="flex items-center gap-2">
               <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onSave}
                  placeholder="/images/example.jpg or https://..."
                  className="flex-1 bg-[#faf5f0] border border-[#ebdcd0] p-3 focus:outline-none focus:border-[#8D4F00] text-[#3d2a1b] text-sm transition-colors rounded"
                />
                <button
                  onClick={handleUploadClick}
                  className="bg-[#8D4F00] text-white p-3 rounded hover:bg-[#6c3c00] transition-colors flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"
                >
                  <UploadCloud className="w-4 h-4" /> Upload
                </button>
             </div>
             <p className="text-[10px] text-[#5e4b3c]/80 font-mono">
               Note: You can paste a direct URL or click "Upload" to upload an image to Supabase Storage.
             </p>
          </div>
          
          {value ? (
             <div className="w-full md:w-1/3 aspect-video bg-[#faf5f0] border border-[#ebdcd0] rounded flex items-center justify-center overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={value} alt="Preview" className="w-full h-full object-cover" />
             </div>
          ) : (
             <div className="w-full md:w-1/3 aspect-video bg-[#faf5f0] border border-[#ebdcd0] border-dashed rounded flex flex-col items-center justify-center text-[#5e4b3c]/40">
               <ImageIcon className="w-6 h-6 mb-2" />
               <span className="text-[10px] font-mono uppercase tracking-widest">No Image</span>
             </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          {renderStatus(status)}
          <button
            onClick={() => { triggerHaptic(); onSave(); }}
            disabled={status === "saving"}
            className="bg-[#ebdcd0]/30 border border-[#ebdcd0] hover:border-[#8D4F00] hover:bg-[#8D4F00] hover:text-white transition-all px-4 py-1.5 uppercase font-bold tracking-widest text-[9px] font-mono text-[#8D4F00] rounded"
          >
            Save Media
          </button>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------
  // LOGIN SCREEN (Warm Theme)
  // --------------------------------------------------------
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#faf5f0] text-[#3d2a1b]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#c9874a]/20 blur-[100px] rounded-full pointer-events-none" />
        <motion.div 
          className="bg-white/80 backdrop-blur-xl w-full max-w-[420px] p-8 relative z-10 border border-[#ebdcd0] text-center shadow-2xl rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#8D4F00] uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-mono">
            Chaidays Console
          </span>
          <h2 className="text-3xl font-serif italic mt-3 mb-8 text-[#5e4b3c]">
            CMS Gatekeeper
          </h2>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="flex flex-col gap-2">
              <label className="text-[#5e4b3c] uppercase tracking-widest text-[10px] font-mono">Username</label>
              <input
                type="text"
                className="bg-transparent border-b border-[#ebdcd0] py-2 focus:outline-none focus:border-[#8D4F00] transition-colors text-[#3d2a1b] text-sm"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#5e4b3c] uppercase tracking-widest text-[10px] font-mono">Password</label>
              <input
                type="password"
                className="bg-transparent border-b border-[#ebdcd0] py-2 focus:outline-none focus:border-[#8D4F00] transition-colors text-[#3d2a1b] text-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <p className="text-red-600 text-xs uppercase tracking-wider font-mono">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#8D4F00] text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#6c3c00] active:scale-[0.98] transition-all shadow-xl rounded mt-2 font-mono"
            >
              Authenticate Portal
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --------------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------------
  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#faf5f0] flex flex-col items-center justify-center py-20 gap-4 text-[#5e4b3c]">
        <span className="w-8 h-8 border-2 border-[#ebdcd0] border-t-[#8D4F00] rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-mono text-[#8D4F00]">Contacting Data Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf5f0] text-[#3d2a1b] relative pb-20 font-sans selection:bg-[#c9874a]/30">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ebdcd0]/40 blur-[120px] rounded-full pointer-events-none" />

      {/* Header bar */}
      <header className="border-b border-[#ebdcd0] bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#8D4F00] uppercase tracking-[0.2em] font-bold text-xs font-mono">
              Chaidays CMS
            </span>
            <div className="w-1.5 h-1.5 bg-[#8D4F00] rounded-full animate-pulse" />
            <span className="text-[#5e4b3c] text-[11px] uppercase tracking-wider hidden sm:inline font-mono">
              Live Synchronization Enabled
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => { triggerHaptic(); loadData(); }}
              className="hover:text-[#8D4F00] transition-colors flex items-center justify-center p-2 text-[#5e4b3c] text-[10px] uppercase font-mono tracking-widest"
            >
              Refresh Data
            </button>
            <button
              onClick={handleLogout}
              className="border border-[#ebdcd0] hover:border-[#8D4F00] hover:text-[#8D4F00] text-[#5e4b3c] transition-all px-4 py-2 uppercase tracking-widest text-[10px] font-mono rounded"
            >
              Exit Console
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 mt-10 relative z-10">
        {globalError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs uppercase tracking-wider mb-6 font-mono rounded">
            {globalError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ---------------------------------------------------
              SIDEBAR NAVIGATION 
              --------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col gap-6 sticky top-[100px]">
            
            {/* Pages Section */}
            <div className="bg-white border border-[#ebdcd0] rounded-xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleNav("pages")}
                className="w-full flex items-center justify-between p-4 bg-[#faf5f0] text-[#8D4F00] text-[10px] uppercase tracking-widest font-mono font-bold"
              >
                Website Pages
                {expandedNav["pages"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {expandedNav["pages"] && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    {PAGES.map((page) => (
                      <div key={page} className="border-t border-[#ebdcd0]/50">
                        <div className="px-4 py-2 bg-white text-[11px] font-serif italic text-[#5e4b3c] capitalize font-semibold border-b border-dashed border-[#ebdcd0]/50">
                          {page}
                        </div>
                        <button
                          onClick={() => { triggerHaptic(); setActiveTab(`page_${page}_seo`); }}
                          className={`w-full text-left pl-8 pr-4 py-2.5 uppercase tracking-widest text-[10px] transition-all font-mono flex items-center ${
                            activeTab === `page_${page}_seo`
                              ? "bg-[#ebdcd0]/30 text-[#8D4F00] border-l-2 border-[#8D4F00] font-bold"
                              : "text-[#5e4b3c] hover:bg-[#faf5f0] hover:text-[#8D4F00]"
                          }`}
                        >
                          SEO Setup
                        </button>
                        <button
                          onClick={() => { triggerHaptic(); setActiveTab(`page_${page}_content`); }}
                          className={`w-full text-left pl-8 pr-4 py-2.5 uppercase tracking-widest text-[10px] transition-all font-mono flex items-center ${
                            activeTab === `page_${page}_content`
                              ? "bg-[#ebdcd0]/30 text-[#8D4F00] border-l-2 border-[#8D4F00] font-bold"
                              : "text-[#5e4b3c] hover:bg-[#faf5f0] hover:text-[#8D4F00]"
                          }`}
                        >
                          Page Content
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Global Settings Section */}
            <div className="bg-white border border-[#ebdcd0] rounded-xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleNav("global")}
                className="w-full flex items-center justify-between p-4 bg-[#faf5f0] text-[#8D4F00] text-[10px] uppercase tracking-widest font-mono font-bold"
              >
                Global Settings
                {expandedNav["global"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {expandedNav["global"] && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-[#ebdcd0]/50"
                  >
                    <button
                      onClick={() => { triggerHaptic(); setActiveTab(`global_hero`); }}
                      className={`w-full text-left px-4 py-3 uppercase tracking-widest text-[10px] transition-all font-mono ${
                        activeTab === `global_hero`
                          ? "bg-[#ebdcd0]/30 text-[#8D4F00] border-l-2 border-[#8D4F00] font-bold"
                          : "text-[#5e4b3c] hover:bg-[#faf5f0] hover:text-[#8D4F00]"
                      }`}
                    >
                      Hero Section & Video
                    </button>
                    <button
                      onClick={() => { triggerHaptic(); setActiveTab(`global_menu`); }}
                      className={`w-full text-left px-4 py-3 uppercase tracking-widest text-[10px] transition-all font-mono ${
                        activeTab === `global_menu`
                          ? "bg-[#ebdcd0]/30 text-[#8D4F00] border-l-2 border-[#8D4F00] font-bold"
                          : "text-[#5e4b3c] hover:bg-[#faf5f0] hover:text-[#8D4F00]"
                      }`}
                    >
                      Menu Builder
                    </button>
                    <button
                      onClick={() => { triggerHaptic(); setActiveTab(`global_gallery`); }}
                      className={`w-full text-left px-4 py-3 uppercase tracking-widest text-[10px] transition-all font-mono ${
                        activeTab === `global_gallery`
                          ? "bg-[#ebdcd0]/30 text-[#8D4F00] border-l-2 border-[#8D4F00] font-bold"
                          : "text-[#5e4b3c] hover:bg-[#faf5f0] hover:text-[#8D4F00]"
                      }`}
                    >
                      Gallery Builder
                    </button>
                    <button
                      onClick={() => { triggerHaptic(); setActiveTab(`global_outlets`); }}
                      className={`w-full text-left px-4 py-3 uppercase tracking-widest text-[10px] transition-all font-mono ${
                        activeTab === `global_outlets`
                          ? "bg-[#ebdcd0]/30 text-[#8D4F00] border-l-2 border-[#8D4F00] font-bold"
                          : "text-[#5e4b3c] hover:bg-[#faf5f0] hover:text-[#8D4F00]"
                      }`}
                    >
                      Outlets Builder
                    </button>
                    <button
                      onClick={() => { triggerHaptic(); setActiveTab(`global_socials`); }}
                      className={`w-full text-left px-4 py-3 uppercase tracking-widest text-[10px] transition-all font-mono ${
                        activeTab === `global_socials`
                          ? "bg-[#ebdcd0]/30 text-[#8D4F00] border-l-2 border-[#8D4F00] font-bold"
                          : "text-[#5e4b3c] hover:bg-[#faf5f0] hover:text-[#8D4F00]"
                      }`}
                    >
                      Social Links
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>

          {/* ---------------------------------------------------
              EDITING PANE 
              --------------------------------------------------- */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Header for editing pane */}
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between border-b border-[#ebdcd0] pb-4 mb-6"
            >
              <h2 className="text-3xl font-serif text-[#8D4F00] italic capitalize">
                Editing: {activeTab.replace(/_/g, " ")}
              </h2>
            </motion.div>

            {/* --- PAGES : SEO TABS --- */}
            {activeTab.startsWith("page_") && activeTab.endsWith("_seo") && (() => {
              const pageName = activeTab.split("_")[1];
              const pageData = data.pages?.[pageName] || { seo: { title: "", description: "", keywords: [], canonical: "" }, content: {} };
              
              // Helper to update specific page seo
              const updateSeo = (field: string, val: any) => {
                const newPages = { ...data.pages };
                if (!newPages[pageName]) newPages[pageName] = { seo: {}, content: {} };
                newPages[pageName].seo[field] = val;
                return { ...data, pages: newPages };
              };

              return (
                <div className="space-y-6">
                  {renderField(
                    `${pageName}_seo_title`,
                    "Meta Title",
                    pageData.seo.title,
                    (val) => setData(updateSeo("title", val)),
                    () => saveField(`${pageName}_seo_title`, data)
                  )}
                  {renderField(
                    `${pageName}_seo_desc`,
                    "Meta Description",
                    pageData.seo.description,
                    (val) => setData(updateSeo("description", val)),
                    () => saveField(`${pageName}_seo_desc`, data),
                    true
                  )}
                  {renderField(
                    `${pageName}_seo_keywords`,
                    "Keywords (comma separated)",
                    (pageData.seo.keywords || []).join(", "),
                    (val) => setData(updateSeo("keywords", val.split(",").map((k: string) => k.trim()))),
                    () => saveField(`${pageName}_seo_keywords`, data)
                  )}
                  {renderField(
                    `${pageName}_seo_canonical`,
                    "Canonical & Backlinks",
                    pageData.seo.canonical,
                    (val) => setData(updateSeo("canonical", val)),
                    () => saveField(`${pageName}_seo_canonical`, data)
                  )}
                </div>
              );
            })()}

            {/* --- PAGES : CONTENT TABS --- */}
            {activeTab.startsWith("page_") && activeTab.endsWith("_content") && (() => {
              const pageName = activeTab.split("_")[1];
              const pageData = data.pages?.[pageName] || { seo: {}, content: {} };
              
              // Helper to update specific page content
              const updateContent = (field: string, val: any) => {
                const newPages = { ...data.pages };
                if (!newPages[pageName]) newPages[pageName] = { seo: {}, content: {} };
                newPages[pageName].content[field] = val;
                return { ...data, pages: newPages };
              };

              // Helper to format camelCase into Title Case
              const formatLabel = (key: string) => {
                return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              };

              return (
                <div className="space-y-6">
                  {Object.keys(pageData.content).map((key) => {
                    const val = pageData.content[key] || "";
                    const keyLower = key.toLowerCase();
                    const isMedia = keyLower.includes("img") || keyLower.includes("video") || keyLower.includes("image");
                    const isLongText = keyLower.includes("desc") || keyLower.includes("body") || keyLower.includes("text") || keyLower.includes("address");
                    
                    if (isMedia) {
                      return renderImageUploadField(
                        `${pageName}_content_${key}`,
                        formatLabel(key),
                        val,
                        (newVal) => setData(updateContent(key, newVal)),
                        () => saveField(`${pageName}_content_${key}`, data)
                      );
                    } else if (isLongText) {
                      return renderField(
                        `${pageName}_content_${key}`,
                        formatLabel(key),
                        val,
                        (newVal) => setData(updateContent(key, newVal)),
                        () => saveField(`${pageName}_content_${key}`, data),
                        true
                      );
                    } else {
                      return renderField(
                        `${pageName}_content_${key}`,
                        formatLabel(key),
                        val,
                        (newVal) => setData(updateContent(key, newVal)),
                        () => saveField(`${pageName}_content_${key}`, data)
                      );
                    }
                  })}
                </div>
              );
            })()}

            {/* --- GLOBAL : GALLERY BUILDER --- */}
            {activeTab === "global_gallery" && (() => {
              const gallery = data.gallery || [];

              return (
                <div className="space-y-10">
                  <div className="bg-[#faf5f0] p-6 rounded-xl border border-[#ebdcd0]">
                    <h3 className="font-serif text-2xl text-[#8D4F00] mb-4">Manage Gallery Images</h3>
                    <p className="text-sm text-[#5e4b3c] mb-6">Add, edit, or reorder images for the Visual Journal.</p>
                    
                    <div className="space-y-6">
                      {gallery.map((item: any, index: number) => {
                        const saveKey = `gallery_item_${index}`;
                        return (
                          <div key={index} className="bg-white border border-[#ebdcd0] p-6 rounded relative group/gal">
                            <div className="absolute top-3 right-3 flex items-center gap-3 opacity-0 group-hover/gal:opacity-100 transition-opacity">
                              {index > 0 && (
                                <button
                                  onClick={() => {
                                    triggerHaptic();
                                    const newGallery = [...gallery];
                                    const temp = newGallery[index];
                                    newGallery[index] = newGallery[index - 1];
                                    newGallery[index - 1] = temp;
                                    const newData = { ...data, gallery: newGallery };
                                    setData(newData);
                                    saveField(`move_up_gal_${index}`, newData);
                                  }}
                                  className="text-[10px] text-[#8D4F00] hover:text-[#6c3c00] flex items-center gap-1 uppercase tracking-widest font-mono"
                                >
                                  <ArrowUp className="w-3 h-3" /> Up
                                </button>
                              )}
                              {index < gallery.length - 1 && (
                                <button
                                  onClick={() => {
                                    triggerHaptic();
                                    const newGallery = [...gallery];
                                    const temp = newGallery[index];
                                    newGallery[index] = newGallery[index + 1];
                                    newGallery[index + 1] = temp;
                                    const newData = { ...data, gallery: newGallery };
                                    setData(newData);
                                    saveField(`move_down_gal_${index}`, newData);
                                  }}
                                  className="text-[10px] text-[#8D4F00] hover:text-[#6c3c00] flex items-center gap-1 uppercase tracking-widest font-mono"
                                >
                                  <ArrowDown className="w-3 h-3" /> Down
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  triggerHaptic();
                                  const newGallery = gallery.filter((_: any, i: number) => i !== index);
                                  const newData = { ...data, gallery: newGallery };
                                  setData(newData);
                                  saveField(`del_gal_${index}`, newData);
                                }}
                                className="text-[10px] text-red-600 hover:text-red-800 uppercase tracking-widest font-mono ml-2"
                              >
                                Remove
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div className="space-y-4">
                                <input
                                  type="text"
                                  placeholder="Category (e.g. drinks, space, desserts)"
                                  value={item.category || ""}
                                  onChange={(e) => {
                                    const newGallery = [...gallery];
                                    newGallery[index].category = e.target.value.toLowerCase();
                                    setData({ ...data, gallery: newGallery });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-sm text-[#3d2a1b] focus:border-[#8D4F00] focus:outline-none rounded"
                                />
                                <input
                                  type="text"
                                  placeholder="Label (e.g. SPACE • 01)"
                                  value={item.label || ""}
                                  onChange={(e) => {
                                    const newGallery = [...gallery];
                                    newGallery[index].label = e.target.value;
                                    setData({ ...data, gallery: newGallery });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-xs font-mono focus:border-[#8D4F00] focus:outline-none rounded"
                                />
                                <input
                                  type="text"
                                  placeholder="Alt Text"
                                  value={item.alt || ""}
                                  onChange={(e) => {
                                    const newGallery = [...gallery];
                                    newGallery[index].alt = e.target.value;
                                    setData({ ...data, gallery: newGallery });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-sm focus:border-[#8D4F00] focus:outline-none rounded"
                                />
                              </div>
                              <div className="space-y-4">
                                <select
                                  value={item.colSpan || "col-span-12 md:col-span-4"}
                                  onChange={(e) => {
                                    const newGallery = [...gallery];
                                    newGallery[index].colSpan = e.target.value;
                                    setData({ ...data, gallery: newGallery });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-sm focus:border-[#8D4F00] focus:outline-none rounded"
                                >
                                  <option value="col-span-12 md:col-span-4">1/3 Width</option>
                                  <option value="col-span-12 md:col-span-6">1/2 Width</option>
                                  <option value="col-span-12 md:col-span-8">2/3 Width</option>
                                  <option value="col-span-12">Full Width</option>
                                </select>
                                <select
                                  value={item.ratio || "aspect-square"}
                                  onChange={(e) => {
                                    const newGallery = [...gallery];
                                    newGallery[index].ratio = e.target.value;
                                    setData({ ...data, gallery: newGallery });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-sm focus:border-[#8D4F00] focus:outline-none rounded"
                                >
                                  <option value="aspect-square">Square (1:1)</option>
                                  <option value="aspect-[4/3]">Standard (4:3)</option>
                                  <option value="aspect-[3/4]">Portrait (3:4)</option>
                                  <option value="aspect-[16/9]">Widescreen (16:9)</option>
                                </select>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-[#ebdcd0]/50">
                              {renderImageUploadField(
                                `gallery_img_${index}`,
                                "Gallery Image",
                                item.img || "",
                                (val) => {
                                  const newGallery = [...gallery];
                                  newGallery[index].img = val;
                                  setData({ ...data, gallery: newGallery });
                                },
                                () => saveField(`gallery_img_${index}`, data)
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      <button
                        onClick={() => {
                          triggerHaptic();
                          const newGallery = [
                            ...gallery,
                            { id: `new-gal-${Date.now()}`, category: "space", label: "NEW • 01", colSpan: "col-span-12 md:col-span-4", ratio: "aspect-square", img: "", alt: "" }
                          ];
                          const newData = { ...data, gallery: newGallery };
                          setData(newData);
                          saveField("add_gal", newData);
                        }}
                        className="w-full border-2 border-dashed border-[#8D4F00]/30 hover:border-[#8D4F00] text-[#8D4F00] p-4 flex items-center justify-center gap-2 font-mono uppercase tracking-widest text-xs transition-colors rounded"
                      >
                        + Add New Image
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* --- GLOBAL : OUTLETS TABS --- */}
            {activeTab === "global_outlets" && (() => {
              const outlets = data.outlets || [];

              return (
                <div className="space-y-10">
                  <div className="bg-[#faf5f0] p-6 rounded-xl border border-[#ebdcd0]">
                    <h3 className="font-serif text-2xl text-[#8D4F00] mb-4">Manage Outlets</h3>
                    <p className="text-sm text-[#5e4b3c] mb-6">Add, edit, or remove store locations displayed across the site.</p>
                    
                    <div className="space-y-6">
                      {outlets.map((outlet: any, index: number) => {
                        const saveKey = `outlet_${index}`;
                        return (
                          <div key={index} className="bg-white border border-[#ebdcd0] p-6 rounded relative group/outlet">
                            <div className="absolute top-3 right-3 flex items-center gap-3 opacity-0 group-hover/outlet:opacity-100 transition-opacity">
                              {index > 0 && (
                                <button
                                  onClick={() => {
                                    triggerHaptic();
                                    const newOutlets = [...outlets];
                                    const temp = newOutlets[index];
                                    newOutlets[index] = newOutlets[index - 1];
                                    newOutlets[index - 1] = temp;
                                    const newData = { ...data, outlets: newOutlets };
                                    setData(newData);
                                    saveField(`move_up_outlet_${index}`, newData);
                                  }}
                                  className="text-[10px] text-[#8D4F00] hover:text-[#6c3c00] flex items-center gap-1 uppercase tracking-widest font-mono"
                                >
                                  <ArrowUp className="w-3 h-3" /> Up
                                </button>
                              )}
                              {index < outlets.length - 1 && (
                                <button
                                  onClick={() => {
                                    triggerHaptic();
                                    const newOutlets = [...outlets];
                                    const temp = newOutlets[index];
                                    newOutlets[index] = newOutlets[index + 1];
                                    newOutlets[index + 1] = temp;
                                    const newData = { ...data, outlets: newOutlets };
                                    setData(newData);
                                    saveField(`move_down_outlet_${index}`, newData);
                                  }}
                                  className="text-[10px] text-[#8D4F00] hover:text-[#6c3c00] flex items-center gap-1 uppercase tracking-widest font-mono"
                                >
                                  <ArrowDown className="w-3 h-3" /> Down
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  triggerHaptic();
                                  const newOutlets = outlets.filter((_: any, i: number) => i !== index);
                                  const newData = { ...data, outlets: newOutlets };
                                  setData(newData);
                                  saveField(`del_outlet_${index}`, newData);
                                }}
                                className="text-[10px] text-red-600 hover:text-red-800 uppercase tracking-widest font-mono ml-2"
                              >
                                Remove
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              <div className="space-y-4">
                                <input
                                  type="text"
                                  placeholder="Location Name (e.g. Krishnappa Compound)"
                                  value={outlet.name || ""}
                                  onChange={(e) => {
                                    const newOutlets = [...outlets];
                                    newOutlets[index].name = e.target.value;
                                    setData({ ...data, outlets: newOutlets });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-transparent border-b border-[#ebdcd0] p-2 text-xl font-serif text-[#3d2a1b] focus:border-[#8D4F00] focus:outline-none rounded"
                                />
                                <textarea
                                  placeholder="Address (HTML <br/> allowed)"
                                  value={outlet.address || ""}
                                  onChange={(e) => {
                                    const newOutlets = [...outlets];
                                    newOutlets[index].address = e.target.value;
                                    setData({ ...data, outlets: newOutlets });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-3 text-sm text-[#3d2a1b] focus:border-[#8D4F00] focus:outline-none min-h-[80px] resize-none rounded"
                                />
                                <input
                                  type="text"
                                  placeholder="Map Link (e.g. https://maps.google.com/...)"
                                  value={outlet.mapUrl || ""}
                                  onChange={(e) => {
                                    const newOutlets = [...outlets];
                                    newOutlets[index].mapUrl = e.target.value;
                                    setData({ ...data, outlets: newOutlets });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-xs font-mono focus:border-[#8D4F00] focus:outline-none rounded"
                                />
                              </div>
                              <div className="space-y-4">
                                <input
                                  type="email"
                                  placeholder="Contact Email"
                                  value={outlet.email || ""}
                                  onChange={(e) => {
                                    const newOutlets = [...outlets];
                                    newOutlets[index].email = e.target.value;
                                    setData({ ...data, outlets: newOutlets });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-sm focus:border-[#8D4F00] focus:outline-none rounded"
                                />
                                <input
                                  type="text"
                                  placeholder="Contact Phone"
                                  value={outlet.phone || ""}
                                  onChange={(e) => {
                                    const newOutlets = [...outlets];
                                    newOutlets[index].phone = e.target.value;
                                    setData({ ...data, outlets: newOutlets });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-2 text-sm focus:border-[#8D4F00] focus:outline-none rounded"
                                />
                                <textarea
                                  placeholder="Hours (e.g. Daily Service: 08:00 - 22:00)"
                                  value={outlet.hours || ""}
                                  onChange={(e) => {
                                    const newOutlets = [...outlets];
                                    newOutlets[index].hours = e.target.value;
                                    setData({ ...data, outlets: newOutlets });
                                  }}
                                  onBlur={() => saveField(saveKey, data)}
                                  className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-3 text-sm text-[#3d2a1b] focus:border-[#8D4F00] focus:outline-none min-h-[80px] resize-none rounded"
                                />
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-[#ebdcd0]/50">
                              {renderImageUploadField(
                                `outlet_img_${index}`,
                                "Location Image",
                                outlet.img || "",
                                (val) => {
                                  const newOutlets = [...outlets];
                                  newOutlets[index].img = val;
                                  setData({ ...data, outlets: newOutlets });
                                },
                                () => saveField(`outlet_img_${index}`, data)
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      <button
                        onClick={() => {
                          triggerHaptic();
                          const newOutlets = [
                            ...outlets,
                            { id: `new-outlet-${Date.now()}`, name: "New Location", address: "", mapUrl: "", email: "", phone: "", hours: "", img: "" }
                          ];
                          const newData = { ...data, outlets: newOutlets };
                          setData(newData);
                          saveField("add_outlet", newData);
                        }}
                        className="w-full border-2 border-dashed border-[#8D4F00]/30 hover:border-[#8D4F00] text-[#8D4F00] p-4 flex items-center justify-center gap-2 font-mono uppercase tracking-widest text-xs transition-colors rounded"
                      >
                        + Add New Outlet
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
            {/* --- GLOBAL : SOCIALS --- */}
            {activeTab === "global_socials" && (() => {
              const socials = data.socials || {};
              const setSocials = (field: string, value: string) => {
                setData({ ...data, socials: { ...socials, [field]: value } });
              };

              return (
                <div className="space-y-6">
                  {renderField(
                    "global_social_instagram",
                    "Instagram URL",
                    socials.instagram || "",
                    (val) => setSocials("instagram", val),
                    () => saveField('global_social_instagram', data)
                  )}
                  {renderField(
                    "global_social_linkedin",
                    "LinkedIn URL",
                    socials.linkedin || "",
                    (val) => setSocials("linkedin", val),
                    () => saveField('global_social_linkedin', data)
                  )}
                  {renderField(
                    "global_social_whatsapp",
                    "WhatsApp Number (include country code e.g. 919980084666)",
                    socials.whatsapp || "",
                    (val) => setSocials("whatsapp", val),
                    () => saveField('global_social_whatsapp', data)
                  )}
                  {renderField(
                    "global_social_facebook",
                    "Facebook URL",
                    socials.facebook || "",
                    (val) => setSocials("facebook", val),
                    () => saveField('global_social_facebook', data)
                  )}
                </div>
              );
            })()}

            {/* --- GLOBAL : HERO --- */}
            {activeTab === "global_hero" && (
              <div className="space-y-6">
                {renderImageUploadField("hero_desktop_vid", "Desktop Video URL", data.hero.desktopVideoUrl, 
                  (val) => setData({ ...data, hero: { ...data.hero, desktopVideoUrl: val } }), () => saveField("hero_desktop_vid", data))}
                {renderImageUploadField("hero_mobile_vid", "Mobile Video URL", data.hero.mobileVideoUrl, 
                  (val) => setData({ ...data, hero: { ...data.hero, mobileVideoUrl: val } }), () => saveField("hero_mobile_vid", data))}
                
                {renderField("hero_top_text_sm", "Top Text (Small)", data.hero.topTextSmall, 
                  (val) => setData({ ...data, hero: { ...data.hero, topTextSmall: val } }), () => saveField("hero_top_text_sm", data))}
                {renderField("hero_top_text_lg", "Top Text (Large/HTML)", data.hero.topTextLarge, 
                  (val) => setData({ ...data, hero: { ...data.hero, topTextLarge: val } }), () => saveField("hero_top_text_lg", data), true)}
                
                {renderField("hero_brand_text_sm", "Brand Text (Small)", data.hero.brandTextSmall, 
                  (val) => setData({ ...data, hero: { ...data.hero, brandTextSmall: val } }), () => saveField("hero_brand_text_sm", data))}
                {renderField("hero_brand_text_lg", "Brand Text (Large/HTML)", data.hero.brandTextLarge, 
                  (val) => setData({ ...data, hero: { ...data.hero, brandTextLarge: val } }), () => saveField("hero_brand_text_lg", data), true)}
              </div>
            )}

            {/* --- GLOBAL : MENU BUILDER --- */}
            {activeTab === "global_menu" && (
              <div className="space-y-10">
                {data.menu.map((category: any, catIndex: number) => {
                  const catSaveKey = `menu_cat_${catIndex}`;
                  
                  return (
                    <motion.div 
                      key={catIndex} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="bg-white border border-[#ebdcd0] p-6 md:p-8 space-y-6 shadow-sm rounded-xl relative group"
                    >
                      <div className="absolute top-6 right-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        {catIndex > 0 && (
                          <button
                            onClick={() => {
                              triggerHaptic();
                              const newMenu = [...data.menu];
                              const temp = newMenu[catIndex - 1];
                              newMenu[catIndex - 1] = newMenu[catIndex];
                              newMenu[catIndex] = temp;
                              const newData = { ...data, menu: newMenu };
                              setData(newData);
                              saveField(`move_cat_up_${catIndex}`, newData);
                            }}
                            className="text-[10px] text-[#8D4F00] hover:text-[#5e4b3c] uppercase tracking-widest font-mono flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">arrow_upward</span> UP
                          </button>
                        )}
                        {catIndex < data.menu.length - 1 && (
                          <button
                            onClick={() => {
                              triggerHaptic();
                              const newMenu = [...data.menu];
                              const temp = newMenu[catIndex + 1];
                              newMenu[catIndex + 1] = newMenu[catIndex];
                              newMenu[catIndex] = temp;
                              const newData = { ...data, menu: newMenu };
                              setData(newData);
                              saveField(`move_cat_down_${catIndex}`, newData);
                            }}
                            className="text-[10px] text-[#8D4F00] hover:text-[#5e4b3c] uppercase tracking-widest font-mono flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">arrow_downward</span> DOWN
                          </button>
                        )}
                        <button
                          onClick={() => {
                            triggerHaptic();
                            const newMenu = data.menu.filter((_: any, i: number) => i !== catIndex);
                            const newData = { ...data, menu: newMenu };
                            setData(newData);
                            saveField(`del_cat_${catIndex}`, newData);
                          }}
                          className="text-[10px] text-red-600 hover:text-red-800 uppercase tracking-widest font-mono ml-2"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs uppercase tracking-wider text-[#8D4F00] font-serif italic mb-2">Category Name</label>
                        <input
                          type="text"
                          value={category.category}
                          onChange={(e) => {
                            const newMenu = [...data.menu];
                            newMenu[catIndex].category = e.target.value;
                            setData({ ...data, menu: newMenu });
                          }}
                          onBlur={() => saveField(catSaveKey, data)}
                          className="bg-transparent border-b border-[#ebdcd0] p-2 text-2xl font-serif text-[#3d2a1b] focus:border-[#8D4F00] focus:outline-none w-full md:w-1/2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] uppercase tracking-wider text-[#5e4b3c] mb-2 font-mono">Category Description (Optional)</label>
                        <input
                          type="text"
                          value={category.description || ""}
                          onChange={(e) => {
                            const newMenu = [...data.menu];
                            newMenu[catIndex].description = e.target.value;
                            setData({ ...data, menu: newMenu });
                          }}
                          onBlur={() => saveField(catSaveKey, data)}
                          className="w-full bg-[#faf5f0] border border-[#ebdcd0] p-3 focus:outline-none focus:border-[#8D4F00] text-[#3d2a1b] text-sm transition-colors rounded"
                        />
                      </div>

                      <div className="pt-6 mt-4 border-t border-[#ebdcd0]/50 space-y-6">
                        <h4 className="text-[10px] uppercase tracking-widest text-[#8D4F00] font-mono flex items-center gap-2">
                          Dishes in {category.category}
                        </h4>
                        
                        {category.items.map((item: any, itemIndex: number) => {
                          const itemSaveKey = `menu_item_${catIndex}_${itemIndex}`;
                          
                          return (
                            <div key={itemIndex} className="bg-[#faf5f0] border border-[#ebdcd0] p-5 rounded relative group/dish">
                              <div className="absolute top-3 right-3 flex items-center gap-3 opacity-0 group-hover/dish:opacity-100 transition-opacity">
                                {itemIndex > 0 && (
                                  <button
                                    onClick={() => {
                                      triggerHaptic();
                                      const newMenu = [...data.menu];
                                      const temp = newMenu[catIndex].items[itemIndex];
                                      newMenu[catIndex].items[itemIndex] = newMenu[catIndex].items[itemIndex - 1];
                                      newMenu[catIndex].items[itemIndex - 1] = temp;
                                      const newData = { ...data, menu: newMenu };
                                      setData(newData);
                                      saveField(`move_up_${catIndex}_${itemIndex}`, newData);
                                    }}
                                    className="text-[10px] text-[#8D4F00] hover:text-[#6c3c00] flex items-center gap-1 uppercase tracking-widest font-mono"
                                  >
                                    <ArrowUp className="w-3 h-3" /> Up
                                  </button>
                                )}
                                {itemIndex < category.items.length - 1 && (
                                  <button
                                    onClick={() => {
                                      triggerHaptic();
                                      const newMenu = [...data.menu];
                                      const temp = newMenu[catIndex].items[itemIndex];
                                      newMenu[catIndex].items[itemIndex] = newMenu[catIndex].items[itemIndex + 1];
                                      newMenu[catIndex].items[itemIndex + 1] = temp;
                                      const newData = { ...data, menu: newMenu };
                                      setData(newData);
                                      saveField(`move_down_${catIndex}_${itemIndex}`, newData);
                                    }}
                                    className="text-[10px] text-[#8D4F00] hover:text-[#6c3c00] flex items-center gap-1 uppercase tracking-widest font-mono"
                                  >
                                    <ArrowDown className="w-3 h-3" /> Down
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    triggerHaptic();
                                    const newMenu = [...data.menu];
                                    newMenu[catIndex].items = newMenu[catIndex].items.filter((_: any, i: number) => i !== itemIndex);
                                    const newData = { ...data, menu: newMenu };
                                    setData(newData);
                                    saveField(`del_item_${catIndex}_${itemIndex}`, newData);
                                  }}
                                  className="text-[10px] text-red-600 hover:text-red-800 uppercase tracking-widest font-mono ml-2"
                                >
                                  Remove
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="space-y-4">
                                  <input
                                    type="text"
                                    placeholder="Dish Name"
                                    value={item.name}
                                    onChange={(e) => {
                                      const newMenu = [...data.menu];
                                      newMenu[catIndex].items[itemIndex].name = e.target.value;
                                      setData({ ...data, menu: newMenu });
                                    }}
                                    onBlur={() => saveField(itemSaveKey, data)}
                                    className="w-full bg-white border border-[#ebdcd0] p-2 text-[#3d2a1b] focus:border-[#8D4F00] focus:outline-none rounded"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Tag (e.g. SAVORY)"
                                    value={item.tag || ""}
                                    onChange={(e) => {
                                      const newMenu = [...data.menu];
                                      newMenu[catIndex].items[itemIndex].tag = e.target.value;
                                      setData({ ...data, menu: newMenu });
                                    }}
                                    onBlur={() => saveField(itemSaveKey, data)}
                                    className="w-full bg-white border border-[#ebdcd0] p-2 text-xs text-[#8D4F00] font-mono tracking-wider focus:border-[#8D4F00] focus:outline-none rounded"
                                  />
                                </div>
                                <div className="flex flex-col gap-4">
                                  <textarea
                                    placeholder="Description"
                                    value={item.desc}
                                    onChange={(e) => {
                                      const newMenu = [...data.menu];
                                      newMenu[catIndex].items[itemIndex].desc = e.target.value;
                                      setData({ ...data, menu: newMenu });
                                    }}
                                    onBlur={() => saveField(itemSaveKey, data)}
                                    className="w-full bg-white border border-[#ebdcd0] p-3 text-sm text-[#3d2a1b] focus:border-[#8D4F00] focus:outline-none flex-1 min-h-[100px] resize-none rounded"
                                  />
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-[#ebdcd0]/50">
                                {renderImageUploadField(
                                  `menu_item_img_${catIndex}_${itemIndex}`,
                                  "Dish Image",
                                  item.img || "",
                                  (val) => {
                                    const newMenu = [...data.menu];
                                    newMenu[catIndex].items[itemIndex].img = val;
                                    setData({ ...data, menu: newMenu });
                                  },
                                  () => saveField(`menu_item_img_${catIndex}_${itemIndex}`, data)
                                )}
                              </div>
                            </div>
                          );
                        })}
                        
                        <button
                          onClick={() => {
                            triggerHaptic();
                            const newMenu = [...data.menu];
                            newMenu[catIndex].items.push({ id: `new-item-${Date.now()}`, name: "New Dish", desc: "" });
                            setData({ ...data, menu: newMenu });
                          }}
                          className="w-full py-4 border-2 border-dashed border-[#ebdcd0] text-[10px] uppercase tracking-widest text-[#8D4F00] font-mono hover:bg-[#ebdcd0]/20 hover:border-[#8D4F00] transition-colors rounded"
                        >
                          + Add New Dish
                        </button>
                      </div>
                    </motion.div>
                  );
                })}

                <button
                  onClick={() => {
                    triggerHaptic();
                    const newMenu = [...data.menu, { category: "New Category", description: "", items: [] }];
                    const newData = { ...data, menu: newMenu };
                    setData(newData);
                    saveField("new_category", newData);
                  }}
                  className="w-full py-6 bg-[#8D4F00] text-xs uppercase tracking-widest text-white font-bold hover:bg-[#6c3c00] transition-colors shadow-lg rounded-xl font-mono"
                >
                  + Create New Category
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
