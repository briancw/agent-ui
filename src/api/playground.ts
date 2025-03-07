import { toast } from "sonner";

import { APIRoutes } from "./routes";

import { Agent, ComboboxAgent, HistoryEntry } from "@/types/playground";

export const getPlaygroundAgentsAPI = async (
  endpoint: string,
): Promise<ComboboxAgent[]> => {
  const url = APIRoutes.GetPlaygroundAgents(endpoint);
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      toast.error(`Failed to fetch playground agents: ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    // Transform the API response into the expected shape.
    const agents: ComboboxAgent[] = data.map((item: Agent) => ({
      value: item.agent_id || "",
      label: item.name || "",
      model: item.model || "",
    }));
    return agents;
  } catch {
    toast.error("Error fetching playground agents");
    return [];
  }
};

export const getPlaygroundStatusAPI = async (base: string): Promise<number> => {
  const response = await fetch(APIRoutes.PlaygroundStatus(base), {
    method: "GET",
  });
  return response.status;
};

export const getAllPlaygroundSessionsAPI = async (
  base: string,
  agentId: string,
): Promise<HistoryEntry[]> => {
  const response = await fetch(APIRoutes.GetPlaygroundSessions(base, agentId), {
    method: "GET",
  });
  return response.json();
};

export const getPlaygroundSessionAPI = async (base: string, agentId: string, sessionId: string) => {
  const response = await fetch(APIRoutes.GetPlaygroundSession(base, agentId, sessionId), {
    method: "GET",
  });
  return response.json();
};
