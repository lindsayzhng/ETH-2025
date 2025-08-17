import { createServer, Model } from "miragejs";
import type { AppraisalRequest, AppraisalResponse } from "./types";
import { mockAppraisalResponse } from "./data";
import axios from "axios";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      nft: Model,
    },
    seeds(server) {
      // Pre-seed some mock data if needed
    },
    routes() {
      this.namespace = "/api";
      this.post("/appraise", (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as AppraisalRequest;
        // Return mock response (customize based on input if desired)
        return mockAppraisalResponse;
      });
    },
  });
}

export const fetchAppraisal = async (
  req: AppraisalRequest
): Promise<AppraisalResponse> => {
  const response = await axios.post("/api/appraise", req);
  return response.data;
};
