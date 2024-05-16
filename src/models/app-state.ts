import { Signal, signal } from "@preact/signals";
import { TrashRecord } from "./trashrecords";

export function createAppState() {
  const trashRecords = signal<TrashRecord[]>([]);
  const detectedTrash = signal<TrashRecord | null>(null);

  return { trashRecords, detectedTrash };
}

export type TrashState = {
  trashRecords: Signal<TrashRecord[]>;
  detectedTrash: Signal<TrashRecord>;
};
