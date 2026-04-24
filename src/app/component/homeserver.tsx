import  HomePage  from "./homeclient";

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count?: number; 
};

async function getCategories(): Promise<Category[]>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake-category`,
    {
      next: { revalidate: 60 }, 
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export default async function HomeServer() {
  const categories = await getCategories(

  ); 

  return <HomePage categories={categories} />;
}