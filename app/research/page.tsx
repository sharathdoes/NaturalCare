import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Calendar, Users } from "lucide-react";

// Mock data for research papers
const researchPapers = [
  {
    id: "1",
    title: "The Efficacy of Honey in Respiratory Infections",
    authors: ["Smith, J.", "Doe, A.", "Johnson, B."],
    date: "2023-05-15",
    journal: "Journal of Natural Medicine",
    abstract: "This study investigates the antimicrobial properties of various types of honey against common respiratory bacteria. Results indicate significant inhibition of bacterial growth...",
    link: "https://pubmed.ncbi.nlm.nih.gov/",
    tags: ["Honey", "Respiratory", "Antimicrobial"]
  },
  {
    id: "2",
    title: "Anti-inflammatory Effects of Curcumin: A Review",
    authors: ["Lee, K.", "Wong, S."],
    date: "2022-11-20",
    journal: "International Journal of Molecular Sciences",
    abstract: "Curcumin, the active compound in turmeric, has been shown to possess potent anti-inflammatory properties. This review summarizes clinical trials and mechanistic studies...",
    link: "https://pubmed.ncbi.nlm.nih.gov/",
    tags: ["Curcumin", "Turmeric", "Inflammation"]
  },
  {
    id: "3",
    title: "Ginger for Nausea and Vomiting: A Systematic Review",
    authors: ["Garcia, M.", "Rodriguez, L.", "Chen, T."],
    date: "2023-02-10",
    journal: "Integrative Medicine Insights",
    abstract: "A systematic review of randomized controlled trials assessing the effectiveness of ginger in treating nausea and vomiting induced by pregnancy, chemotherapy, and surgery.",
    link: "https://pubmed.ncbi.nlm.nih.gov/",
    tags: ["Ginger", "Nausea", "Digestive Health"]
  },
  {
    id: "4",
    title: "Aloe Vera in Dermatology: A Brief Review",
    authors: ["Patel, R.", "Sharma, V."],
    date: "2021-08-05",
    journal: "Dermatology Reports",
    abstract: "Aloe vera is widely used in cosmetic and medicinal products. This paper reviews its applications in treating skin conditions such as burns, psoriasis, and acne.",
    link: "https://pubmed.ncbi.nlm.nih.gov/",
    tags: ["Aloe Vera", "Skin", "Dermatology"]
  },
  {
    id: "5",
    title: "Garlic and Cardiovascular Health",
    authors: ["Brown, D.", "White, S."],
    date: "2023-09-30",
    journal: "Nutrients",
    abstract: "This meta-analysis explores the impact of garlic supplementation on blood pressure and cholesterol levels, suggesting potential cardiovascular benefits.",
    link: "https://pubmed.ncbi.nlm.nih.gov/",
    tags: ["Garlic", "Cardiovascular", "Blood Pressure"]
  }
];

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Research on Natural Remedies</h1>
        <p className="text-gray-600">
          Explore scientific studies and research papers validating the efficacy of natural remedies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchPapers.map((paper) => (
          <Card key={paper.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-xl font-semibold leading-tight text-teal-900">
                  {paper.title}
                </CardTitle>
                <FileText className="h-5 w-5 text-teal-600 shrink-0" />
              </div>
              <CardDescription className="text-sm text-gray-500 mt-2 flex flex-col gap-1">
                <span className="font-medium text-teal-700">{paper.journal}</span>
                <div className="flex items-center gap-1 text-xs">
                  <Calendar className="h-3 w-3" />
                  {paper.date}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4 text-xs text-gray-500 flex items-center gap-1">
                <Users className="h-3 w-3" />
                {paper.authors.join(", ")}
              </div>
              <p className="text-sm text-gray-700 line-clamp-4">
                {paper.abstract}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {paper.tags.map((tag) => (
                  <Badge key={tag} variant="neutral" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Link
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 py-2 rounded-md transition-colors"
              >
                Read Paper <ExternalLink className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
