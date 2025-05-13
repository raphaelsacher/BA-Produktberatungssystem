"use client";

import React, {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { TranscriptItem } from "@/app/types";

type TranscriptContextValue = {
  transcriptItems: TranscriptItem[];
  addTranscriptMessage: (
    itemId: string,
    role: "user" | "assistant",
    text: string,
    hidden?: boolean
  ) => void;
  updateTranscriptMessage: (
    itemId: string,
    text: string,
    isDelta: boolean
  ) => void;
  addTranscriptBreadcrumb: (
    title: string,
    data?: Record<string, any>,
    isToolRunning?: boolean
  ) => string;
  addProductResult: (comparyResult: any, presentResult: any) => void;
  toggleTranscriptItemExpand: (itemId: string) => void;
  updateTranscriptItemStatus: (
    itemId: string,
    newStatus: "IN_PROGRESS" | "DONE"
  ) => void;
  updateToolRunningStatus: (itemId: string, isToolRunning: boolean) => void;
};

const TranscriptContext = createContext<TranscriptContextValue | undefined>(
  undefined
);

export const TranscriptProvider: FC<PropsWithChildren> = ({ children }) => {
  const [transcriptItems, setTranscriptItems] = useState<TranscriptItem[]>([]);

  function newTimestampPretty(): string {
    return new Date().toLocaleTimeString([], {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  const addTranscriptMessage: TranscriptContextValue["addTranscriptMessage"] = (
    itemId,
    role,
    text = "",
    isHidden = false
  ) => {
    setTranscriptItems((prev) => {
      if (prev.some((log) => log.itemId === itemId && log.type === "MESSAGE")) {
        console.warn(
          `[addTranscriptMessage] skipping; message already exists for itemId=${itemId}, role=${role}, text=${text}`
        );
        return prev;
      }
      const newItem: TranscriptItem = {
        itemId,
        type: "MESSAGE",
        role,
        title: text,
        expanded: false,
        timestamp: newTimestampPretty(),
        createdAtMs: Date.now(),
        status: "IN_PROGRESS",
        isHidden,
      };
      return [...prev, newItem];
    });
  };

  const updateTranscriptMessage: TranscriptContextValue["updateTranscriptMessage"] =
    (itemId, newText, append = false) => {
      setTranscriptItems((prev) =>
        prev.map((item) => {
          if (item.itemId === itemId && item.type === "MESSAGE") {
            return {
              ...item,
              title: append ? (item.title ?? "") + newText : newText,
            };
          }
          return item;
        })
      );
    };

  const addTranscriptBreadcrumb: TranscriptContextValue["addTranscriptBreadcrumb"] =
    (title, data, isToolRunning = false) => {
      const itemId = `breadcrumb-${uuidv4()}`;
      setTranscriptItems((prev) => [
        ...prev,
        {
          itemId,
          type: "BREADCRUMB",
          title,
          data,
          expanded: false,
          timestamp: newTimestampPretty(),
          createdAtMs: Date.now(),
          status: "IN_PROGRESS",
          isHidden: false,
          isToolRunning, // Neues optionales Argument
        },
      ]);
      return itemId;
    };

  const addProductResult: TranscriptContextValue["addProductResult"] = (
    comparyResult,
    presentResult
  ) => {
    setTranscriptItems((prev) => {
      const newItem: TranscriptItem = {
        itemId: uuidv4(),
        type: "PRODUCT_RESULT",
        role: "assistant",
        title: "Produkt-Suchergebnisse",
        data: { compary: comparyResult, present: presentResult },
        expanded: false,
        timestamp: newTimestampPretty(),
        createdAtMs: Date.now(),
        status: "DONE",
        isHidden: true,
      };
      return [...prev, newItem];
    });
  };

  const toggleTranscriptItemExpand: TranscriptContextValue["toggleTranscriptItemExpand"] =
    (itemId) => {
      setTranscriptItems((prev) =>
        prev.map((log) =>
          log.itemId === itemId ? { ...log, expanded: !log.expanded } : log
        )
      );
    };

  const updateTranscriptItemStatus: TranscriptContextValue["updateTranscriptItemStatus"] =
    (itemId, newStatus) => {
      setTranscriptItems((prev) =>
        prev.map((item) =>
          item.itemId === itemId ? { ...item, status: newStatus } : item
        )
      );
    };

  const updateToolRunningStatus: TranscriptContextValue["updateToolRunningStatus"] =
    (itemId, isToolRunning) => {
      setTranscriptItems((prev) =>
        prev.map((item) =>
          item.itemId === itemId ? { ...item, isToolRunning } : item
        )
      );
    };

  return (
    <TranscriptContext.Provider
      value={{
        transcriptItems,
        addTranscriptMessage,
        updateTranscriptMessage,
        addTranscriptBreadcrumb,
        addProductResult,
        toggleTranscriptItemExpand,
        updateTranscriptItemStatus,
        updateToolRunningStatus,
      }}
    >
      {children}
    </TranscriptContext.Provider>
  );
};

export function useTranscript() {
  const context = useContext(TranscriptContext);
  if (!context) {
    throw new Error("useTranscript must be used within a TranscriptProvider");
  }
  return context;
}
