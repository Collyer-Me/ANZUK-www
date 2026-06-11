/**
 * JobAdder integration stub.
 * Jobs are sourced from JobAdder — not stored in Strapi.
 * See docs/ia/external-integrations.md
 */

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  location?: string;
  applyUrl: string;
}

export interface JobBoardConfig {
  jobAdderBoardId?: string | null;
  featuredOnly?: boolean;
  externalApply?: boolean;
}

/** Placeholder until JobAdder API is wired at build time. */
export async function fetchJobs(_config?: JobBoardConfig): Promise<JobListing[]> {
  return [];
}
