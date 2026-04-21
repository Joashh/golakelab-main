export interface Partner {
  id: number;
  title: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
}