"use client";

import React from "react";
import { SessionStatus } from "@/app/types";

/**
 * Props for BottomToolbar component.
 *
 * @param sessionStatus - Current session status.
 * @param onToggleConnection - Function to toggle connection.
 * @param isPTTActive - Indicates if push-to-talk is active.
 * @param setIsPTTActive - Setter for push-to-talk active state.
 * @param isPTTUserSpeaking - Indicates if user is speaking.
 * @param handleTalkButtonDown - Function for talk button press.
 * @param handleTalkButtonUp - Function for talk button release.
 * @param isAudioPlaybackEnabled - Indicates if audio playback is enabled.
 * @param setIsAudioPlaybackEnabled - Setter for audio playback enabled state.
 * @param hasProducts - Flag if there are products.
 * @param isProductsPaneExpanded - Current state of the product pane.
 * @param setIsProductsPaneExpanded - Setter for product pane state.
 */
interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
  isPTTActive: boolean;
  setIsPTTActive: (val: boolean) => void;
  isPTTUserSpeaking: boolean;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (val: boolean) => void;
  hasProducts: boolean;
  isProductsPaneExpanded: boolean;
  setIsProductsPaneExpanded: (val: boolean) => void;
}

function BottomToolbar({
  sessionStatus,
  onToggleConnection,
  isPTTActive,
  setIsPTTActive,
  isPTTUserSpeaking,
  handleTalkButtonDown,
  handleTalkButtonUp,
  isAudioPlaybackEnabled,
  setIsAudioPlaybackEnabled,
  hasProducts,
  isProductsPaneExpanded,
  setIsProductsPaneExpanded,
}: BottomToolbarProps) {
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  /**
   * Returns the label for the connection button.
   *
   * @return {string} Button label.
   */
  function getConnectionButtonLabel(): string {
    if (isConnected) return "Disconnect";
    if (isConnecting) return "Connecting...";
    return "Connect";
  }

  /**
   * Returns the CSS classes for the connection button.
   *
   * @return {string} TailwindCSS classes.
   */
  function getConnectionButtonClasses(): string {
    const baseClasses = "text-white text-base p-2 w-36 rounded-full h-full";
    const cursorClass = isConnecting ? "cursor-not-allowed" : "cursor-pointer";
    if (isConnected) {
      return `bg-red-600 hover:bg-red-700 ${cursorClass} ${baseClasses}`;
    }
    return `bg-black hover:bg-gray-900 ${cursorClass} ${baseClasses}`;
  }

  return (
    // Responsives Layout: Auf mobilen Geräten (default) als Spalte, ab md als Zeile
    <div className="p-4 flex flex-col md:flex-row items-center justify-center gap-y-2 gap-x-8">
      <button
        onClick={onToggleConnection}
        className={getConnectionButtonClasses()}
        disabled={isConnecting}
      >
        {getConnectionButtonLabel()}
      </button>

      <div className="flex flex-row items-center gap-2">
        <input
          id="push-to-talk"
          type="checkbox"
          checked={isPTTActive}
          onChange={(e) => setIsPTTActive(e.target.checked)}
          disabled={!isConnected}
          className="w-4 h-4"
        />
        <label
          htmlFor="push-to-talk"
          className="flex items-center cursor-pointer"
        >
          Push to talk
        </label>
        <button
          onMouseDown={handleTalkButtonDown}
          onMouseUp={handleTalkButtonUp}
          onTouchStart={handleTalkButtonDown}
          onTouchEnd={handleTalkButtonUp}
          disabled={!isPTTActive}
          className={`py-1 px-4 rounded-full ${
            isPTTUserSpeaking ? "bg-gray-300" : "bg-gray-200"
          } ${!isPTTActive ? "bg-gray-100 text-gray-400" : ""}`}
        >
          Talk
        </button>
      </div>

      <div className="flex flex-row items-center gap-2">
        <input
          id="audio-playback"
          type="checkbox"
          checked={isAudioPlaybackEnabled}
          onChange={(e) => setIsAudioPlaybackEnabled(e.target.checked)}
          disabled={!isConnected}
          className="w-4 h-4"
        />
        <label
          htmlFor="audio-playback"
          className="flex items-center cursor-pointer"
        >
          Audio playback
        </label>
      </div>

      {hasProducts && (
        // Produkt-Toggle nur ab md anzeigen
        <div className="hidden md:flex flex-row items-center gap-2">
          <input
            id="products-toggle"
            type="checkbox"
            checked={isProductsPaneExpanded}
            onChange={(e) => setIsProductsPaneExpanded(e.target.checked)}
            className="w-4 h-4"
          />
          <label
            htmlFor="products-toggle"
            className="flex items-center cursor-pointer"
          >
            Produkte
          </label>
        </div>
      )}
    </div>
  );
}

export default BottomToolbar;
