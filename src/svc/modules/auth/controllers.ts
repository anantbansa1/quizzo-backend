import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  IPayload,
  PostForgotPasswordRequest,
  PostLoginCredsRequest,
  PostResetPasswordRequest,
  PostSignupRequest,
  PostUpdateRequest,
} from "~src/svc/modules/auth/types";
import {
  PostForgotPasswordSchema,
  PostLoginCredsSchema,
  PostResetPasswordSchema,
  PostSignupSchema,
  updateSchema,
} from "~src/svc/modules/auth/schemas";
import { compareBcryptHash, getBcryptHash } from "~src/common/utils/cryptography";
import {
  generateForgotPasswordToken,
  generateToken,
  sendForgotPasswordEmail,
} from "~src/svc/modules/auth/utils";
import { conf } from "~src/config/settings";
import { AuthenticatedResponse } from "~src/svc/modules/common/types/http";
import { User } from "~src/svc/modules/users/entities";

export const postLoginCreds = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  let data: PostLoginCredsRequest;
  try {
    data = PostLoginCredsSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const { email_id, password } = data;

  const userRepository = conf.DEFAULT_DATA_SOURCE.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      emailId: email_id,
    },
  });
  if (!user) {
    response.status(400).json({
      message: "User does not exist",
    });
    next();
    return;
  }

  const check = await compareBcryptHash(password, user.password);
  if (!check) {
    response.status(401).json({
      message: "Incorrect Email or Password",
    });
    next();
    return;
  }

  const token = generateToken(user.emailId, user.name, user.role);

  const responseToken = { type: "Bearer", token: token };
  return response.status(200).json({
    status: "OK",
    message: "OK",
    result: responseToken,
  });
};

export const postForgotPassword = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  let data: PostForgotPasswordRequest;
  try {
    data = PostForgotPasswordSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const { email_id } = data;

  const userRepository = conf.DEFAULT_DATA_SOURCE.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      emailId: email_id,
    },
  });
  if (!user) {
    response.status(400).json({
      message: "User does not exist",
    });
    next();
    return;
  }

  const token = generateForgotPasswordToken(email_id);

  await userRepository.save({ ...user, ResetPasswordToken: token });

  await sendForgotPasswordEmail(email_id, token);
  return response.status(200).json({
    status: "OK",
    message: "OK",
  });
};

export const postResetPassword = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  let data: PostResetPasswordRequest;
  try {
    data = PostResetPasswordSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const { token, password } = data;
  const hashedPassword = await getBcryptHash(password);

  let payload: IPayload;
  try {
    payload = jwt.verify(token, conf.JWT_SECRET_KEY || "my-secret") as IPayload;
  } catch {
    response.status(401).json({
      message: "Invalid token",
    });
    next();
    return;
  }
  const userRepository = conf.DEFAULT_DATA_SOURCE.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      emailId: payload.email_id,
    },
  });

  if (!user) {
    response.status(400).json({
      message: "User does not exist",
    });
    next();
    return;
  }

  if (user.resetPasswordToken !== token) {
    response.status(400).json({
      message: "Invalid token",
    });
    next();
    return;
  }

  const updatedUser: User = {
    ...user,
    password: hashedPassword,
    resetPasswordToken: null,
  };
  await userRepository.save(updatedUser);
  return response.status(200).json({
    status: "OK",
    message: "OK",
  });
};

export const postSignup = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: PostSignupRequest;
  try {
    data = PostSignupSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const { email_id, name, password, dob, institute, role } = data;
  const hashedPassword = await getBcryptHash(password);

  const userRepository = conf.DEFAULT_DATA_SOURCE.getRepository(User);
  const currUser = await userRepository.findOne({
    where: {
      emailId: email_id,
    },
  });

  if (!currUser) {
    const updatedUser = {
      password: hashedPassword,
      dob: new Date(dob),
      institute: institute,
      role: role,
      emailId: email_id,
      name: name,
    };
    await userRepository.insert(updatedUser);

    return response.status(200).json({
      type: "OK",
      message: "User created successfully",
    });
  } else {
    return response.status(400).json({
      type: "ERROR",
      message: "user already exist",
    });
  }
};

export const updateDetails = async (
  request: Request,
  response: AuthenticatedResponse,
  next: NextFunction,
) => {
  let data: PostUpdateRequest;
  try {
    data = updateSchema.parse(request.body);
  } catch (e: unknown) {
    response.status(400).json({
      message: "Data validation failed",
      errors: (e as Error).message,
    });
    next();
    return;
  }

  const { email_id, name, dob, institute } = data;

  const userRepository = conf.DEFAULT_DATA_SOURCE.getRepository(User);
  const currUser = await userRepository.findOne({
    where: {
      emailId: email_id,
    },
  });
  if (currUser) {
    const updatedUser: User = {
      ...currUser,
      dob: new Date(dob),
      institute: institute,
      name: name,
    };
    await userRepository.save(updatedUser);
  } else {
    response.status(404).json({
      message: "user not found",
    });
    next();
    return;
  }
  response.status(200).json({
    message: "user details updated successfully",
  });
  next();
};
