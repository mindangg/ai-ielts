interface HowCardProps {
    tag: string
    details: string
    image: string
}

interface AssistantComponentProps {
//   companionId: string;
//   subject: string;
//   topic: string;
//   name: string;
  userName: string;
  userImage: string;
//   voice: string;
//   style: string;
}

type Assistant = Models.DocumentList<Models.Document> & {
  $id: string;
  name: string;
  voice: string;
  style: string;
  mode: string;
  bookmarked: boolean;
};

interface createAssistant {
  name: string;
  voice: string;
  style: string;
  mode: string;
}

interface GetAllAssistants {
  limit?: number;
  page?: number;
  // subject?: string | string[];
  // topic?: string | string[];
}

interface BuildClient {
  key?: string;
  sessionToken?: string;
}

interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

