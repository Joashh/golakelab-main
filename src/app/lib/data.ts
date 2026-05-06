type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_WP_URL;
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '');
}
function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export async function getNews() {
  const res = await fetch(`${BASE_URL}/wp-json/wp/v2/news?_embed`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();

  return data.map((item: any) => ({
    id: item.id.toString(),
    title: item.title?.rendered || '',
    content: item.content?.rendered || '',
    date: item.date,
    author: item._embedded?.author?.[0]?.name || 'Unknown',
    category: item._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized"
  }));
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/lake-category`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}



export async function getCommunityPost() {
  try {
    const [postsRes, commentsRes] = await Promise.all([
      fetch(`${BASE_URL}/wp-json/wp/v2/posts?_embed`, {
        next: { revalidate: 60 },
      }),
      fetch(`${BASE_URL}/wp-json/wp/v2/comments?per_page=100`, {
        next: { revalidate: 60 },
      }),
    ]);

    const postsData = await postsRes.json();
    const commentsData = await commentsRes.json();

    // group comments
    const grouped: Record<number, any[]> = {};
    commentsData.forEach((c: any) => {
      if (!grouped[c.post]) grouped[c.post] = [];
      grouped[c.post].push(c);
    });


    const normalizedPosts = postsData.map((post: any) => {
      const author = post._embedded?.author?.[0]?.name || 'Anonymous';
      const terms = post._embedded?.["wp:term"]?.flat() || [];
      const lakeTerm = terms.find((t: any) => t.taxonomy === "lake-category");
      const defaultCategory = terms.find((t: any) => t.taxonomy === "category");

      return {
        id: post.id,
        author,
        avatar: getInitials(author),
        categorySlug: lakeTerm?.slug || defaultCategory?.slug || null,
        timestamp: new Date(post.date).toLocaleDateString(),

        // ✅ FIXED
        category:
          terms.find((t: any) => t.taxonomy === "lake-category")?.name ||
          terms.find((t: any) => t.taxonomy === "category")?.name ||
          "Community",

        title: post.title?.rendered || '',
        content: post.content?.rendered || '',
        upvotes: 0,
        comments: grouped[post.id]?.length || 0,

        // optional improvement
        tags:
          terms
            .filter((t: any) => t.taxonomy === "post_tag")
            .map((t: any) => t.name),
      };
    });

    return normalizedPosts;

  } catch (err) {
    console.error(err);
    return [];
  }
}


export async function getCategoryBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/lake-category?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const category = data[0];

  if (!category) return null;

  return {
    id: category.id,
    name: category.name,
    description: category.acf?.partner_description || "",
    yearsofresearch: category.acf?.years_of_research?.toString() || "N/A",
    interconnected: category.acf?.interconnected_crater_lakes?.toString() || "N/A",
    partnerinsti: category.acf?.partner_institutions?.toString() || "N/A",
    conservationproj: category.acf?.conservation_projects?.toString() || "N/A",
    aboutregion: category.acf?.about_this_region || "N/A",
    image: category.image || category.z_taxonomy_image_url || "/placeholder.jpg",
  };
}

export async function getPartnersByCategoryId(categoryId: number) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/partner?lake-category=${categoryId}&_embed&order=asc&orderby=date`,
    { next: { revalidate: 60 }, }
  );
  const data = await res.json();
  return data;
}



export async function getLakesByCategoryId(categoryId: number) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/lake?lake-category=${categoryId}&_embed`,
    { next: { revalidate: 60 }, }
  );
  const data = await res.json();

  const getNumber = (val: any) => {
    if (val === null || val === undefined || val === "") return 0;
    return parseFloat(val) || 0;
  };

  const getArray = (val: any) => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  return data.map((lake: any) => {
    const acf = lake.acf || {};

    return {
      id: lake.id,
      slug: lake.slug,
      name: lake.title?.rendered || "",
      image:
        lake._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/placeholder.jpg",
      shortDescription:
        lake.excerpt?.rendered || lake.content?.rendered || "",

      barangays: getArray(acf.barangay),
      fishSpecies: getArray(acf.fish_species),

      number_species: getNumber(acf.number_of_fish_species),
      maxDepth: getNumber(acf.maximum_depth),
      latitude: getNumber(acf.latitude),
      longitude: getNumber(acf.longitude),
      area: getNumber(acf.surface_area),
    };
  });
}

export async function getSectionTypes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/section-type`,
    { next: { revalidate: 60 }, }
  );

  return res.json();
}



