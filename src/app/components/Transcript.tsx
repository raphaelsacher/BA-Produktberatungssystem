"use client";

import React, { useEffect, useRef, useState } from "react";
import { TranscriptItem } from "@/app/types";
import Image from "next/image";
import { useTranscript } from "@/app/contexts/TranscriptContext";
import { useProducts } from "@/app/hooks/useProducts";
import { FormattedMessage } from "@/app/components/FormattedMessage";
import ProgressBar from "./ProgressBar";

export interface TranscriptProps {
  userText: string;
  setUserText: (val: string) => void;
  onSendMessage: () => void;
  canSend: boolean;
}

function Transcript({
  userText,
  setUserText,
  onSendMessage,
  canSend,
}: TranscriptProps) {
  const { transcriptItems, toggleTranscriptItemExpand } = useTranscript();
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [prevLogs, setPrevLogs] = useState<TranscriptItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const products = useProducts();

  function scrollToBottom(): void {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    const hasNewMessage = transcriptItems.length > prevLogs.length;
    const hasUpdatedMessage = transcriptItems.some((newItem, index) => {
      const oldItem = prevLogs[index];
      return (
        oldItem &&
        (newItem.title !== oldItem.title || newItem.data !== oldItem.data)
      );
    });
    if (hasNewMessage || hasUpdatedMessage) {
      scrollToBottom();
    }
    setPrevLogs(transcriptItems);
  }, [transcriptItems]);

  useEffect(() => {
    if (canSend && inputRef.current) {
      inputRef.current.focus();
    }
  }, [canSend]);

  return (
    <div className="flex flex-col flex-1 bg-white min-h-0 rounded-xl">
      <div className="relative flex-1 min-h-0">
        <div
          ref={transcriptRef}
          className="overflow-auto p-4 flex flex-col gap-y-4 h-full"
        >
          {transcriptItems.map((item) => {
            if (item.isHidden) return null;

            if (item.type === "MESSAGE") {
              const isUser = item.role === "user";
              const containerClasses = `flex flex-col ${
                isUser ? "items-end" : "items-start"
              }`;
              const bubbleBase = isUser
                ? "max-w-lg p-3 rounded-xl bg-gray-900 text-gray-100"
                : "max-w-3xl p-3 rounded-xl bg-gray-100 text-black";
              return (
                <div key={item.itemId} className={containerClasses}>
                  <div className={bubbleBase}>
                    <div
                      className={`text-xs ${
                        isUser ? "text-gray-400" : "text-gray-500"
                      } font-mono`}
                    >
                      {item.timestamp}
                    </div>
                    <div className="whitespace-pre-wrap">
                      <FormattedMessage
                        text={item.title || ""}
                        products={products}
                      />
                    </div>
                  </div>
                </div>
              );
            } else if (item.type === "BREADCRUMB") {
              if (item.isToolRunning) {
                return <ProgressBar key={item.itemId} />;
              }
              return (
                <div
                  key={item.itemId}
                  className="flex flex-col justify-start items-start text-gray-500 text-sm"
                >
                  <span className="text-xs font-mono">{item.timestamp}</span>
                  <div
                    className={`whitespace-pre-wrap flex items-center font-mono text-sm text-gray-800 ${
                      item.data ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      item.data && toggleTranscriptItemExpand(item.itemId)
                    }
                  >
                    {item.data && (
                      <span
                        className={`text-gray-400 mr-1 transform transition-transform duration-200 select-none font-mono ${
                          item.expanded ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        ▶
                      </span>
                    )}
                    {item.title}
                  </div>
                  {item.expanded && item.data && (
                    <div className="text-gray-800 text-left">
                      <pre className="border-l-2 ml-1 border-gray-200 whitespace-pre-wrap break-words font-mono text-xs mb-2 mt-2 pl-2">
                        {JSON.stringify(item.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  key={item.itemId}
                  className="flex justify-center text-gray-500 text-sm italic font-mono"
                >
                  Unknown item type: {item.type}{" "}
                  <span className="ml-2 text-xs">{item.timestamp}</span>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="p-4 flex items-center gap-x-2 flex-shrink-0 border-t border-gray-200">
        <input
          ref={inputRef}
          type="text"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canSend) onSendMessage();
          }}
          className="flex-1 px-4 py-2 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={onSendMessage}
          disabled={!canSend || !userText.trim()}
          className="bg-gray-900 text-white rounded-full px-2 py-2 disabled:opacity-50"
        >
          <Image src="arrow.svg" alt="Send" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

export default Transcript;
