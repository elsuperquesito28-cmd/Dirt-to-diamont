import { eq, and } from "drizzle-orm";
import type { ToolID } from "../../../obejct_values/tool/id/toolId";
import { Result, type Option } from "../../../services/result/result";
import type { MasterRepository } from "../../shared/masterRepository/masterRepsotory";
import type { ITool, Tool } from "../domain/enitity/tools.entity";
import { tool } from "../../../database/database_schemas";
import { ToolSelectionError } from "../domain/errors/tool-selection.error";
import { ToolAddError } from "../domain/errors/tool-add.error";

export class ToolHandler {
  constructor(private repository: MasterRepository) {}
  async selectTool(id: ToolID): Promise<Option<Tool>> {
    const { value: toolId, type } = id;

    try {
      const queryResult = await this.repository.select({
        table: "tool",
        where: and(eq(tool.id, toolId), eq(tool.type, type))!,
        get: "one",
      });

      if (!queryResult.isSuccess) {
        return Result.fail(
          new ToolSelectionError(id.value, type, queryResult.error),
        );
      }

      return Result.ok(queryResult.value);
    } catch (error: unknown) {
      return Result.fail(new ToolSelectionError(id.value, type, error));
    }
  }

  async addTool(tool: ITool): Promise<Option<true>> {
    try {
      const insertResult = await this.repository.insert({
        table: "tool",
        dates: tool,
      });

      if (!insertResult.isSuccess) {
        return Result.fail(
          new ToolAddError(tool.id.value, tool.type, insertResult.error),
        );
      }

      return Result.ok(insertResult.value);
    } catch (error: unknown) {
      return Result.fail(new ToolAddError(tool.id.value, tool.type, error));
    }
  }

  deleteTool(): Option<undefined> {}
}
