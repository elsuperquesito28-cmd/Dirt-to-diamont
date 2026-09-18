import type { Option } from "../../../services/result/result";
import type { Tool } from "../domain/enitity/tools.entity";

export class ToolHandler {
  selectTool(): Option<Tool> {}

  addTool(): Option<undefined> {}

  deleteTool(): Option<undefined> {}
}
