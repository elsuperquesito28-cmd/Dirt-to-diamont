import { RepositoryError } from "../../../../services/error/error";

export class ToolAddError extends RepositoryError {
  constructor(toolId: string, toolType: string, cause: unknown) {
    super(
      `Failed to add tool "${toolId}" of type "${toolType}".`,
      "TOOL_ADD_FAILED",
    );

    this.name = "TOOL_ADD_FAILED";
    this.cause = cause;
  }
}
