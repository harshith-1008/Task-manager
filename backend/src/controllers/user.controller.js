import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { Board } from "../models/board.model.js";
import { Task } from "../models/task.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new apiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new apiError(
      500,
      "error occured while generating access token and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new apiError(400, "all details must be provided");
  }

  const userExists = await User.findOne({
    $or: [{ username, email }],
  });

  if (userExists) {
    throw new apiError(400, "username or email is already taken");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    throw new apiError(500, "error occured while creating user");
  }

  return res
    .status(200)
    .json(new apiResponse(200, user, "user created succesfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req);
  const { username, password } = req.body;

  if (!username || !password) {
    throw new apiError(400, "all credentials must be provided");
  }

  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  });

  if (!user) {
    throw new apiError(400, "user does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid user credentials");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!loggedInUser) {
    throw new apiError(500, "error occured while fetching logged in user");
  }
  const option = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS in production
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new apiResponse(200, {}, "User logged out"));
});

const getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(400, "User ID not provided");
  }

  const boards = await Board.find({ user: userId }).select("_id");
  const boardIds = boards.map((board) => board._id);

  const totalBoards = boards.length;

  const tasks = await Task.aggregate([
    {
      $match: {
        board: {
          $in: boardIds,
        },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const taskCounts = {
    todo: 0,
    doing: 0,
    done: 0,
  };

  tasks.forEach((task) => {
    taskCounts[task._id] = task.count;
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        totalBoards,
        taskCounts,
      },
      "User stats fetched successfully"
    )
  );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new apiError(401, "No refresh token provided");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      throw new apiError(401, "Invalid refresh token");
    }

    const newAccessToken = user.generateAccessToken();
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { accessToken: newAccessToken },
          "Access token refreshed"
        )
      );
  } catch (err) {
    res.clearCookie("refreshToken");
    throw new apiError(401, err.message || "Invalid refresh token");
  }
});

export { refreshAccessToken };
export { loginUser, registerUser, logoutUser, getUserStats };
