import JournalForSubPage from "@/app/component/JournalForSubPage";
import { getSpecificJournals, getJournalCategoryIdFromSlug } from "@/app/lib/data";
import { Download, Eye } from "lucide-react";
import { FilterBar } from "@/app/component/FilterBar";
import { SearchBar } from "@/app/component/SearchBar";
import SubPageClient from "./SubPageClient";
import he from "he";

type Params = {
    params: Promise<{
        slug: string;
    }>;
};






export default async function CategoryDownloadPage({ params }: Params) {
    const { slug } = await params;
    const categoryId = await getJournalCategoryIdFromSlug(slug);

    if (!categoryId) {
        return <div>Category not found</div>;
    }

    const journallist = await getSpecificJournals(categoryId);


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header Section */}
           

            <SubPageClient journallist={journallist} />

        </div>
    );
}