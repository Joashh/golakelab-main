export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: 'Research' | 'Event' | 'Policy' | 'Community';
}