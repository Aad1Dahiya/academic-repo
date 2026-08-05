export type Paper = {
  id: string
  title: string
  authors: string[]
  journal: string
  subject: string
  year: number
  citations: number
  abstract: string
}

export const papers: Paper[] = [
  { id: 'p1', title: 'Transparent methods for reproducible machine learning', authors: ['Maya Chen', 'Liam Patel'], journal: 'Computational Methods', subject: 'Computer Science', year: 2024, citations: 184, abstract: 'A practical framework for reporting data, evaluation, and model decisions.' },
  { id: 'p2', title: 'Urban heat islands and equitable cooling policy', authors: ['Sofia Alvarez', 'Noah Williams'], journal: 'Environmental Systems', subject: 'Environmental Science', year: 2024, citations: 97, abstract: 'An analysis of neighborhood-level heat exposure and public cooling access.' },
  { id: 'p3', title: 'Trust calibration in human-AI decision support', authors: ['Liam Patel', 'Amina Okafor'], journal: 'Journal of Human Systems', subject: 'Psychology', year: 2023, citations: 156, abstract: 'How interface explanations change appropriate reliance on automated advice.' },
  { id: 'p4', title: 'Open scholarship practices across early-career labs', authors: ['Maya Chen', 'Sofia Alvarez'], journal: 'Research Practice Review', subject: 'Education', year: 2023, citations: 73, abstract: 'A mixed-methods study of barriers and incentives for open research.' },
  { id: 'p5', title: 'Network models of interdisciplinary collaboration', authors: ['Noah Williams', 'Amina Okafor'], journal: 'Computational Methods', subject: 'Mathematics', year: 2022, citations: 211, abstract: 'Graph measures that reveal durable cross-field research partnerships.' },
  { id: 'p6', title: 'Community archives as living digital infrastructure', authors: ['Amina Okafor'], journal: 'Digital Humanities Quarterly', subject: 'Humanities', year: 2022, citations: 64, abstract: 'Design principles for participatory, sustainable digital archives.' },
]

export const authors = [...new Set(papers.flatMap((paper) => paper.authors))]
export const journals = [...new Set(papers.map((paper) => paper.journal))]
export const subjects = [...new Set(papers.map((paper) => paper.subject))]
