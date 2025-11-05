export interface Event {
  id: string;
  title: string;
  date: Date;
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