export async function getLakeBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/lake?slug=${slug}&_embed`,
    { next: { revalidate: 60 }, }
  );

  const data = await res.json();
  return data[0];
}

export async function getLakeSections(lakeId: number) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/lake-section?_embed&order=asc&orderby=date`,
    { next: { revalidate: 60 }, }
  );

  const data = await res.json();

  return data.filter((section: any) => {
    return section?.acf?.parent_lake == lakeId;
  });
}

export async function getLakePageData(lakeId: number) {
  const [lake, sectionTypes, lakeSections] = await Promise.all([
    getLakesByCategoryId(lakeId),
    getSectionTypes(),
    getLakeSections(lakeId),
  ]);

  const termMap = Object.fromEntries(
    sectionTypes.map((t: any) => [t.id, t.name])
  );

  const grouped: Record<string, any[]> = {};

  lakeSections.forEach((section: any) => {
    const terms = section?._embedded?.["wp:term"] || [];

    let found = false;

    terms.forEach((group: any[]) => {
      group.forEach((term: any) => {
        if (term.taxonomy === "section-type") {
          const name = term.name;

          if (!grouped[name]) grouped[name] = [];
          grouped[name].push(section);
          found = true;
        }
      });
    });

    if (!found) {
      if (!grouped["Other"]) grouped["Other"] = [];
      grouped["Other"].push(section);
    }
  });

  return {
    lake,
    termMap,
    grouped,
    tabs: Object.keys(grouped),
  };
}

export function normalizeLake(lake: any, lakeSections: any[]) {
  const acf = lake.acf || {};

  const categories = lake._embedded?.["wp:term"]?.flat() || [];
  const category = categories.find(
    (term: any) => term.taxonomy === "lake-category"
  );

  // grouping logic (tabs)
  const grouped: Record<string, any[]> = {};

  lakeSections.forEach((section: any) => {
    const terms = section?._embedded?.["wp:term"] || [];

    let found = false;

    terms.forEach((group: any[]) => {
      group.forEach((term: any) => {
        if (term.taxonomy === "section-type") {
          const name = term.name;

          if (!grouped[name]) grouped[name] = [];
          grouped[name].push(section);
          found = true;
        }
      });
    });

    if (!found) {
      if (!grouped["Other"]) grouped["Other"] = [];
      grouped["Other"].push(section);
    }
  });

  return {
    lake: {
      id: lake.id,
      name: lake.title?.rendered,
      description: lake.content?.rendered,
      image:
        lake._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/placeholder.jpg",
      metadata: {
        barangay: acf.barangay,
        distance: acf.distance_from_city_proper,
        depth: acf.maximum_depth,
        area: acf.surface_area,
        fish: acf.type_of_fish_present,
      },
      category,
    },

    tabs: Object.keys(grouped),
    grouped,
  };
}


//Journals, for Download Content ;D

export async function getAllJournals() {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/wpdmpro?_embed&per_page=20`,
    { next: { revalidate: 60 }, }
  );

  return res.json();
}

export async function getSpecificJournals(categoryId: number) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/wpdmpro?_embed&per_page=50&wpdmcategory=${categoryId}`
  );
  
  if (!res.ok) {
    throw new Error(`Failed to fetch category ${categoryId}`);
  }
  
  return res.json();
}

export async function getJournalCategoryIdFromSlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/wpdmcategory?slug=${slug}`
  );
  
  if (!res.ok) return null;
  
  const categories = await res.json();
  return categories.length > 0 ? categories[0].id : null;
}

export async function trackJournalView(journalId: number) {
  return fetch(
    `${BASE_URL}/wp-json/custom/v1/track-view/${journalId}`,
    { method: "POST" }
  );
}

export async function trackJournalDownload(journalId: number) {
  const res = await fetch(
    `${BASE_URL}/wp-json/custom/v1/track-download/${journalId}`,
    { method: "POST" }
  );

  return res.json();
}

export async function submitDownloadForm(payload: any) {
  const res = await fetch(
    `${BASE_URL}/wp-json/custom/v1/download-submit`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  return res.json();
}

export async function getMatomoVisitors() {
  const form = new URLSearchParams();

  form.append("module", "API");
  form.append("method", "VisitsSummary.get");
  form.append("idSite", "1");
  form.append("period", "day");
  form.append("date", "today");
  form.append("format", "JSON");
  form.append("token_auth", process.env.MATOMO_TOKEN!);

  const res = await fetch(
    `${BASE_URL}/matomo/index.php`,
    {
      method: "POST",
      body: form,
    }
  );

  return res.json();
}