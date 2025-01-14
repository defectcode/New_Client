interface TTQ {
  methods: string[];
  instance: any[];
  setAndDefer?: (method: string) => void;
  load?: (e: any) => void;
  init?: (pixelId: string) => void;
  page?: () => void;
  track?: (eventName: string, data?: object) => void;
  [key: string]: any; // Permite accesarea dinamică
}

interface Window {
  ttq?: TTQ;
  TiktokAnalyticsObject?: string;
}
