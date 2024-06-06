import { Board } from "../models/board.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const createBoard = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  let { boardName } = req.body;

  if (!boardName) {
    boardName = "untitled";
  }

  const createdBoard = await Board.create({
    user: userId,
    boardName,
  });

  return res
    .status(200)
    .json(new apiResponse(200, createdBoard, "board created succesfully"));
});

const getBoardNames = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  console.log("this is called");

  if (!user) {
    throw new apiError(200, "user nor given");
  }

  const boardNames = await Board.find({ user: user }).select(
    "-user -createdAt -updatedAt"
  );

  if (!boardNames) {
    throw new apiError(500, "error fetching board names");
  }
  console.log(boardNames);
  return res
    .status(200)
    .json(new apiResponse(200, boardNames, "boards fetched succesfully"));
});

const changeBoardName = asyncHandler(async (req, res) => {
  const { oldBoardName, NewBoardName } = req.body;
  const user = req.user?._id;

  const findBoard = await Board.findOne({
    $and: [{ boardName: oldBoardName }, { user }],
  });

  if (!findBoard) {
    throw new apiError(400, "no existing board find with this name");
  }

  findBoard.boardName = NewBoardName;

  await findBoard.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, findBoard, "board name changed succesfully"));
});

const deleteBoard = asyncHandler(async (req, res) => {
  const boardName = req.body;
  const user = req.user?._id;

  if (!boardName || !user) {
    throw new apiError(400, "boardname is required");
  }

  const board = await Board.findOne({
    $and: [{ boardName }, { user }],
  });

  if (!board) {
    throw new apiError(400, "board doesnt exists");
  }

  const deletedBoard = await Board.findByIdAndDelete(board._id);
  if (!deletedBoard) {
    throw new apiError(500, "error occured while deleting board");
  }

  return res
    .status(200)
    .json(new apiResponse(200, deletedBoard, "board deleted succesfully"));
});

export { createBoard, changeBoardName, deleteBoard, getBoardNames };
