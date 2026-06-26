"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";
import {
  QrCode,
  Link as LinkIcon,
  Type,
  Mail,
  Phone,
  Wifi,
  Download,
  Settings2,
  Lock,
  RefreshCw,
  ChevronDown,
  Check,
  Copy,
  AlertCircle
} from "lucide-react";

type QRType = 'URL' | 'Text' | 'Email' | 'Phone' | 'Wi-Fi';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export function QrCodeGeneratorTool() {
  const [type, setType] = useState<QRType>('URL');
  const [input, setInput] = useState("");
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [phone, setPhone] = useState("");
  const [wifi, setWifi] = useState({ ssid: "", password: "", security: "WPA", hidden: false });

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  const getEncodedData = useCallback(() => {
    switch (type) {
      case 'URL':
        return input.trim() || "https://hilmost.net";
      case 'Text':
        return input || "Hello from Hilmost!";
      case 'Email':
        return `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
      case 'Phone':
        return `tel:${phone}`;
      case 'Wi-Fi':
        return `WIFI:S:${wifi.ssid};T:${wifi.security === 'None' ? 'nopass' : wifi.security};P:${wifi.password};H:${wifi.hidden};;`;
      default:
        return "";
    }
  }, [type, input, email, phone, wifi]);

  const generateQR = useCallback(async () => {
    if (!canvasRef.current) return;

    const data = getEncodedData();
    try {
      await QRCode.toCanvas(canvasRef.current, data, {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setIsGenerated(true);
    } catch (err) {
      console.error(err);
      setIsGenerated(false);
    }
  }, [getEncodedData, size, errorLevel, fgColor, bgColor]);

  // Debounce generation
  useEffect(() => {
    const timer = setTimeout(() => {
      generateQR();
    }, 300);
    return () => clearTimeout(timer);
  }, [generateQR]);

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `hilmost-qr-${type.toLowerCase()}-${timestamp}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const downloadSVG = async () => {
    const data = getEncodedData();
    try {
      const svgString = await QRCode.toString(data, {
        type: 'svg',
        width: size,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const timestamp = new Date().getTime();
      link.download = `hilmost-qr-${type.toLowerCase()}-${timestamp}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopyStatus("success");
          setTimeout(() => setCopyStatus("idle"), 2000);
        } catch (err) {
          console.error(err);
          setCopyStatus("error");
          setTimeout(() => setCopyStatus("idle"), 3000);
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
      setCopyStatus("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              {[
                { id: 'URL', icon: <LinkIcon size={14} /> },
                { id: 'Text', icon: <Type size={14} /> },
                { id: 'Email', icon: <Mail size={14} /> },
                { id: 'Phone', icon: <Phone size={14} /> },
                { id: 'Wi-Fi', icon: <Wifi size={14} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setType(tab.id as QRType)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    type === tab.id
                    ? 'bg-white dark:bg-slate-900 text-brand-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.id}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Fields */}
            <div className="space-y-4 min-h-[160px]">
              {type === 'URL' && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner"
                  />
                </div>
              )}

              {type === 'Text' && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Plain Text</label>
                  <textarea
                    placeholder="Enter your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-32 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all resize-none shadow-inner"
                  />
                </div>
              )}

              {type === 'Email' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Recipient Email</label>
                    <input
                      type="email"
                      placeholder="hello@hilmost.net"
                      value={email.to}
                      onChange={(e) => setEmail({ ...email, to: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                      <input
                        type="text"
                        placeholder="Inquiry"
                        value={email.subject}
                        onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Message Body</label>
                      <input
                        type="text"
                        placeholder="Hello team..."
                        value={email.body}
                        onChange={(e) => setEmail({ ...email, body: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              )}

              {type === 'Phone' && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner"
                  />
                </div>
              )}

              {type === 'Wi-Fi' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Network SSID</label>
                      <input
                        type="text"
                        placeholder="Home-WiFi"
                        value={wifi.ssid}
                        onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Security</label>
                      <select
                        value={wifi.security}
                        onChange={(e) => setWifi({ ...wifi, security: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner appearance-none cursor-pointer"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="None">None (Open)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={wifi.password}
                      onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all shadow-inner"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group w-fit ml-1">
                    <input
                      type="checkbox"
                      checked={wifi.hidden}
                      onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })}
                      className="peer h-5 w-5 appearance-none rounded-md border-2 border-slate-300 dark:border-slate-700 checked:bg-brand-primary checked:border-brand-primary transition-all"
                    />
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Hidden Network</span>
                  </label>
                </div>
              )}
            </div>

            {/* Customization Panel */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setOptionsOpen(!optionsOpen)}
                className="flex items-center justify-between w-full p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
              >
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black uppercase tracking-tight text-sm">
                  <Settings2 size={16} className="text-brand-primary" />
                  Customize Appearance
                </div>
                <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${optionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {optionsOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resolution (px)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[128, 256, 512, 1024].map(s => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`py-2 rounded-lg text-[10px] font-black border-2 transition-all ${size === s ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Error Correction</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['L', 'M', 'Q', 'H'].map(l => (
                          <button
                            key={l}
                            onClick={() => setErrorLevel(l as ErrorCorrectionLevel)}
                            className={`py-2 rounded-lg text-xs font-black border-2 transition-all ${errorLevel === l ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
                            title={l === 'H' ? 'Highest recovery (30%)' : 'Standard recovery'}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Colors</label>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">QR Code</span>
                          <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-8 w-12 bg-transparent cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Background</span>
                          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-12 bg-transparent cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Preview & Actions */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center">
            <div className="bg-white p-6 rounded-[2rem] shadow-inner mb-8 w-full aspect-square flex items-center justify-center relative overflow-hidden group">
               <canvas ref={canvasRef} className="max-w-full h-auto" style={{ imageRendering: 'pixelated' }} />
               {!isGenerated && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                    <QrCode size={48} className="text-slate-200 animate-pulse" />
                 </div>
               )}
            </div>

            <div className="w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <button
                  onClick={downloadQR}
                  disabled={!isGenerated}
                  className="flex items-center justify-center gap-2 px-3 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <Download size={16} /> Download PNG
                </button>
                <button
                  onClick={downloadSVG}
                  disabled={!isGenerated}
                  className="flex items-center justify-center gap-2 px-3 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <Download size={16} /> Download SVG
                </button>
                <button
                  onClick={copyToClipboard}
                  disabled={!isGenerated}
                  className={`flex items-center justify-center gap-2 px-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
                    copyStatus === 'success'
                    ? 'bg-blue-600 text-white shadow-blue-500/20'
                    : copyStatus === 'error'
                    ? 'bg-red-600 text-white shadow-red-500/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {copyStatus === 'success' ? <Check size={16} /> : copyStatus === 'error' ? <AlertCircle size={16} /> : <Copy size={16} />}
                  {copyStatus === 'success' ? '✓ Copied!' : copyStatus === 'error' ? 'Copy failed — use Download' : 'Copy to Clipboard'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-500 select-none pt-2">
                <Lock size={12} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Generated Locally</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Trust Footer */}
      <div className="mt-16 space-y-16">
        <div className="flex items-center justify-center gap-2 text-slate-400 select-none">
          <Lock size={12} />
          <span className="text-[10px] font-black uppercase tracking-[0.25em]">🔒 Generated in your browser. Never sent to any server.</span>
        </div>

        <section className="max-w-3xl mx-auto px-4 py-8 text-gray-300 border-t border-slate-100 dark:border-slate-800">
          <h1 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Free QR Code Generator</h1>

          <h2 className="text-xl font-semibold text-white mb-3 mt-8">What can you encode in a QR code?</h2>
          <p className="text-sm leading-relaxed mb-4">
            Quick Response (QR) codes are incredibly versatile digital bridges between the physical and digital worlds. With this generator, you can encode standard <strong>Website URLs</strong> for instant browsing, or share <strong>Plain Text</strong> messages without needing an internet connection. Businesses frequently use them for digital business cards or menus to minimize physical contact and maximize efficiency.
          </p>
          <p className="text-sm leading-relaxed mb-4">
            One of the most practical uses is <strong>Wi-Fi Sharing</strong>. Instead of typing complex passwords, your guests can simply scan a code to join your secure network instantly. We also support specialized encoding for <strong>Emails</strong> (including pre-filled subjects and bodies) and <strong>Phone Numbers</strong>, making it easier than ever for customers or friends to reach out with a single tap.
          </p>
          <p className="text-sm leading-relaxed mb-4">
            At Hilmost Digital Labs, we ensure that your QR codes are generated using the highest standards of the ISO/IEC 18004 specification. This means your codes will be readable by every modern smartphone camera and dedicated QR scanner application, regardless of the device or operating system.
          </p>

          <h2 className="text-xl font-semibold text-white mb-3 mt-8">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-medium text-white">Is this QR code generator free?</dt>
              <dd className="text-sm text-gray-400 mt-2 ml-4 leading-relaxed">
                Yes, our QR laboratory is 100% free to use for both personal and commercial projects. There are no hidden fees, no subscriptions, and we do not place any watermarks or expiration dates on the generated codes.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-white">Do you store the data I enter?</dt>
              <dd className="text-sm text-gray-400 mt-2 ml-4 leading-relaxed">
                Never. Security is a core pillar of the Hilmost monorepo. This tool uses a <strong>Zero-Server Architecture</strong>, meaning the QR generation happens entirely within your browser&apos;s memory. Your Wi-Fi passwords, emails, and URLs never touch our servers.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-white">What error correction level should I use?</dt>
              <dd className="text-sm text-gray-400 mt-2 ml-4 leading-relaxed">
                Our tool defaults to &quot;Medium&quot; (15% recovery), which is ideal for most digital and print uses. If you plan to print the QR code on a surface that might get damaged or obscured (like an outdoor poster), choose &quot;High&quot; (30% recovery) for maximum durability.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-white">Can I use the QR code commercially?</dt>
              <dd className="text-sm text-gray-400 mt-2 ml-4 leading-relaxed">
                Absolutely. The QR codes you forge here are yours to keep. You can use them on business cards, marketing materials, packaging, or digital advertisements without needing to attribute Hilmost Software Corporation.
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
