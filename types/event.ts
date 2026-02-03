export interface Event {
  id: string;
  title: string;
  date?: Date | null;
  /**
   * Use `tbd` to mark an event with an unknown date (include it among upcoming events).
   */
  tbd?: boolean;
  location: string;
  university: string;
  description: string;
  speakers?: string[];
  materials?: {
    slides?: string;
    recording?: string;
    code?: string;
  };
  registrationLink?: string;
}
