"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import QRCode from "qrcode";
import {
  QrCode,
  Link as LinkIcon,
  Type,
  Mail,
  Phone,
  Wifi,
  UserCircle,
  Download,
  Settings2,
  Lock,
  ChevronDown,
  Check,
  Copy,
  AlertCircle
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { PillSelector } from "../../../components/ui/PillSelector";
import { NumberInput } from "../../../components/ui/NumberInput";

type QRType = 'URL' | 'Text' | 'Email' | 'Phone' | 'Wi-Fi' | 'Contact';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export function QrCodeGeneratorTool() {
  const [type, setType] = useState<QRType>('URL');
  const [input, setInput] = useState("");
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [phone, setPhone] = useState("");
  const [wifi, setWifi] = useState({ ssid: "", password: "", security: "WPA", hidden: false });
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    org: "",
    jobTitle: "",
    phone: "",
    email: "",
    website: "",
    street: "",
    city: "",
    country: ""
  });

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [size, setSize] = useState("256");
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const [showFrame, setShowFrame] = useState(false);
  const [frameLabel, setFrameLabel] = useState("Scan Me");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  const getLuminance = (hex: string) => {
    const rgb = hex.match(/\w\w/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const parsedSize = parseInt(size) || 256;

  const scannability = useMemo(() => {
    if (!isGenerated) return null;

    let score = 100;
    let hint = "";
    const lumFg = getLuminance(fgColor);
    const lumBg = getLuminance(bgColor);

    const L1 = Math.max(lumFg, lumBg);
    const L2 = Math.min(lumFg, lumBg);
    const contrast = (L1 + 0.05) / (L2 + 0.05);

    // Checks
    const isInverted = lumBg < lumFg;
    const isSmall = parsedSize < 128;
    const isLowEC = errorLevel === 'L';

    if (contrast < 3.0) {
      score -= 40;
      hint = "Low contrast: try darker foreground or lighter background";
    } else if (contrast < 4.5) {
      score -= 20;
      hint = "Low contrast: try darker foreground or lighter background";
    }

    if (isInverted) {
      score -= 20;
      if (!hint) hint = "Inverted colors detected: swap foreground and background";
    }

    if (isSmall) {
      score -= 20;
      if (!hint) hint = "QR code size is very small, may be hard to scan when printed";
    }

    if (isLowEC) {
      score -= 20;
      if (!hint) hint = "Error correction too low for print use: recommend M or H";
    }

    score = Math.max(0, score);

    let status: { label: string, color: string, iconColor: string };
    if (score >= 80) status = { label: "Excellent — highly scanneable", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", iconColor: "text-emerald-500" };
    else if (score >= 60) status = { label: "Good — should scan reliably", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-500/20", iconColor: "text-yellow-500" };
    else if (score >= 40) status = { label: "Fair — may struggle in poor lighting", color: "bg-orange-500/10 text-orange-700 dark:text-orange-500 border-orange-500/20", iconColor: "text-orange-500" };
    else status = { label: "Poor — likely to fail scanning", color: "bg-red-500/10 text-red-600 border-red-500/20", iconColor: "text-red-500" };

    return { score, hint, ...status };
  }, [isGenerated, fgColor, bgColor, parsedSize, errorLevel]);

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
      case 'Contact': {
        const lines = ["BEGIN:VCARD", "VERSION:3.0"];
        if (contact.lastName || contact.firstName) {
          lines.push(`N:${contact.lastName};${contact.firstName};;;`);
          lines.push(`FN:${contact.firstName} ${contact.lastName}`.trim());
        }
        if (contact.org) lines.push(`ORG:${contact.org}`);
        if (contact.jobTitle) lines.push(`TITLE:${contact.jobTitle}`);
        if (contact.phone) lines.push(`TEL;TYPE=CELL:${contact.phone}`);
        if (contact.email) lines.push(`EMAIL:${contact.email}`);
        if (contact.website) lines.push(`URL:${contact.website}`);
        if (contact.street || contact.city || contact.country) {
          lines.push(`ADR;TYPE=WORK:;;${contact.street};${contact.city};;${contact.country};`);
        }
        lines.push("END:VCARD");
        return lines.join("\n");
      }
      default:
        return "";
    }
  }, [type, input, email, phone, wifi, contact]);

  const generateQR = useCallback(async () => {
    if (!canvasRef.current) return;

    const data = getEncodedData();
    const qrSize = parsedSize;
    const labelHeight = showFrame ? Math.round(qrSize * 0.15) : 0;
    const totalWidth = qrSize;
    const totalHeight = qrSize + labelHeight;

    try {
      const tempCanvas = document.createElement('canvas');
      await QRCode.toCanvas(tempCanvas, data, {
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });

      canvasRef.current.width = totalWidth;
      canvasRef.current.height = totalHeight;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, totalWidth, totalHeight);
      ctx.drawImage(tempCanvas, 0, 0);

      if (showFrame && frameLabel) {
        const fontSize = Math.max(12, Math.round(qrSize * 0.06));
        ctx.fillStyle = fgColor;
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(frameLabel, totalWidth / 2, qrSize + (labelHeight / 2));
      }

      setIsGenerated(true);
    } catch (err) {
      console.error(err);
      setIsGenerated(false);
    }
  }, [getEncodedData, parsedSize, errorLevel, fgColor, bgColor, showFrame, frameLabel]);

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
    const qrSize = parsedSize;
    const labelHeight = showFrame ? Math.round(qrSize * 0.15) : 0;
    const totalHeight = qrSize + labelHeight;

    try {
      let svgString = await QRCode.toString(data, {
        type: 'svg',
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });

      if (showFrame && frameLabel) {
        const fontSize = Math.max(12, Math.round(qrSize * 0.06));
        const textElement = `<text x="50%" y="${qrSize + (labelHeight / 2)}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${fontSize}" fill="${fgColor}">${frameLabel}</text>`;

        svgString = svgString
          .replace(/height="(\d+)"/, `height="${totalHeight}"`)
          .replace(/viewBox="0 0 (\d+) (\d+)"/, `viewBox="0 0 $1 ${totalHeight}"`)
          .replace(/<\/svg>$/, `${textElement}</svg>`);
      }

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
    <div className="max-w-6xl mx-auto my-8 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Input Controls */}
        <div className="lg:col-span-7 space-y-6" id="qr-generator-controls">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">

            {/* Tabs */}
            <PillSelector
              value={type}
              onChange={setType}
              options={[
                { label: 'URL', value: 'URL' },
                { label: 'Text', value: 'Text' },
                { label: 'Email', value: 'Email' },
                { label: 'Phone', value: 'Phone' },
                { label: 'Wi-Fi', value: 'Wi-Fi' },
                { label: 'Contact', value: 'Contact' },
              ]}
              className="mb-8"
            />

            {/* Dynamic Fields */}
            <div className="space-y-4 min-h-[160px]">
              {type === 'URL' && (
                <Input
                  label="Website URL"
                  type="url"
                  placeholder="https://example.com"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              )}

              {type === 'Text' && (
                <div className="space-y-1.5 w-full">
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">
                    Plain Text
                  </label>
                  <textarea
                    placeholder="Enter your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-32 bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-lg p-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all resize-none"
                  />
                </div>
              )}

              {type === 'Email' && (
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="Recipient Email"
                    type="email"
                    placeholder="hello@hilmost.net"
                    value={email.to}
                    onChange={(e) => setEmail({ ...email, to: e.target.value })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Subject"
                      placeholder="Inquiry"
                      value={email.subject}
                      onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                    />
                    <Input
                      label="Message Body"
                      placeholder="Hello team..."
                      value={email.body}
                      onChange={(e) => setEmail({ ...email, body: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {type === 'Phone' && (
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              )}

              {type === 'Wi-Fi' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Network SSID"
                      placeholder="Home-WiFi"
                      value={wifi.ssid}
                      onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                    />
                    <Select
                      label="Security"
                      value={wifi.security}
                      onChange={(e) => setWifi({ ...wifi, security: e.target.value })}
                      options={[
                        { label: "WPA/WPA2", value: "WPA" },
                        { label: "WEP", value: "WEP" },
                        { label: "None (Open)", value: "None" },
                      ]}
                    />
                  </div>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={wifi.password}
                    onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                  />
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

              {type === 'Contact' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name *"
                      placeholder="John"
                      value={contact.firstName}
                      onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      value={contact.lastName}
                      onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Organization"
                      placeholder="Hilmost Software"
                      value={contact.org}
                      onChange={(e) => setContact({ ...contact, org: e.target.value })}
                    />
                    <Input
                      label="Job Title"
                      placeholder="Solo Founder"
                      value={contact.jobTitle}
                      onChange={(e) => setContact({ ...contact, jobTitle: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+1 234 567 890"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Website"
                    type="url"
                    placeholder="https://hilmost.net"
                    value={contact.website}
                    onChange={(e) => setContact({ ...contact, website: e.target.value })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Street"
                      placeholder="84 Broughton Dr"
                      value={contact.street}
                      onChange={(e) => setContact({ ...contact, street: e.target.value })}
                    />
                    <Input
                      label="City"
                      placeholder="Harare"
                      value={contact.city}
                      onChange={(e) => setContact({ ...contact, city: e.target.value })}
                    />
                    <Input
                      label="Country"
                      placeholder="Zimbabwe"
                      value={contact.country}
                      onChange={(e) => setContact({ ...contact, country: e.target.value })}
                    />
                  </div>
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
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <NumberInput
                        label="Resolution (px)"
                        value={size}
                        onChange={setSize}
                        min={128}
                        max={2048}
                      />
                      <PillSelector
                        value={size}
                        onChange={setSize}
                        options={[
                          { label: '128', value: '128' },
                          { label: '256', value: '256' },
                          { label: '512', value: '512' },
                          { label: '1024', value: '1024' },
                        ]}
                      />
                    </div>
                    <div className="space-y-2">
                      <PillSelector
                        label="Error Correction"
                        value={errorLevel}
                        onChange={setErrorLevel}
                        options={[
                          { label: 'L', value: 'L' },
                          { label: 'M', value: 'M' },
                          { label: 'Q', value: 'Q' },
                          { label: 'H', value: 'H' },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">Colors</label>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-950 rounded-lg border border-[#D8D6CF] dark:border-slate-800">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">QR Code</span>
                          <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-8 w-12 bg-transparent cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-950 rounded-lg border border-[#D8D6CF] dark:border-slate-800">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Background</span>
                          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-12 bg-transparent cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">Frame Label</label>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-white dark:bg-slate-950 rounded-lg border border-[#D8D6CF] dark:border-slate-800 cursor-pointer group">
                          <div className="flex items-center gap-2">
                            <Type size={14} className="text-brand-primary" />
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Enable Label</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showFrame}
                              onChange={(e) => setShowFrame(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-primary"></div>
                          </div>
                        </label>

                        {showFrame && (
                          <div className="animate-in fade-in zoom-in-95 duration-200">
                            <Input
                              maxLength={30}
                              placeholder="Label (e.g. Scan Me)"
                              value={frameLabel}
                              onChange={(e) => setFrameLabel(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Preview & Actions */}
        <div className="lg:col-span-5 sticky top-24" id="qr-generator-preview">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center">
            <div className="bg-white p-6 rounded-[2rem] shadow-inner mb-8 w-full aspect-square flex items-center justify-center relative overflow-hidden group">
               <canvas ref={canvasRef} className="max-w-full h-auto" style={{ imageRendering: 'pixelated' }} />
               {!isGenerated && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                    <QrCode size={48} className="text-slate-200 animate-pulse" />
                 </div>
               )}
            </div>

            {scannability && (
              <div className={`w-full mb-6 p-4 rounded-2xl border ${scannability.color} transition-all duration-500 animate-in fade-in slide-in-from-bottom-2`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${scannability.iconColor} bg-current shadow-[0_0_8px_currentColor]`} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{scannability.label}</span>
                  <span className="ml-auto text-[10px] font-mono font-bold opacity-60">Score: {scannability.score}/100</span>
                </div>
                {scannability.hint && (
                  <p className="text-[10px] font-bold leading-tight opacity-80 flex items-start gap-1.5 mt-1">
                    <AlertCircle size={10} className="mt-0.5 shrink-0" />
                    Fix: {scannability.hint}
                  </p>
                )}
                <div className="mt-3 h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                   <div
                    className={`h-full transition-all duration-1000 ${scannability.iconColor} bg-current`}
                    style={{ width: `${scannability.score}%` }}
                   />
                </div>
              </div>
            )}

            <div className="w-full space-y-4">
              <div className="grid grid-cols-1 gap-3 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={downloadQR}
                    disabled={!isGenerated}
                    className="flex-1 !px-4"
                  >
                    <Download size={16} /> PNG
                  </Button>
                  <Button
                    onClick={downloadSVG}
                    disabled={!isGenerated}
                    className="flex-1 !px-4"
                  >
                    <Download size={16} /> SVG
                  </Button>
                </div>
                <Button
                  onClick={copyToClipboard}
                  disabled={!isGenerated}
                  variant={copyStatus === 'success' ? 'primary' : 'pill'}
                  className={`w-full ${copyStatus === 'error' ? 'bg-red-600' : ''}`}
                >
                  {copyStatus === 'success' ? <Check size={16} /> : copyStatus === 'error' ? <AlertCircle size={16} /> : <Copy size={16} />}
                  {copyStatus === 'success' ? 'Copied!' : copyStatus === 'error' ? 'Copy failed' : 'Copy to Clipboard'}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-500 select-none pt-2">
                <Lock size={12} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Generated Locally</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 select-none mt-12">
        <Lock size={12} />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">🔒 Generated in your browser. Never sent to any server.</span>
      </div>
    </div>
  );
}
