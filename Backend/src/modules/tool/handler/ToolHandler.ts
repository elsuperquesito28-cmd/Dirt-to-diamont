import { eq, and } from "drizzle-orm";
import type { ToolID } from "../../../obejct_values/tool/id/toolId";
import { Result, type Option } from "../../../services/result/result";
import type { MasterRepository } from "../../shared/masterRepository/masterRepsotory";
import type { ITool, Tool } from "../domain/enitity/tools.entity";
import { tool } from "../../../database/database_schemas";
import { ToolSelectionError } from "../domain/errors/tool-selection.error";
import { ToolAddError } from "../domain/errors/tool-add.error";
import type { TX } from "../../shared/masterRepository/types";

export class ToolHandler {
  constructor(private repository: MasterRepository) {}
  async selectTool(id: ToolID): Promise<Option<Tool>> {
    const { value: toolId, type } = id;

    try {
      const queryTransaction = async (tx: TX) => {
        const queryResult = await this.repository.select({
          table: "tool",
          where: and(eq(tool.id, toolId), eq(tool.type, type))!,
          get: "one",
          tx,
        });

        if (!queryResult.isSuccess) {
          return Result.fail(
            new ToolSelectionError(id.value, type, queryResult.error),
          );
        }

        return Result.ok(queryResult.value);
      };

      const transaction = await this.repository.transaction(queryTransaction);

      return transaction;
    } catch (error: unknown) {
      return Result.fail(new ToolSelectionError(id.value, type, error));
    }
  }

  async addTool(tool: ITool): Promise<Option<true>> {
    try {
      const queryTransaction = async (tx: TX) => {
        const insertResult = await this.repository.insert({
          table: "tool",
          dates: { ...tool, gameId: tool.gameId.value, id: tool.id.value },
          tx,
        });

        if (!insertResult.isSuccess) {
          return Result.fail(
            new ToolAddError(tool.id.value, tool.type, insertResult.error),
          );
        }

        return Result.ok(insertResult.value);
      };

      return await this.repository.transaction(queryTransaction);
    } catch (error: unknown) {
      return Result.fail(new ToolAddError(tool.id.value, tool.type, error));
    }
  }

  async deleteTool(id: ToolID): Promise<Option<undefined>> {
    const query = async (tx: TX) => {
      this.repository.delete({
        table: "tool",
        where: eq(tool.id, id.value),
        tx: tx,
      });
    };

    await this.repository.transaction(query);

    return Result.ok(undefined);
  }
}
