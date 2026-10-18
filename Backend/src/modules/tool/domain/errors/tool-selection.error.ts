import { RepositoryError } from "../../../../services/error/error";

export class ToolSelectionError extends RepositoryError {

  constructor(toolId: string, toolType: string, cause: unknown) {
    super(
      `Failed to select tool "${toolId}" of type "${toolType}".`,
      "TOOL_SELECTION_FAILED",
    );

    this.name = "TOOL_SELECTION_FAILED";
    this.cause = cause;
  }
}
