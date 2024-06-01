import { Task } from "./models/task.model.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { apiResponse } from "./utils/apiResponse.js";
import { apiError } from "./utils/apiError.js";

const addTask = asyncHandler(async (req, res) => {
  const { boardId } = req.params;
  const { title, description, status } = req.body;
  if (!boardId) {
    throw new apiError(400, "board must be given");
  }
  if (!title || !status) {
    throw new apiError(400, "title and status must be given");
  }

  const addedTask = await Task.create({
    board: boardId,
    title,
    description,
    status,
  });

  if (!addedTask) {
    throw new apiError(500, "error creating task");
  }

  return res
    .status(200)
    .json(new apiResponse(200, addedTask, "task added succesfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId, boardId } = req.params;

  if (!taskId || !boardId) {
    throw new apiError(400, "task and board must be given");
  }
  const taskExists = await Task.findOne({
    board: boardId,
    _id: taskId,
  });
  if (!taskExists) {
    throw new apiError(400, "task doesnt exists");
  }

  const deletedTask = await Task.findByIdAndDelete(taskExists._id);
  if (!deletedTask) {
    throw new apiError(500, "error occured while deleting task");
  }
  return res
    .status(200)
    .json(new apiResponse(200, deletedTask, "task deleted succesfully"));
});

const modifyTask = asyncHandler(async (req, res) => {
  const { taskId, boardId } = req.params;
  const { status } = req.body;
  if (!taskId || !boardId) {
    throw new apiError(400, "task and board must be given");
  }
  const taskExists = await Task.findOne({
    board: boardId,
    _id: taskId,
  });
  if (!taskExists) {
    throw new apiError(400, "task doesnt exists");
  }

  taskExists.status = status;
  const modifiedTask = await taskExists.save({ validateBeforeSave: false });

  if (!modifiedTask) {
    throw new apiError(500, "error occured while modifying task");
  }

  return res
    .status(200)
    .json(new apiResponse(200, modifiedTask, "task modified succesfuly"));
});

export { addTask, deleteTask, modifyTask };
